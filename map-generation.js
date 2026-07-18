// High-level map and area construction helpers for Soulreaper.
(function () {
  function shuffled(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(randomBetween(0, i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function applyDevAreaConfigs(areas = []) {
    for (const area of areas) {
      const config = devAreaConfigs[area.name];
      if (!config) continue;
      const levelRange = config.levelRange;
      if (levelRange) {
        const min = Math.max(1, Math.floor(Number(levelRange.min) || 1));
        const max = Math.max(min, Math.floor(Number(levelRange.max) || min));
        area.levelRange = { min, max };
      }
      if (config.spawnRate) area.spawnRate = config.spawnRate;
      if (config.spawnAmount) area.spawnAmount = config.spawnAmount;
    }
  }

  const DEFAULT_AREA_OVERLAP = 420;
  const craftingStationDisplayDefaults = {
    "smelting-furnace": { size: 136 },
    anvil: { size: 48 },
    loom: { size: 116 },
    "dress-form-mannequin": { size: 58, scaleX: 0.5 },
    "potionmaking-table": { size: 114 },
    "tanning-drum": { size: 138 },
    "crafting-table": { size: 110 }
  };

  function translateArea(area, dx, dy) {
    area.center.x += dx;
    area.center.y += dy;
    for (const point of area.boundary || []) {
      point.x += dx;
      point.y += dy;
    }
    if (Array.isArray(area.path)) {
      for (const point of area.path) {
        point.x += dx;
        point.y += dy;
      }
    }
    area.bounds = boundsForPoints(area.boundary || []);
    return area;
  }

  function makeTouchingArea(parentArea, name, dirX, dirY, width, height, treeChance, levelRange, spawnRate = "Normal", irregularity = 0.34, overlap = DEFAULT_AREA_OVERLAP) {
    const parentRadius = boundaryRadiusAt(parentArea, dirX, dirY);
    const childRadius = areaRadiusAt({ width, height }, dirX, dirY);
    const distanceFromCenter = Math.max(0, parentRadius + childRadius - overlap);
    const area = makeArea(
      name,
      parentArea.center.x + dirX * distanceFromCenter,
      parentArea.center.y + dirY * distanceFromCenter,
      width,
      height,
      treeChance,
      levelRange,
      spawnRate,
      irregularity
    );
    for (let attempt = 0; attempt < 12 && !areasOverlap(parentArea, area); attempt += 1) {
      translateArea(area, -dirX * 80, -dirY * 80);
    }
    return area;
  }

  function areaOverlapsAny(area, blockedAreas = [], padding = 0) {
    return blockedAreas.filter(Boolean).some(candidate => areaBoundsOverlap(area, candidate, padding));
  }

  function pushAreaOutOfBlocked(area, dirX, dirY, blockedAreas = [], padding = 0, options = {}) {
    const maxSteps = options.maxSteps || 96;
    const stepSize = options.stepSize || 180;
    for (let step = 0; step < maxSteps && areaOverlapsAny(area, blockedAreas, padding); step += 1) {
      translateArea(area, dirX * stepSize, dirY * stepSize);
    }
    return area;
  }

  function makeTouchingAreaAvoiding(parentArea, name, baseAngle, width, height, treeChance, levelRange, spawnRate, irregularity, overlap, blockedAreas = [], options = {}) {
    const attempts = options.attempts || 96;
    const spread = options.spread ?? Math.PI * 0.9;
    const padding = options.padding ?? 220;
    const connectionWidth = options.connectionWidth || 520;
    const maxConnectionLength = options.maxConnectionLength ?? Infinity;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const offset = attempt === 0
        ? 0
        : (attempt % 2 === 0 ? -1 : 1) * Math.ceil(attempt / 2) * (spread / Math.max(1, attempts / 2));
      const jitter = attempt === 0 ? 0 : randomBetween(-0.08, 0.08);
      const angle = baseAngle + offset + jitter;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const area = makeTouchingArea(parentArea, name, dirX, dirY, width, height, treeChance, levelRange, spawnRate, irregularity, overlap);
      const connection = makeConnectionReservation(parentArea, area, dirX, dirY, connectionWidth, name);
      const connectionPads = makeConnectorFloorPads([connection], name, levelRange, spawnRate, Math.max(220, connectionWidth * 0.7));
      if (passageLength(connection) > maxConnectionLength) continue;
      if (areaOverlapsAny(area, blockedAreas, padding)) continue;
      if (areaOverlapsAny(connection, blockedAreas, padding)) continue;
      if (connectionPads.some(pad => areaOverlapsAny(pad, blockedAreas, padding))) continue;
      return { area, dirX, dirY, angle };
    }
    const fullCircleAttempts = options.fullCircleAttempts || 180;
    for (let attempt = 0; attempt < fullCircleAttempts; attempt += 1) {
      const angle = baseAngle + (Math.PI * 2 * attempt) / fullCircleAttempts;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const area = makeTouchingArea(parentArea, name, dirX, dirY, width, height, treeChance, levelRange, spawnRate, irregularity, overlap);
      const connection = makeConnectionReservation(parentArea, area, dirX, dirY, connectionWidth, name);
      const connectionPads = makeConnectorFloorPads([connection], name, levelRange, spawnRate, Math.max(220, connectionWidth * 0.7));
      if (passageLength(connection) > maxConnectionLength) continue;
      if (areaOverlapsAny(area, blockedAreas, padding)) continue;
      if (areaOverlapsAny(connection, blockedAreas, padding)) continue;
      if (connectionPads.some(pad => areaOverlapsAny(pad, blockedAreas, padding))) continue;
      return { area, dirX, dirY, angle };
    }
    const fallbackDirX = Math.cos(baseAngle);
    const fallbackDirY = Math.sin(baseAngle);
    const fallbackArea = makeTouchingArea(parentArea, name, fallbackDirX, fallbackDirY, width, height, treeChance, levelRange, spawnRate, irregularity, overlap);
    const fallbackMaxSteps = options.fallbackMaxSteps ?? 96;
    for (let step = 0; step < fallbackMaxSteps; step += 1) {
      const connection = makeConnectionReservation(parentArea, fallbackArea, fallbackDirX, fallbackDirY, connectionWidth, name);
      const connectionPads = makeConnectorFloorPads([connection], name, levelRange, spawnRate, Math.max(220, connectionWidth * 0.7));
      if (
        passageLength(connection) <= maxConnectionLength
        &&
        !areaOverlapsAny(fallbackArea, blockedAreas, padding)
        && !areaOverlapsAny(connection, blockedAreas, padding)
        && !connectionPads.some(pad => areaOverlapsAny(pad, blockedAreas, padding))
      ) break;
      if (passageLength(connection) > maxConnectionLength) break;
      translateArea(fallbackArea, fallbackDirX * 180, fallbackDirY * 180);
    }
    return {
      area: fallbackArea,
      dirX: fallbackDirX,
      dirY: fallbackDirY,
      angle: baseAngle
    };
  }

  function makeWindingAreaAvoiding(name, parentArea, baseAngle, length, width, levelRange, spawnRate, blockedAreas = [], options = {}) {
    const attempts = options.attempts || 96;
    const spread = options.spread ?? Math.PI * 0.8;
    const padding = options.padding ?? 220;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const offset = attempt === 0
        ? 0
        : (attempt % 2 === 0 ? -1 : 1) * Math.ceil(attempt / 2) * (spread / Math.max(1, attempts / 2));
      const angle = baseAngle + offset + randomBetween(-0.08, 0.08);
      const area = makeWindingArea(name, parentArea, angle, length, width, levelRange, spawnRate);
      if (areaOverlapsAny(area, blockedAreas, padding)) continue;
      return { area, angle, dirX: Math.cos(angle), dirY: Math.sin(angle) };
    }
    const area = makeWindingArea(name, parentArea, baseAngle, length, width, levelRange, spawnRate);
    pushAreaOutOfBlocked(area, Math.cos(baseAngle), Math.sin(baseAngle), blockedAreas, padding);
    return { area, angle: baseAngle, dirX: Math.cos(baseAngle), dirY: Math.sin(baseAngle) };
  }

  function extendPathIntoArea(path, area, overlap = 320) {
    if (!Array.isArray(path) || path.length < 2 || !area?.boundary?.length) return path;
    const nextPath = path.map(point => ({ ...point }));
    const last = nextPath[nextPath.length - 1];
    if (isPointInBoundary(last.x, last.y, area.boundary)) return nextPath;
    const dx = area.center.x - last.x;
    const dy = area.center.y - last.y;
    const distance = Math.hypot(dx, dy);
    if (!distance) return nextPath;
    let low = 0;
    let high = 1;
    for (let i = 0; i < 30; i += 1) {
      const mid = (low + high) / 2;
      const x = last.x + dx * mid;
      const y = last.y + dy * mid;
      if (isPointInBoundary(x, y, area.boundary)) high = mid;
      else low = mid;
    }
    const t = Math.min(1, high + Math.max(0, overlap) / distance);
    nextPath[nextPath.length - 1] = {
      x: last.x + dx * t,
      y: last.y + dy * t
    };
    return nextPath;
  }

  function rebuildWindingAreaFromPath(area, path, width) {
    if (!area || !Array.isArray(path) || path.length < 2) return area;
    const left = [];
    const right = [];
    for (let i = 0; i < path.length; i += 1) {
      const prev = path[Math.max(0, i - 1)];
      const next = path[Math.min(path.length - 1, i + 1)];
      const vx = next.x - prev.x;
      const vy = next.y - prev.y;
      const mag = Math.hypot(vx, vy) || 1;
      const nx = (-vy / mag) * width / 2;
      const ny = (vx / mag) * width / 2;
      left.push({ x: path[i].x + nx, y: path[i].y + ny });
      right.unshift({ x: path[i].x - nx, y: path[i].y - ny });
    }
    const boundary = smoothBoundary([...left, ...right], 1);
    const bounds = boundsForPoints(boundary);
    area.boundary = boundary;
    area.bounds = bounds;
    area.center = {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2
    };
    area.width = bounds.maxX - bounds.minX;
    area.height = bounds.maxY - bounds.minY;
    area.path = path.map(point => ({ ...point }));
    area.pathWidth = width;
    return area;
  }

  function makeAreaAtPathEndAvoiding(name, path, width, height, gap, treeChance, levelRange, spawnRate, irregularity, blockedAreas = [], options = {}) {
    const attempts = options.attempts || 64;
    const padding = options.padding ?? 220;
    const connectionWidth = options.connectionWidth || 520;
    const baseEnd = path[path.length - 1];
    const baseBeforeEnd = path[path.length - 2] || baseEnd;
    const baseAngle = Math.atan2(baseEnd.y - baseBeforeEnd.y, baseEnd.x - baseBeforeEnd.x);
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const angle = baseAngle + (attempt === 0 ? 0 : randomBetween(-0.55, 0.55));
      const length = Math.hypot(baseEnd.x - baseBeforeEnd.x, baseEnd.y - baseBeforeEnd.y) || 1;
      const adjustedPath = path.slice(0, -1).concat({
        x: baseBeforeEnd.x + Math.cos(angle) * length,
        y: baseBeforeEnd.y + Math.sin(angle) * length
      });
      const area = makeAreaAtPathEnd(name, adjustedPath, width, height, gap, treeChance, levelRange, spawnRate, irregularity);
      const connection = makePassageToArea(adjustedPath, area, connectionWidth, name);
      const connectionPads = makeConnectorFloorPads([connection], name, levelRange, spawnRate, Math.max(220, connectionWidth * 0.7));
      if (areaOverlapsAny(area, blockedAreas, padding)) continue;
      if (areaOverlapsAny(connection, blockedAreas, padding)) continue;
      if (connectionPads.some(pad => areaOverlapsAny(pad, blockedAreas, padding))) continue;
      return { area, path: adjustedPath, angle };
    }
    const area = makeAreaAtPathEnd(name, path, width, height, gap, treeChance, levelRange, spawnRate, irregularity);
    const dirX = Math.cos(baseAngle);
    const dirY = Math.sin(baseAngle);
    for (let step = 0; step < 96; step += 1) {
      const connection = makePassageToArea(path, area, connectionWidth, name);
      const connectionPads = makeConnectorFloorPads([connection], name, levelRange, spawnRate, Math.max(220, connectionWidth * 0.7));
      if (
        !areaOverlapsAny(area, blockedAreas, padding)
        && !areaOverlapsAny(connection, blockedAreas, padding)
        && !connectionPads.some(pad => areaOverlapsAny(pad, blockedAreas, padding))
      ) break;
      translateArea(area, dirX * 180, dirY * 180);
    }
    return { area, path: extendPathIntoArea(path, area, Math.max(260, connectionWidth * 0.65)), angle: baseAngle };
  }

  function makeConnectionReservation(parentArea, childArea, dirX, dirY, width, areaName) {
    const parentRadius = boundaryRadiusAt(parentArea, dirX, dirY);
    const childRadius = boundaryRadiusAt(childArea, -dirX, -dirY);
    return makePassage(
      parentArea.center.x + dirX * Math.max(0, parentRadius - width),
      parentArea.center.y + dirY * Math.max(0, parentRadius - width),
      childArea.center.x - dirX * Math.max(0, childRadius - width),
      childArea.center.y - dirY * Math.max(0, childRadius - width),
      width,
      areaName
    );
  }

  function passageLength(passage) {
    return Math.hypot((passage?.x2 || 0) - (passage?.x1 || 0), (passage?.y2 || 0) - (passage?.y1 || 0));
  }
  
  function generateMap() {
    const ganderswood = makeArea(AREA_NAME, 0, 0, 4200, 3400, 0.72, { min: 1, max: 3 }, "Normal");
    const angle = randomBetween(0, Math.PI * 2);
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const fenWidth = 3125;
    const fenHeight = 2375;
    const fen = makeTouchingArea(ganderswood, FEN_AREA_NAME, dirX, dirY, fenWidth, fenHeight, 0.32, { min: 6, max: 7 }, "Normal", 0.34, 560);
    const passage = makeConnectionReservation(ganderswood, fen, dirX, dirY, 380, FEN_AREA_NAME);
    const ratDenAngle = angle + randomBetween(Math.PI * 0.55, Math.PI * 1.45);
    const ratDenDirX = Math.cos(ratDenAngle);
    const ratDenDirY = Math.sin(ratDenAngle);
    const ratDenStartRadius = boundaryRadiusAt(ganderswood, ratDenDirX, ratDenDirY);
    const ratDen = makeWindingArea(RAT_DEN_AREA_NAME, ganderswood, ratDenAngle, 4200, 250, { min: 3, max: 5 });
    const ratDenPassage = makePassage(
      ganderswood.center.x + ratDenDirX * Math.max(0, ratDenStartRadius - 760),
      ganderswood.center.y + ratDenDirY * Math.max(0, ratDenStartRadius - 760),
      ratDen.path[0].x,
      ratDen.path[0].y,
      460,
      RAT_DEN_AREA_NAME
    );
    const ratDenSeamPassage = makePassage(
      ratDen.path[0].x,
      ratDen.path[0].y,
      ratDen.path[2].x,
      ratDen.path[2].y,
      360,
      RAT_DEN_AREA_NAME
    );
    const ratDenEnd = ratDen.path[ratDen.path.length - 1];
    const ratDenBeforeEnd = ratDen.path[ratDen.path.length - 2];
    const gladeDirX = (ratDenEnd.x - ratDenBeforeEnd.x) / Math.hypot(ratDenEnd.x - ratDenBeforeEnd.x, ratDenEnd.y - ratDenBeforeEnd.y);
    const gladeDirY = (ratDenEnd.y - ratDenBeforeEnd.y) / Math.hypot(ratDenEnd.x - ratDenBeforeEnd.x, ratDenEnd.y - ratDenBeforeEnd.y);
    const gladeWidth = 2600;
    const gladeHeight = 2100;
    const gladeRadius = Math.min(
      Math.abs((gladeWidth / 2) / (gladeDirX || 0.0001)),
      Math.abs((gladeHeight / 2) / (gladeDirY || 0.0001))
    );
    const glade = makeArea(
      GLADE_AREA_NAME,
      ratDenEnd.x + gladeDirX * Math.max(0, gladeRadius - 380),
      ratDenEnd.y + gladeDirY * Math.max(0, gladeRadius - 380),
      gladeWidth,
      gladeHeight,
      0.54,
      { min: 5, max: 6 }
    );
    const gladePassage = makePassage(
      ratDen.path[ratDen.path.length - 3].x,
      ratDen.path[ratDen.path.length - 3].y,
      glade.center.x - gladeDirX * (gladeRadius - 520),
      glade.center.y - gladeDirY * (gladeRadius - 520),
      320,
      GLADE_AREA_NAME
    );
    const whisperspring = makeWhisperspring(glade);
    const grimswood = makeGrimswoodPath(fen, dirX, dirY);
    const fenhold = makeFenhold(fen, [ganderswood, ratDen, glade, grimswood.hub], grimswood.passages);
    const wyndhelm = makeAreaAtPathEnd(WYNDHELM_AREA_NAME, grimswood.wyndhelmBranch, 2600, 2400, -500, 0, { min: 1, max: 1 }, "None", 0.34);
    const wyndhelmCathedral = makeWyndhelmCathedral(wyndhelm);
    const crowingFields = makeAreaAtPathEnd(CROWING_FIELDS_AREA_NAME, grimswood.crowingBranch, 5100, 3900, -520, 0.18, { min: 8, max: 9 }, "Normal", 0.46);
    const grimswoodPathPads = makeConnectorFloorPads(grimswood.passages, GRIMSWOOD_PATH_NAME, { min: 7, max: 8 }, "Normal", 300);
    const crowingEntry = grimswood.crowingBranch[grimswood.crowingBranch.length - 2] || grimswood.hubCenter;
    const awayFromCrowingEntry = Math.atan2(crowingFields.center.y - crowingEntry.y, crowingFields.center.x - crowingEntry.x);
    const highlandsSide = Math.random() < 0.5 ? -1 : 1;
    const harkharAngle = awayFromCrowingEntry + highlandsSide * Math.PI * 0.72;
    const preCrowingBlockedAreas = [
      ganderswood,
      fen,
      fenhold.area,
      ratDen,
      glade,
      ...whisperspring.areas,
      ...wyndhelmCathedral.areas,
      grimswood.hub,
      ...grimswood.passages,
      ...grimswoodPathPads,
      wyndhelm
    ];
    const harkharPlacement = makeTouchingAreaAvoiding(
      crowingFields,
      HARKHAR_HIGHLANDS_AREA_NAME,
      harkharAngle,
      4800,
      3600,
      0.2,
      { min: 12, max: 14 },
      "Normal",
      0.42,
      620,
      preCrowingBlockedAreas,
      { attempts: 140, spread: Math.PI * 1.45, padding: 1700, connectionWidth: 520 }
    );
    const harkharHighlands = harkharPlacement.area;
    const harkharDirX = harkharPlacement.dirX;
    const harkharDirY = harkharPlacement.dirY;
    const harmushPlacement = makeTouchingAreaAvoiding(
      harkharHighlands,
      HARMUSH_LAGH_AREA_NAME,
      harkharPlacement.angle,
      4200,
      3400,
      0.06,
      { min: 14, max: 16 },
      "Normal",
      0.42,
      680,
      [...preCrowingBlockedAreas, crowingFields],
      {
        attempts: 180,
        fullCircleAttempts: 240,
        spread: Math.PI * 1.6,
        padding: 720,
        connectionWidth: 520,
        maxConnectionLength: 1500,
        fallbackMaxSteps: 6
      }
    );
    const harmushLagh = harmushPlacement.area;
    const highstonePlacement = makeWindingAreaAvoiding(
      HIGHSTONE_PASS_AREA_NAME,
      harmushLagh,
      harmushPlacement.angle + randomBetween(-0.26, 0.26),
      6200,
      520,
      { min: 15, max: 17 },
      "Normal",
      [...preCrowingBlockedAreas, crowingFields, harkharHighlands],
      { attempts: 140, spread: Math.PI * 1.25, padding: 900 }
    );
    let highstonePass = highstonePlacement.area;
    const highstoneDirX = highstonePlacement.dirX;
    const highstoneDirY = highstonePlacement.dirY;
    const hargaPlacement = makeAreaAtPathEndAvoiding(
      HARGA_VOAGH_AREA_NAME,
      highstonePass.path,
      3900,
      3100,
      -420,
      0.04,
      { min: 17, max: 19 },
      "Normal",
      0.44,
      [...preCrowingBlockedAreas, crowingFields, harkharHighlands, harmushLagh],
      { attempts: 96, padding: 900 }
    );
    highstonePass = rebuildWindingAreaFromPath(highstonePass, hargaPlacement.path, highstonePass.pathWidth || 520);
    highstonePass.groundTexturePatches = [{
      kind: "path-segment",
      texture: "./assets/ground/snow.png",
      from: 0.5,
      to: 1,
      width: 620
    }];
    const hargaVoagh = hargaPlacement.area;
    const firecryPlacement = makeTouchingAreaAvoiding(
      hargaVoagh,
      FIRECRY_PEAK_AREA_NAME,
      hargaPlacement.angle + randomBetween(-0.45, 0.45),
      3600,
      3000,
      0.02,
      { min: 19, max: 21 },
      "Normal",
      0.42,
      620,
      [...preCrowingBlockedAreas, crowingFields, harkharHighlands, harmushLagh, highstonePass],
      { attempts: 120, spread: Math.PI * 1.25, padding: 720, connectionWidth: 560, maxConnectionLength: 1500, fallbackMaxSteps: 8 }
    );
    const firecryPeak = firecryPlacement.area;
    firecryPeak.groundTexture = "./assets/ground/ash.png";
    const gobbaAngle = awayFromCrowingEntry + randomBetween(-Math.PI * 0.55, Math.PI * 0.55);
    const gobbaPlacement = makeTouchingAreaAvoiding(
      crowingFields,
      GOBBA_AREA_NAME,
      gobbaAngle,
      4800,
      3900,
      0.18,
      { min: 10, max: 12 },
      "Normal",
      0.42,
      660,
      [...preCrowingBlockedAreas, harkharHighlands, harmushLagh, highstonePass, hargaVoagh, firecryPeak],
      { attempts: 140, spread: Math.PI * 1.2, padding: 360, connectionWidth: 680 }
    );
    const gobba = gobbaPlacement.area;
    const kebaanDirX = gobbaPlacement.dirX;
    const kebaanDirY = gobbaPlacement.dirY;
    const wastesPlacement = makeTouchingAreaAvoiding(
      gobba,
      WASTES_OF_KEBAAN_AREA_NAME,
      gobbaPlacement.angle,
      8200,
      6200,
      0.06,
      { min: 12, max: 15 },
      "Normal",
      0.38,
      760,
      [...preCrowingBlockedAreas, crowingFields, harkharHighlands, harmushLagh, highstonePass, hargaVoagh, firecryPeak],
      { attempts: 120, spread: Math.PI * 0.9, padding: 360, connectionWidth: 680 }
    );
    const wastes = wastesPlacement.area;
    const kebaan = makeKebaanWastes(wastes);
    const wyndhelmPassage = makePassageToArea(grimswood.wyndhelmBranch, wyndhelm, 500, WYNDHELM_AREA_NAME);
    const crowingPassage = makePassageToArea(grimswood.crowingBranch, crowingFields, 620, CROWING_FIELDS_AREA_NAME);
    const harkharPassage = makeConnectionReservation(crowingFields, harkharHighlands, harkharDirX, harkharDirY, 520, HARKHAR_HIGHLANDS_AREA_NAME);
    const harmushPassage = makeConnectionReservation(harkharHighlands, harmushLagh, harmushPlacement.dirX, harmushPlacement.dirY, 520, HARMUSH_LAGH_AREA_NAME);
    const highstoneStartRadius = boundaryRadiusAt(harmushLagh, highstoneDirX, highstoneDirY);
    const highstoneStart = highstonePass.path[0];
    const highstonePassage = makePassage(
      harmushLagh.center.x + highstoneDirX * Math.max(0, highstoneStartRadius - 540),
      harmushLagh.center.y + highstoneDirY * Math.max(0, highstoneStartRadius - 540),
      highstoneStart.x,
      highstoneStart.y,
      460,
      HIGHSTONE_PASS_AREA_NAME
    );
    const hargaPassage = makePassageToArea(highstonePass.path, hargaVoagh, 520, HARGA_VOAGH_AREA_NAME);
    const firecryPassage = makeConnectionReservation(hargaVoagh, firecryPeak, firecryPlacement.dirX, firecryPlacement.dirY, 560, FIRECRY_PEAK_AREA_NAME);
    const kebaanPassage = makeConnectionReservation(gobba, wastes, wastesPlacement.dirX, wastesPlacement.dirY, 680, WASTES_OF_KEBAAN_AREA_NAME);
    const ratDenConnectorPads = makeConnectorFloorPads([ratDenPassage, ratDenSeamPassage], RAT_DEN_AREA_NAME, { min: 3, max: 5 }, "Normal", 260);
    const { area: gandersville, passage: gandersvillePassage } = makeGandersville(ganderswood, [
      fen,
      fenhold.area,
      ratDen,
      ...ratDenConnectorPads,
      crowingFields,
      harkharHighlands,
      harmushLagh,
      highstonePass,
      hargaVoagh,
      firecryPeak,
      gobba,
      wastes
    ]);
    const lakeRoga = makeLakeRoga(gandersville, ganderswood, [
      ganderswood,
      fen,
      fenhold.area,
      ratDen,
      ...ratDenConnectorPads,
      crowingFields,
      harkharHighlands,
      harmushLagh,
      highstonePass,
      hargaVoagh,
      firecryPeak,
      gobba,
      wastes
    ]);
    const { area: evermist, passage: evermistPassage } = makeEvermistGlade(glade, [
      ganderswood,
      gandersville,
      lakeRoga.area,
      fen,
      fenhold.area,
      ratDen,
      ...ratDenConnectorPads,
      ...whisperspring.areas,
      ...wyndhelmCathedral.areas,
      grimswood.hub,
      ...grimswoodPathPads,
      wyndhelm,
      crowingFields,
      harkharHighlands,
      harmushLagh,
      highstonePass,
      hargaVoagh,
      firecryPeak,
      gobba
    ]);
    const ratDenCavern = makeRatDenCavernOffshoot(ratDen, [
      ganderswood,
      fen,
      fenhold.area,
      gandersville,
      glade,
      evermist,
      ...whisperspring.areas,
      ...wyndhelmCathedral.areas,
      grimswood.hub,
      ...grimswoodPathPads,
      wyndhelm,
      crowingFields,
      harkharHighlands,
      harmushLagh,
      highstonePass,
      hargaVoagh,
      firecryPeak,
      gobba
    ]);
    const ratzkhan = makeRatzkhan(ratDenCavern.ratRoom);
    const diarrhRealm = makeDiarrhRealm(ratzkhan);
    const bearCave = makeBearCave(fen, [passage, fenhold.passage, ...grimswood.passages]);
    const rogabogu = makeRogabogu(lakeRoga);
    const yrgmaDim = makeYrgmaDim(harmushLagh, [harmushPassage, highstonePassage]);
    const transitionPassages = [passage, fenhold.passage, ratDenPassage, ratDenSeamPassage, gandersvillePassage, lakeRoga.passage, gladePassage, evermistPassage, ...grimswood.passages, wyndhelmPassage, crowingPassage, harkharPassage, harmushPassage, highstonePassage, hargaPassage, firecryPassage, kebaanPassage];
    const passages = [...ratDenCavern.passages, ...ratzkhan.passages, ...diarrhRealm.passages, ...bearCave.passages, ...rogabogu.passages, ...yrgmaDim.passages, ...whisperspring.passages];
    const reservationPassages = [...transitionPassages, ...passages];
    const areas = [ganderswood, fen, fenhold.area, ratDen, ...ratDenCavern.areas, ...ratzkhan.areas, ...diarrhRealm.areas, ...bearCave.areas, ...rogabogu.areas, ...yrgmaDim.areas, ...ratDenConnectorPads, gandersville, lakeRoga.area, glade, evermist, ...whisperspring.areas, ...wyndhelmCathedral.areas, grimswood.hub, ...grimswoodPathPads, wyndhelm, crowingFields, harkharHighlands, harmushLagh, highstonePass, hargaVoagh, firecryPeak, gobba, wastes, kebaan.oasisArea, ...kebaan.ruins.areas];
    repairMissingTransitionPads(areas, transitionPassages);
    const harmushLake = makeHarmushLake(harmushLagh, reservationPassages);
    const hollyhockSite = makeHollyhockLakeSite(harmushLagh, harmushLake);
    const barbarianHouseSite = makeBarbarianHouseSite(harmushLagh, reservationPassages, harmushLake, [hollyhockSite?.npc].filter(Boolean));
    const river = makeCrowingRiver(crowingFields, 28);
    const mudBanks = makeCrowingRiverMudBanks(river);
    const puddles = [lakeRoga.lake, harmushLake, ...makeGladePuddles(glade, 26), ...makeLavaPuddles(firecryPeak, 24), ...whisperspring.water, ...(bearCave.water || []), ...(bearCave.lava || []), ...(rogabogu.water || []), ...(rogabogu.lava || []), ...(yrgmaDim.water || []), ...(yrgmaDim.lava || []), ...river, kebaan.oasisWater];
    const oasisGrounds = [kebaan.oasisGround];
    const mistClouds = makeEvermistClouds(evermist, 70);
    const homestead = makeStartingHomestead(ganderswood, areas, reservationPassages);
    const gandersvilleSite = makeGandersvilleSite(gandersville);
    const theodoraSite = makeTheodoraSite(ganderswood, areas, reservationPassages, homestead);
    const blasphemiumSite = makeGanderswoodBlasphemiumSite(ganderswood, areas, reservationPassages, [
      ...homestead.houses,
      ...(theodoraSite?.houses || [])
    ]);
    const shopkeeper = makeShopkeeper(ganderswood, areas, reservationPassages, homestead);
    const pleezix = makePleezix(shopkeeper, areas, reservationPassages, homestead);
    const trainer = null;
    const gvada = gandersvilleSite.gvada;
    const huntsmanRobb = gandersvilleSite.huntsmanRobb;
    const blacksmithFredward = gandersvilleSite.blacksmithFredward;
    const chaplainSonsam = gandersvilleSite.chaplainSonsam;
    const highPriestessSierra = gandersvilleSite.highPriestessSierra;
    const alchemistClaristra = gandersvilleSite.alchemistClaristra;
    const magisterMaimon = gandersvilleSite.magisterMaimon;
    const juanTabo = gandersvilleSite.juanTabo;
    const barbarianessSkjoldma = gandersvilleSite.barbarianessSkjoldma;
    const tailorAntonia = gandersvilleSite.tailorAntonia;
    const sharlene = makeSharlene(passage, areas, reservationPassages);
    const mordren = makeMordren(ratDenPassage, areas, reservationPassages);
    const bumsforkSite = makeBumsforkSite(grimswood);
    const cecil = makeCecil(grimswood);
    const bumsforkNpcs = makeBumsforkNpcs(grimswood);
    const gladeTrainerSite = makeGladeTrainerSite(glade, areas, reservationPassages);
    const wyndhelmSite = makeWyndhelmSite(wyndhelm, [wyndhelmPassage]);
    const gobbaSite = makeGobbaSite(gobba);
    const mapHouses = [...homestead.houses, ...gandersvilleSite.houses, ...fenhold.houses, ...wyndhelmSite.houses, ...bumsforkSite.houses, ...gobbaSite.houses, ...(theodoraSite?.houses || []), ...(blasphemiumSite?.houses || []), ...(gladeTrainerSite?.houses || []), ...(barbarianHouseSite?.houses || [])];
    const configuredNpcs = makeConfiguredMapNpcs({
      ganderswood,
      fenhold,
      gandersvilleSite,
      bumsforkSite,
      areas,
      passages: reservationPassages,
      houses: mapHouses,
      avoid: [
        shopkeeper,
        pleezix,
        gvada,
        huntsmanRobb,
        blacksmithFredward,
        chaplainSonsam,
        highPriestessSierra,
        alchemistClaristra,
        magisterMaimon,
        juanTabo,
        barbarianessSkjoldma,
        tailorAntonia,
        blasphemiumSite?.hereticOswaldo,
        blasphemiumSite?.hereticSlayleigh,
        hollyhockSite?.npc,
        ...(barbarianHouseSite?.npcs || [])
      ].filter(Boolean)
    });
    if (hollyhockSite?.npc) configuredNpcs.push(hollyhockSite.npc);
    configuredNpcs.push(...(barbarianHouseSite?.npcs || []));
    configuredNpcs.push(...(bearCave.configuredNpcs || []), ...(rogabogu.configuredNpcs || []), ...(yrgmaDim.configuredNpcs || []));
    const fenGraveyard = makeRandomGraveyardSite(fen, areas, reservationPassages, mapHouses, {
      id: "ganderswood-fen-graveyard",
      w: 410,
      h: 340,
      centerAvoidance: 360,
      stones: 7
    });
    const janglebones = makeJanglebones(fenGraveyard?.graveyard, fen);
    if (fenGraveyard?.graveyard && janglebones) {
      fenGraveyard.obstacles = makeGanderswoodGravestoneObstacles(fenGraveyard.graveyard, [janglebones]);
    }
    const wyndhelmGraveyard = makeRandomGraveyardSite(wyndhelm, areas, [wyndhelmPassage], mapHouses, {
      id: "wyndhelm-graveyard",
      w: 430,
      h: 360,
      centerAvoidance: 520,
      stones: 8,
      avoidObstacles: wyndhelmSite.obstacles
    });
    const eliteSpawns = [
      makeStartingGuard(homestead),
      makeNapaea(glade, areas, reservationPassages),
      janglebones,
      ...makeGandersguardFootmen(gandersvilleSite, gandersvillePassage),
      ...makeFenholdKeepEntranceGuards(fenhold.keep),
      ...(gladeTrainerSite?.eliteSpawns || []),
      ...makeWhisperspringRoomOneElites(whisperspring),
      ...makeWhisperspringRoomThreeElites(whisperspring),
      ...makeWhisperspringRoomFourElites(whisperspring),
      ...makeWhisperspringRoomFiveElites(whisperspring),
      ...makeWhisperspringRoomSixElites(whisperspring),
      ...makeWhisperspringRoomSevenElites(whisperspring),
      ...makeWhisperspringRoomEightElites(whisperspring),
      ...makeWhisperspringRoomNineElites(whisperspring),
      ...makeWhisperspringRoomTenElites(whisperspring),
      ...makeWhisperspringRoomElevenElites(whisperspring)
    ].filter(Boolean);
    const fixedSpawns = [
      ...makeWhisperspringFixedSpawns(whisperspring),
      ...(ratDenCavern.fixedSpawns || []),
      ...(ratzkhan.fixedSpawns || []),
      ...(bearCave.fixedSpawns || []),
      ...(rogabogu.fixedSpawns || []),
      ...(yrgmaDim.fixedSpawns || [])
    ].filter(Boolean);
    const obstacles = [];
    obstacles.push(whisperspring.entranceObstacle);
    obstacles.push(wyndhelmCathedral.entranceObstacle);
    if (ratzkhan.entranceObstacle) obstacles.push(ratzkhan.entranceObstacle);
    if (diarrhRealm.entranceObstacle) obstacles.push(diarrhRealm.entranceObstacle);
    if (bearCave.entranceObstacle) obstacles.push(bearCave.entranceObstacle);
    if (rogabogu.entranceObstacle) obstacles.push(rogabogu.entranceObstacle);
    if (yrgmaDim.entranceObstacle) obstacles.push(yrgmaDim.entranceObstacle);
    obstacles.push(...(bearCave.featureObstacles || []), ...(rogabogu.featureObstacles || []), ...(yrgmaDim.featureObstacles || []));
    obstacles.push(...(wyndhelmCathedral.obstacles || []));
    obstacles.push(...makeGrimswoodDeadTrees(grimswood, 75));
    obstacles.push(...wyndhelmSite.obstacles);
    obstacles.push(...(fenGraveyard?.obstacles || []), ...(wyndhelmGraveyard?.obstacles || []));
    obstacles.push(...makeCrowingFieldObstacles(crowingFields, river));
    obstacles.push(...kebaan.obstacles);
    obstacles.push(...kebaan.ruins.wallObstacles);
    obstacles.push(...makeGobbaTumbleweeds(gobba, gobbaSite.houses, 44));
    obstacles.push(...makeGladeRuinedPillars(glade, reservationPassages, puddles, eliteSpawns, 9));
    obstacles.push(...makeLakeRogaFlora(lakeRoga.area, reservationPassages, lakeRoga.lake, 64));
    obstacles.push(...makeEvermistFeatures(evermist, reservationPassages, 96));
    obstacles.push(...makeAreaFeatureObstacles(harkharHighlands, reservationPassages, obstacles, [
      { kind: "pine-tree", weight: 5, minRadius: 18, maxRadius: 38 },
      { kind: "dead-tree", weight: 3, minRadius: 18, maxRadius: 36 },
      { kind: "boulder", weight: 3, minRadius: 16, maxRadius: 34 },
      { kind: "bush", weight: 3, minRadius: 12, maxRadius: 24 },
      { kind: "autumn-bush", weight: 2, minRadius: 12, maxRadius: 24 }
    ], 86));
    obstacles.push(...makeAreaFeatureObstacles(harmushLagh, reservationPassages, obstacles, [
      { kind: "snowy-pine-tree", weight: 5, minRadius: 18, maxRadius: 40 },
      { kind: "snowy-boulder", weight: 4, minRadius: 18, maxRadius: 38 }
    ], 58));
    obstacles.push(...makeAreaFeatureObstacles(highstonePass, reservationPassages, obstacles, [
      { kind: "snowy-boulder", weight: 5, minRadius: 14, maxRadius: 32 },
      { kind: "snowy-pine-tree", weight: 2, minRadius: 16, maxRadius: 34 }
    ], 54));
    obstacles.push(...makeAreaFeatureObstacles(hargaVoagh, reservationPassages, obstacles, [
      { kind: "snowy-pine-tree", weight: 5, minRadius: 18, maxRadius: 42 },
      { kind: "snowy-boulder", weight: 3, minRadius: 16, maxRadius: 34 },
      { kind: "snow-covered-dead-tree", weight: 2, minRadius: 18, maxRadius: 36 }
    ], 52));
    obstacles.push(...makeAreaFeatureObstacles(firecryPeak, reservationPassages, obstacles, [
      { kind: "dead-tree", weight: 1, minRadius: 18, maxRadius: 40 }
    ], 48));
    obstacles.push(makeGandersvilleTownStatue(gandersvilleSite));
    obstacles.push(...makeGandersvilleGreenery(gandersville, gandersvilleSite, reservationPassages, mapHouses, 32));
    obstacles.push(...(blasphemiumSite?.obstacles || []));
    const roamingObstacleTarget = obstacles.length + 245;
    let attempts = 0;
    while (obstacles.length < roamingObstacleTarget && attempts < 5200) {
      attempts += 1;
      const areaRoll = Math.random();
      const area = areaRoll < 0.44 ? ganderswood : areaRoll < 0.61 ? fen : areaRoll < 0.73 ? ratDen : areaRoll < 0.86 ? glade : grimswood.hub;
      const obstacle = {
        x: randomBetween(area.center.x - area.width * 0.46, area.center.x + area.width * 0.46),
        y: randomBetween(area.center.y - area.height * 0.46, area.center.y + area.height * 0.46),
        radius: randomBetween(16, 38),
        kind: area.name === FEN_AREA_NAME
          ? randomFenVegetationKind()
          : area.name === GRIMSWOOD_PATH_NAME
          ? (Math.random() < 0.82 ? "dead-tree" : "boulder")
          : randomAreaObstacleKind(area)
      };
      if (Math.hypot(obstacle.x, obstacle.y) < 180) continue;
      if (!areaAt(obstacle.x, obstacle.y, { areas, passages })) continue;
      if (pointInAnyPassage(obstacle.x, obstacle.y, reservationPassages, obstacle.radius + 16)) continue;
      if (mapHouses.some(house => rectCollidesCircle(houseCollisionBounds(house, 105), obstacle.x, obstacle.y, obstacle.radius))) continue;
      if (shopkeeper && Math.hypot(obstacle.x - shopkeeper.x, obstacle.y - shopkeeper.y) < obstacle.radius + 150) continue;
      if (pleezix && Math.hypot(obstacle.x - pleezix.x, obstacle.y - pleezix.y) < obstacle.radius + 95) continue;
      if (configuredNpcs.some(npc => Math.hypot(obstacle.x - npc.x, obstacle.y - npc.y) < obstacle.radius + 95)) continue;
      if (gladeTrainerSite?.trainer && Math.hypot(obstacle.x - gladeTrainerSite.trainer.x, obstacle.y - gladeTrainerSite.trainer.y) < obstacle.radius + 95) continue;
      if (gvada && Math.hypot(obstacle.x - gvada.x, obstacle.y - gvada.y) < obstacle.radius + 95) continue;
      if (theodoraSite?.theodora && Math.hypot(obstacle.x - theodoraSite.theodora.x, obstacle.y - theodoraSite.theodora.y) < obstacle.radius + 95) continue;
      if (sharlene && Math.hypot(obstacle.x - sharlene.x, obstacle.y - sharlene.y) < obstacle.radius + 95) continue;
      if (mordren && Math.hypot(obstacle.x - mordren.x, obstacle.y - mordren.y) < obstacle.radius + 95) continue;
      if (cecil && Math.hypot(obstacle.x - cecil.x, obstacle.y - cecil.y) < obstacle.radius + 90) continue;
      if (bumsforkNpcs.some(npc => Math.hypot(obstacle.x - npc.x, obstacle.y - npc.y) < obstacle.radius + 80)) continue;
      if (blasphemiumSite?.graveyard && rectCollidesCircle(blasphemiumSite.graveyard.bounds, obstacle.x, obstacle.y, obstacle.radius + 70)) continue;
      if (fenGraveyard?.graveyard && rectCollidesCircle(fenGraveyard.graveyard.bounds, obstacle.x, obstacle.y, obstacle.radius + 70)) continue;
      if (wyndhelmGraveyard?.graveyard && rectCollidesCircle(wyndhelmGraveyard.graveyard.bounds, obstacle.x, obstacle.y, obstacle.radius + 70)) continue;
      if (grimswood && Math.hypot(obstacle.x - grimswood.hub.center.x, obstacle.y - grimswood.hub.center.y) < grimswood.villageRange * RANGE_UNIT + obstacle.radius + 60) continue;
      if (eliteSpawns.some(elite => Math.hypot(obstacle.x - elite.x, obstacle.y - elite.y) < obstacle.radius + 140)) continue;
      if ([passage.x1, passage.x2].some((x, index) => {
        const y = index === 0 ? passage.y1 : passage.y2;
        return Math.hypot(obstacle.x - x, obstacle.y - y) < obstacle.radius + 120;
      })) continue;
      if ([gladePassage.x1, gladePassage.x2].some((x, index) => {
        const y = index === 0 ? gladePassage.y1 : gladePassage.y2;
        return Math.hypot(obstacle.x - x, obstacle.y - y) < obstacle.radius + 120;
      })) continue;
      if (ratDen.path.slice(0, 3).some(point => Math.hypot(obstacle.x - point.x, obstacle.y - point.y) < obstacle.radius + 95)) continue;
      if (puddles.some(puddle => pointInPuddle(obstacle.x, obstacle.y, puddle, obstacle.radius + 14))) continue;
      if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 34)) continue;
      obstacles.push(obstacle);
    }
    clearBlockedHouseEntrances(obstacles, mapHouses);
  
    applyDevAreaConfigs(areas);
    const graveyards = [blasphemiumSite?.graveyard, fenGraveyard?.graveyard, wyndhelmGraveyard?.graveyard].filter(Boolean);
    const map = { name: AREA_NAME, areas, passages, transitionPassages, obstacles, puddles, mudBanks, oasisGrounds, mistClouds, houses: mapHouses, furniture: [...(gandersvilleSite.furniture || []), ...(fenhold.furniture || []), ...(bearCave.furniture || []), ...(rogabogu.furniture || []), ...(yrgmaDim.furniture || [])], gandersvilleTownSquare: gandersvilleSite.townSquare, playerStart: gandersvilleSite.playerStart, shopkeeper, pleezix, trainer, gladeTrainer: gladeTrainerSite?.trainer || null, configuredNpcs, hollyhockQuestSites: hollyhockSite?.questSites || null, gvada, huntsmanRobb, blacksmithFredward, tailorAntonia, barbarianessSkjoldma, chaplainSonsam, highPriestessSierra, alchemistClaristra, magisterMaimon, juanTabo, lordYantos: gandersvilleSite.lordYantos, theodora: theodoraSite?.theodora || null, hereticOswaldo: blasphemiumSite?.hereticOswaldo || null, hereticSlayleigh: blasphemiumSite?.hereticSlayleigh || null, sharlene, mordren, cecil, bumsforkNpcs, ganderswoodGraveyard: blasphemiumSite?.graveyard || null, graveyards, grimswood, fenhold, whisperspring, whisperspringRooms: whisperspring.rooms, wyndhelmCathedral, wyndhelmCathedralRooms: wyndhelmCathedral.rooms, ratzkhan, diarrhRealm, diarrhRealmRooms: diarrhRealm.rooms, bearCave, bearCaveRooms: bearCave.rooms, rogabogu, rogaboguRooms: rogabogu.rooms, yrgmaDim, yrgmaDimRooms: yrgmaDim.rooms, firecryPeak, kebaan: { wastes, ...kebaan }, eliteSpawns, fixedSpawns };
    applyNpcConfigsToMap(map);
    scaleMapNpcRadii(map);
    prepareMapCaches(map);
    enforceSafeMapPlacements(map);
    return prepareMapCaches(map);
  }

  function makeFenhold(fen, blockedAreas = [], blockedPassages = []) {
    const width = 1820;
    const height = 1660;
    const levelRange = { min: 7, max: 8 };
    const blocked = blockedAreas.filter(Boolean);
    const areaBlockedByPassages = area => areaIntersectsPassages(area, blockedPassages, 180);
    for (let attempt = 0; attempt < 160; attempt += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const area = makeTouchingArea(fen, FENHOLD_AREA_NAME, dirX, dirY, width, height, 0.04, levelRange, "None", 0.18, 520);
      if (blocked.some(candidate => areaBoundsOverlap(area, candidate, 260))) continue;
      if (areaBlockedByPassages(area)) continue;
      const passage = makeConnectionReservation(fen, area, dirX, dirY, 320, FENHOLD_AREA_NAME);
      const keep = makeKeep("fenhold-keep", area.center.x, area.center.y, {
        label: "Fenhold Keep",
        metadata: { area: FENHOLD_AREA_NAME, place: "Keep" }
      });
      return { area, passage, keep, houses: [keep], furniture: makeFenholdKeepFurniture(keep) };
    }
    let fallback = null;
    let fallbackDir = { x: 0, y: -1 };
    for (let index = 0; index < 24; index += 1) {
      const angle = (index / 24) * Math.PI * 2;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const candidate = makeTouchingArea(fen, FENHOLD_AREA_NAME, dirX, dirY, width, height, 0.04, levelRange, "None", 0.18, 520);
      if (blocked.some(area => areaBoundsOverlap(candidate, area, 220))) continue;
      if (areaBlockedByPassages(candidate)) continue;
      fallback = candidate;
      fallbackDir = { x: dirX, y: dirY };
      break;
    }
    fallback ||= makeTouchingArea(fen, FENHOLD_AREA_NAME, 0, -1, width, height, 0.04, levelRange, "None", 0.18, 520);
    const passage = makeConnectionReservation(fen, fallback, fallbackDir.x, fallbackDir.y, 320, FENHOLD_AREA_NAME);
    const keep = makeKeep("fenhold-keep", fallback.center.x, fallback.center.y, {
      label: "Fenhold Keep",
      metadata: { area: FENHOLD_AREA_NAME, place: "Keep" }
    });
    return { area: fallback, passage, keep, houses: [keep], furniture: makeFenholdKeepFurniture(keep) };
  }

  function makeFenholdKeepFurniture(keep) {
    if (!keep) return [];
    const piece = (kind, id, x, y, size, options = {}) => ({
      id,
      kind,
      houseId: keep.id,
      area: FENHOLD_AREA_NAME,
      x,
      y,
      size,
      scaleX: options.scaleX || 1,
      scaleY: options.scaleY || 1,
      yOffset: options.spriteYOffset || 0,
      nonBlocking: true
    });
    const courtyard = keep.courtyard;
    const leftHall = keep.floors?.[1];
    const rightHall = keep.floors?.[2];
    return [
      piece("smelting-furnace", "fenhold-keep-courtyard-smelting-furnace", courtyard.x + courtyard.w * 0.28, courtyard.y + courtyard.h * 0.28, 136),
      piece("anvil", "fenhold-keep-courtyard-anvil", courtyard.x + courtyard.w * 0.72, courtyard.y + courtyard.h * 0.28, 52),
      piece("tanning-drum", "fenhold-keep-courtyard-tanning-drum", courtyard.x + courtyard.w * 0.28, courtyard.y + courtyard.h * 0.68, 132),
      piece("crafting-table", "fenhold-keep-courtyard-crafting-table", courtyard.x + courtyard.w * 0.72, courtyard.y + courtyard.h * 0.68, 110),
      piece("potionmaking-table", "fenhold-keep-left-potionmaking-table", leftHall.x + leftHall.w * 0.5, leftHall.y + leftHall.h * 0.34, 114),
      piece("loom", "fenhold-keep-right-loom", rightHall.x + rightHall.w * 0.42, rightHall.y + rightHall.h * 0.3, 116),
      piece("dress-form-mannequin", "fenhold-keep-right-dress-form-mannequin", rightHall.x + rightHall.w * 0.7, rightHall.y + rightHall.h * 0.3, 58, { scaleX: 0.5 })
    ];
  }

  function areaIntersectsPassages(area, passages = [], padding = 0) {
    if (!passages.length) return false;
    const bounds = area.bounds || boundsForPoints(area.boundary || []);
    const samples = [
      area.center,
      ...(area.boundary || [])
    ].filter(Boolean);
    const step = 180;
    for (let x = bounds.minX; x <= bounds.maxX; x += step) {
      for (let y = bounds.minY; y <= bounds.maxY; y += step) {
        if (isPointInBoundary(x, y, area.boundary)) samples.push({ x, y });
      }
    }
    return samples.some(point => pointInAnyPassage(point.x, point.y, passages, -padding));
  }

  function makeKeep(id, cx, cy, options = {}) {
    const w = options.w || 1120;
    const h = options.h || 1080;
    const wall = options.wall || 42;
    const horizontalWall = options.horizontalWall || 72;
    const door = options.door || 76;
    const left = cx - w / 2;
    const top = cy - h / 2;
    const right = left + w;
    const bottom = top + h;
    const southDoorOffsets = options.southDoorOffsets || [-w * 0.36, w * 0.36];
    const northDoorOffsets = options.northDoorOffsets || [-w * 0.22, w * 0.22];
    const southDoorRects = southDoorOffsets.map(offset => ({
      side: "south",
      x: cx + offset - door / 2,
      y: bottom - horizontalWall - 6,
      w: door,
      h: horizontalWall + 16
    }));
    const northDoorRects = northDoorOffsets.map(offset => ({
      side: "north",
      x: cx + offset - door / 2,
      y: top - 16,
      w: door,
      h: horizontalWall + 16
    }));
    const doorRects = [...southDoorRects, ...northDoorRects];
    const gappedHorizontalBlocks = (side, gaps) => {
      const y = side === "north" ? top : bottom - horizontalWall;
      const blocks = [];
      let cursor = left;
      for (const rect of gaps.sort((a, b) => a.left - b.left)) {
        if (rect.left > cursor) blocks.push({ x: cursor, y, w: rect.left - cursor, h: horizontalWall });
        cursor = Math.max(cursor, rect.right);
      }
      if (cursor < right) blocks.push({ x: cursor, y, w: right - cursor, h: horizontalWall });
      return blocks;
    };
    const gappedTopBlocks = gappedHorizontalBlocks("north", northDoorRects.map(rect => ({ left: rect.x, right: rect.x + rect.w })));
    const gappedSouthBlocks = [];
    let cursor = left;
    const southGaps = [
      ...southDoorRects.map(rect => ({ left: rect.x, right: rect.x + rect.w })),
      { left: cx - 180, right: cx + 180 }
    ].sort((a, b) => a.left - b.left);
    for (const rect of southGaps) {
      if (rect.left > cursor) gappedSouthBlocks.push({ x: cursor, y: bottom - horizontalWall, w: rect.left - cursor, h: horizontalWall });
      cursor = Math.max(cursor, rect.right);
    }
    if (cursor < right) gappedSouthBlocks.push({ x: cursor, y: bottom - horizontalWall, w: right - cursor, h: horizontalWall });

    const floorTop = top + horizontalWall;
    const floorBottom = bottom - horizontalWall;
    const topHallH = 230;
    const sideHallW = 315;
    const innerWall = 42;
    const innerLeft = cx - 205;
    const innerRight = cx + 205;
    const innerTop = floorTop + topHallH;
    const innerBottom = cy + 150;
    const innerW = innerRight - innerLeft;
    const courtyard = {
      x: innerLeft + innerWall,
      y: innerBottom + innerWall,
      w: innerW - innerWall * 2,
      h: floorBottom - (innerBottom + innerWall)
    };
    const floors = [
      { x: left + wall, y: floorTop, w: w - wall * 2, h: topHallH },
      { x: left + wall, y: innerTop, w: sideHallW, h: floorBottom - innerTop },
      { x: right - wall - sideHallW, y: innerTop, w: sideHallW, h: floorBottom - innerTop },
      ...southDoorRects.map(rect => ({ x: rect.x, y: floorBottom, w: rect.w, h: horizontalWall })),
      ...northDoorRects.map(rect => ({ x: rect.x, y: top, w: rect.w, h: horizontalWall })),
      {
        x: innerLeft + innerW * 0.43,
        y: innerTop,
        w: innerW * 0.14,
        h: innerWall
      },
      {
        x: innerLeft + innerWall,
        y: innerTop + innerWall,
        w: innerW - innerWall * 2,
        h: innerBottom - innerTop - innerWall
      }
    ];
    const blocks = [
      ...gappedTopBlocks,
      { x: left, y: top, w: wall, h },
      { x: right - wall, y: top, w: wall, h },
      ...gappedSouthBlocks,
      { x: innerLeft, y: innerTop, w: innerW * 0.43, h: innerWall },
      { x: innerRight - innerW * 0.43, y: innerTop, w: innerW * 0.43, h: innerWall },
      { x: innerLeft, y: innerTop, w: innerWall, h: bottom - innerTop },
      { x: innerRight - innerWall, y: innerTop, w: innerWall, h: bottom - innerTop },
      { x: innerLeft, y: innerBottom, w: innerW, h: innerWall }
    ];
    const roofs = [
      { x: left, y: top, w, h: h - horizontalWall - 210 },
      { x: left, y: bottom - horizontalWall - 210, w: innerLeft + innerWall - left, h: 210 },
      { x: innerRight - innerWall, y: bottom - horizontalWall - 210, w: right - (innerRight - innerWall), h: 210 }
    ];
    const entrances = doorRects.map(rect => ({
      x: rect.x + rect.w / 2,
      y: rect.side === "north" ? top + horizontalWall / 2 - 8 : bottom - horizontalWall / 2 + 8
    }));
    const outsideDoors = doorRects.map(rect => ({
      x: rect.x + rect.w / 2,
      y: rect.side === "north" ? top - 54 : bottom + 54
    }));
    return {
      id,
      label: options.label || options.name || id,
      metadata: options.metadata || null,
      kind: "keep",
      roofTexture: options.roofTexture || "greyRoof",
      floorTexture: options.floorTexture || "greyTiles",
      wallTexture: options.wallTexture || "houseWall",
      wallDarken: Number(options.wallDarken) || 0,
      x: cx,
      y: cy,
      w,
      h,
      wall,
      horizontalWall,
      door,
      courtyard,
      interiors: [
        ...floors,
        courtyard
      ],
      interior: { x: left + wall, y: floorTop, w: w - wall * 2, h: floorBottom - floorTop },
      floors,
      floor: floors[0],
      doorRects,
      doorRect: doorRects[0],
      farDoorRect: doorRects[1] || null,
      blocks,
      roofs,
      roof: { x: left, y: top, w, h },
      entrances,
      entrance: entrances[0],
      outsideDoors,
      outsideDoor: outsideDoors[0],
      playerStart: { x: cx, y: bottom - horizontalWall - 120 },
      shopSpot: { x: cx, y: top + horizontalWall + 110 }
    };
  }
  
  function makeGandersville(ganderswood, blockedAreas = []) {
    const width = 3600;
    const height = 2800;
    const levelRange = { min: 1, max: 1 };
    const makeGandersvillePassage = (area, dirX, dirY) => {
      const ganderswoodRadius = boundaryRadiusAt(ganderswood, dirX, dirY);
      const villageRadius = boundaryRadiusAt(area, -dirX, -dirY);
      const villageInset = Math.min(420, Math.max(260, villageRadius * 0.24));
      return makePassage(
        ganderswood.center.x + dirX * Math.max(0, ganderswoodRadius - 430),
        ganderswood.center.y + dirY * Math.max(0, ganderswoodRadius - 430),
        area.center.x - dirX * Math.max(0, villageRadius - villageInset),
        area.center.y - dirY * Math.max(0, villageRadius - villageInset),
        360,
        GANDERSVILLE_AREA_NAME
      );
    };
    for (let attempt = 0; attempt < 220; attempt += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const area = makeTouchingArea(
        ganderswood,
        GANDERSVILLE_AREA_NAME,
        dirX,
        dirY,
        width,
        height,
        0,
        levelRange,
        "None",
        0.16,
        520
      );
      if (blockedAreas.some(blocked => areaBoundsOverlap(area, blocked, 260))) continue;
      const passage = makeGandersvillePassage(area, dirX, dirY);
      const passagePads = makeConnectorFloorPads([passage], GANDERSVILLE_AREA_NAME, levelRange, "None", Math.max(220, passage.width * 0.7));
      if (blockedAreas.some(blocked => areaBoundsOverlap(passage, blocked, 260))) continue;
      if (passagePads.some(pad => blockedAreas.some(blocked => areaBoundsOverlap(pad, blocked, 260)))) continue;
      return { area, passage };
    }
    const fallback = makeTouchingArea(ganderswood, GANDERSVILLE_AREA_NAME, 0, -1, width, height, 0, levelRange, "None", 0.16, 520);
    const fallbackDirX = (fallback.center.x - ganderswood.center.x) / Math.hypot(fallback.center.x - ganderswood.center.x, fallback.center.y - ganderswood.center.y);
    const fallbackDirY = (fallback.center.y - ganderswood.center.y) / Math.hypot(fallback.center.x - ganderswood.center.x, fallback.center.y - ganderswood.center.y);
    return {
      area: fallback,
      passage: makeGandersvillePassage(fallback, fallbackDirX, fallbackDirY)
    };
  }

  function makeLakeRoga(gandersville, ganderswood, blockedAreas = []) {
    const width = 2500;
    const height = 3400;
    const levelRange = { min: 1, max: 2 };
    const baseLength = Math.hypot(gandersville.center.x - ganderswood.center.x, gandersville.center.y - ganderswood.center.y) || 1;
    const baseDir = {
      x: (gandersville.center.x - ganderswood.center.x) / baseLength,
      y: (gandersville.center.y - ganderswood.center.y) / baseLength
    };
    const blocked = blockedAreas.filter(Boolean);
    for (let attempt = 0; attempt < 96; attempt += 1) {
      const angle = Math.atan2(baseDir.y, baseDir.x) + randomBetween(-Math.PI * 0.42, Math.PI * 0.42);
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const area = makeTouchingArea(
        gandersville,
        LAKE_ROGA_AREA_NAME,
        dirX,
        dirY,
        width,
        height,
        0.46,
        levelRange,
        "None",
        0.34,
        540
      );
      if (blocked.some(candidate => areaBoundsOverlap(area, candidate, 260))) continue;
      area.groundTexture = "./assets/ground/swamp.png";
      const passage = makeConnectionReservation(gandersville, area, dirX, dirY, 320, LAKE_ROGA_AREA_NAME);
      const passagePads = makeConnectorFloorPads([passage], LAKE_ROGA_AREA_NAME, levelRange, "None", Math.max(220, passage.width * 0.7));
      if (blocked.some(candidate => areaBoundsOverlap(passage, candidate, 260))) continue;
      if (passagePads.some(pad => blocked.some(candidate => areaBoundsOverlap(pad, candidate, 260)))) continue;
      return { area, passage, lake: makeLakeRogaWater(area, dirX, dirY) };
    }
    const area = makeTouchingArea(gandersville, LAKE_ROGA_AREA_NAME, baseDir.x, baseDir.y, width, height, 0.46, levelRange, "None", 0.34, 540);
    area.groundTexture = "./assets/ground/swamp.png";
    return {
      area,
      passage: makeConnectionReservation(gandersville, area, baseDir.x, baseDir.y, 320, LAKE_ROGA_AREA_NAME),
      lake: makeLakeRogaWater(area, baseDir.x, baseDir.y)
    };
  }

  function makeLakeRogaWater(area, dirX = 0, dirY = 1) {
    const length = Math.hypot(dirX, dirY) || 1;
    const awayX = dirX / length;
    const awayY = dirY / length;
    const sideX = -awayY;
    const sideY = awayX;
    const farOffset = areaRadiusAt(area, awayX, awayY) * randomBetween(0.42, 0.54);
    const sideOffset = randomBetween(-90, 90);
    return {
      kind: "lake-roga-water",
      areaName: LAKE_ROGA_AREA_NAME,
      x: area.center.x + awayX * farOffset + sideX * sideOffset,
      y: area.center.y + awayY * farOffset + sideY * sideOffset,
      rx: area.width * randomBetween(0.22, 0.27),
      ry: area.height * randomBetween(0.18, 0.23),
      wobble: Array.from({ length: 36 }, (_, index) => {
        const wave = Math.sin(index * 0.92) * 0.07;
        return randomBetween(0.84, 1.16) + wave;
      })
    };
  }

  function makeLakeRogaFlora(area, passages, lake, count) {
    const obstacles = [];
    const kinds = [
      "weeping-willow",
      "weeping-willow",
      "summer-tree",
      "summer-tree",
      "plum-tree",
      "plum-tree",
      "summer-bush",
      "summer-bush",
      "summer-bush"
    ];
    let attempts = 0;
    while (obstacles.length < count && attempts < count * 110) {
      attempts += 1;
      const kind = kinds[randomInt(0, kinds.length - 1)];
      const obstacle = {
        x: randomBetween(area.center.x - area.width * 0.46, area.center.x + area.width * 0.46),
        y: randomBetween(area.center.y - area.height * 0.46, area.center.y + area.height * 0.46),
        radius: kind === "summer-bush" ? randomBetween(12, 24) : kind === "weeping-willow" ? randomBetween(22, 42) : randomBetween(18, 36),
        kind
      };
      if (!isPointInBoundary(obstacle.x, obstacle.y, area.boundary)) continue;
      if (pointInAnyPassage(obstacle.x, obstacle.y, passages, obstacle.radius + 24)) continue;
      if (pointInPuddle(obstacle.x, obstacle.y, lake, obstacle.radius + 38)) continue;
      if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 44)) continue;
      obstacles.push(obstacle);
    }
    return obstacles;
  }

  function makeAreaFeatureObstacles(area, passages, existingObstacles, specs, count) {
    const obstacles = [];
    const weightedSpecs = [];
    for (const spec of specs || []) {
      const weight = Math.max(1, Math.floor(Number(spec.weight) || 1));
      for (let i = 0; i < weight; i += 1) weightedSpecs.push(spec);
    }
    if (!area || !weightedSpecs.length || count <= 0) return obstacles;
    let attempts = 0;
    while (obstacles.length < count && attempts < count * 130) {
      attempts += 1;
      const spec = weightedSpecs[randomInt(0, weightedSpecs.length - 1)];
      const obstacle = {
        x: randomBetween(area.center.x - area.width * 0.46, area.center.x + area.width * 0.46),
        y: randomBetween(area.center.y - area.height * 0.46, area.center.y + area.height * 0.46),
        radius: randomBetween(spec.minRadius || 14, spec.maxRadius || 34),
        kind: spec.kind || "boulder"
      };
      if (!isPointInBoundary(obstacle.x, obstacle.y, area.boundary)) continue;
      if (pointInAnyPassage(obstacle.x, obstacle.y, passages, obstacle.radius + 28)) continue;
      if (existingObstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 42)) continue;
      if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 42)) continue;
      obstacles.push(obstacle);
    }
    return obstacles;
  }
  
  function makeGandersvilleSite(gandersville) {
    const cx = gandersville.center.x;
    const cy = gandersville.center.y;
    const townSquare = {
      id: "gandersville-town-square",
      name: "Gandersville Town Square",
      x: cx,
      y: cy,
      w: 360,
      h: 280
    };
    const namedHouseOptions = name => ({
      label: name,
      metadata: { area: GANDERSVILLE_AREA_NAME, name }
    });
    const isSouthOfSquare = y => y > townSquare.y + townSquare.h * 0.28;
    const makeVillageHouse = (id, name, x, y) => {
      const options = { ...namedHouseOptions(name), roofTexture: "redShingles" };
      return isSouthOfSquare(y)
        ? makeNorthEntranceHouse(id, x, y, options)
        : makeHouse(id, x, y, 340, 270, options);
    };
    const makeThatchedHouse = (id, name, x, y) => makeHouse(id, x, y, 340, 270, {
      ...namedHouseOptions(name),
      roofTexture: "thatch"
    });
    const makeVillageLonghouse = (id, name, x, y, roofTexture = "redShingles") => {
      const options = { ...namedHouseOptions(name), roofTexture };
      return isSouthOfSquare(y)
        ? makeNorthEntranceLonghouse(id, x, y, options)
        : makeLonghouse(id, x, y, options);
    };
    const placed = (x, y) => ({ x: x + randomBetween(-12, 12), y: y + randomBetween(-12, 12) });
    const homeSlots = shuffled([
      placed(cx + 760, cy - 670),
      placed(cx + 780, cy + 610),
      placed(cx - 820, cy + 580)
    ]);
    const longhouseSlots = shuffled([
      placed(cx + 150, cy - 680),
      placed(cx + 90, cy + 690)
    ]);
    const townHall = makeLHouse("gandersville-town-hall", cx - 790, cy - 700, {
      ...namedHouseOptions("Gandersville Town Hall"),
      roofTexture: "redShingles"
    });
    const homes = [1, 2, 3].map(index => makeVillageHouse(
      `gandersville-home-${index}`,
      `Gandersville Home ${index}`,
      homeSlots[index - 1].x,
      homeSlots[index - 1].y
    ));
    const house4 = makeThatchedHouse("gandersville-house-4", "Gandersville House 4", cx - 430, cy - 70);
    const house5 = makeThatchedHouse("gandersville-house-5", "Gandersville House 5", cx + 430, cy - 70);
    const middleHomes = [
      house4,
      house5
    ];
    const churchSlot = placed(cx - 1120, cy + 20);
    const church = makeTallHouse("gandersville-church", churchSlot.x, churchSlot.y, {
      ...namedHouseOptions("Gandersville Church"),
      roofTexture: "redShingles",
      floorTexture: "stoneTiles"
    });
    const mageGuildSlot = placed(cx + 1120, cy + 0);
    const mageGuild = makeCircularHouse("gandersville-mage-guild", mageGuildSlot.x, mageGuildSlot.y, 330, {
      ...namedHouseOptions("Gandersville Mage Guild"),
      roofTexture: "purpleCircularShingles",
      floorTexture: "mageGuildCarpet"
    });
    const barracksSlot = longhouseSlots[0];
    const bankSlot = longhouseSlots[1];
    const barracks = makeVillageLonghouse("gandersville-barracks", "Gandersville Barracks", barracksSlot.x, barracksSlot.y, "thatch");
    const bank = makeVillageLonghouse("gandersville-bank", "Gandersville Bank", bankSlot.x, bankSlot.y, "redShingles");
    const houses = [townHall, ...homes, ...middleHomes, church, mageGuild, barracks, bank];
    const northWallFurniture = (house, kind, options = {}) => {
      const interior = house.interior || house.floor;
      const x = interior.x + interior.w * (options.xFraction ?? 0.5) + (options.xOffset || 0);
      const y = interior.y + (options.yOffset ?? 44);
      return {
        id: options.id || `${house.id}-${kind}`,
        kind,
        houseId: house.id,
        area: GANDERSVILLE_AREA_NAME,
        x,
        y,
        size: options.size || 142,
        yOffset: options.spriteYOffset || 0,
        nonBlocking: true
      };
    };
    const placedFurniture = (house, kind, options = {}) => {
      const interior = house.interior || house.floor;
      return {
        id: options.id || `${house.id}-${kind}`,
        kind,
        houseId: house.id,
        area: GANDERSVILLE_AREA_NAME,
        x: options.x ?? (interior.x + interior.w * (options.xFraction ?? 0.5) + (options.xOffset || 0)),
        y: options.y ?? (interior.y + interior.h * (options.yFraction ?? 0.5) + (options.yOffset || 0)),
        size: options.size || 142,
        scaleX: options.scaleX || 1,
        scaleY: options.scaleY || 1,
        yOffset: options.spriteYOffset || 0,
        nonBlocking: true
      };
    };
    const furniture = [
      placedFurniture(house5, "loom", { id: "gandersville-house-5-loom", size: 116, xFraction: 0.16, yFraction: 0.18 }),
      placedFurniture(house5, "dress-form-mannequin", { id: "gandersville-house-5-dress-form-mannequin", size: 58, scaleX: 0.5, xFraction: 0.84, yFraction: 0.18 }),
      placedFurniture(barracks, "smelting-furnace", { id: "gandersville-barracks-smelting-furnace", size: 136, x: barracks.x - barracks.w / 2 - 92, y: barracks.y - 42 }),
      placedFurniture(barracks, "anvil", { id: "gandersville-barracks-anvil", size: 48, x: barracks.x - barracks.w / 2 - 92, y: barracks.y + 68 }),
      placedFurniture(barracks, "crafting-table", { id: "gandersville-barracks-crafting-table", size: 110, xFraction: 0.88, yFraction: 0.78 }),
      placedFurniture(house4, "tanning-drum", { id: "gandersville-house-4-tanning-drum", size: 138, x: house4.x - house4.w / 2 - 86, y: house4.y + 8 }),
      placedFurniture(homes[0], "potionmaking-table", { id: "gandersville-house-1-potionmaking-table", size: 114, xFraction: 0.5, yFraction: 0.68 })
    ];
    return {
      houses,
      furniture,
      townHall,
      bank,
      townSquare,
      playerStart: { x: gandersville.center.x, y: gandersville.center.y + 230 },
      huntsmanRobb: {
        id: "huntsman-robb",
        name: "Huntsman Robb",
        x: house4.shopSpot.x,
        y: house4.shopSpot.y,
        radius: 16,
        shopkeeper: true
      },
      blacksmithFredward: {
        id: "blacksmith-fredward",
        name: "Blacksmith Fredward",
        x: barracks.shopSpot.x,
        y: barracks.shopSpot.y,
        radius: 16,
        shopkeeper: true
      },
      tailorAntonia: {
        id: "tailor-antonia",
        name: "Tailor Antonia",
        x: house5.shopSpot.x,
        y: house5.shopSpot.y,
        radius: 16,
        shopkeeper: true
      },
      barbarianessSkjoldma: {
        id: "barbarianess-skjoldma",
        name: "Barbarianess Skjoldma",
        x: barracks.shopSpot.x + 82,
        y: barracks.shopSpot.y - 30,
        radius: 16
      },
      chaplainSonsam: {
        id: "chaplain-sonsam",
        name: "Chaplain Sonsam",
        x: church.shopSpot.x,
        y: church.shopSpot.y,
        radius: 16,
        shopkeeper: true
      },
      highPriestessSierra: {
        id: "high-priestess-sierra",
        name: "High Priestess Sierra",
        x: church.shopSpot.x + 78,
        y: church.shopSpot.y - 34,
        radius: 16,
        trainer: true
      },
      alchemistClaristra: {
        id: "alchemist-claristra",
        name: "Alchemist Claristra",
        x: mageGuild.shopSpot.x,
        y: mageGuild.shopSpot.y,
        radius: 16,
        shopkeeper: true
      },
      magisterMaimon: {
        id: "magister-maimon",
        name: "Magister Maimon",
        x: mageGuild.shopSpot.x + 78,
        y: mageGuild.shopSpot.y - 34,
        radius: 16,
        trainer: true,
        startsQuest: true,
        questId: "introduction-to-ether"
      },
      juanTabo: {
        id: "juan-tabo",
        name: "Juan Tabo",
        x: townHall.shopSpot.x,
        y: townHall.shopSpot.y,
        radius: 16
      },
      lordYantos: {
        id: "lord-yantos",
        name: "Lord Yantos",
        x: townHall.shopSpot.x + 82,
        y: townHall.shopSpot.y - 34,
        radius: 16
      },
      bankerArgento: {
        id: "banker-argento",
        name: "Banker Argento",
        x: bank.shopSpot.x,
        y: bank.shopSpot.y,
        radius: 16,
        banker: true
      },
      gvada: {
        name: "Gvada",
        x: gandersville.center.x - 110,
        y: gandersville.center.y + 90,
        radius: 16,
        spoken: false
      }
    };
  }

  function configuredNpcById(id) {
    const helpers = window.SoulreaperNpcInteractions || {};
    const configs = window.SoulreaperWorldData?.devNpcConfigs || window.devNpcConfigs || [];
    return helpers.npcConfigFor?.(id)
      || (Array.isArray(configs) ? configs.find(config => config.id === id) : null)
      || requiredConfiguredNpcById(id)
      || null;
  }

  function requiredConfiguredNpcById(id) {
    return ({
      "mira-kettlewick": {
        id: "mira-kettlewick",
        name: "Mira Kettlewick",
        area: GANDERSVILLE_AREA_NAME,
        alignment: "Neutral",
        radius: 16,
        sprite: "./assets/sprites/npcs/villager-female.png",
        startsQuest: true,
        questId: "pantry-pests",
        dialogueContexts: {
          questOffer: "My pantry is crawling with rats. I cannot cook, I cannot sleep, and I will not open another cupboard until someone clears them out.",
          questAccepted: "Thank you. The pantry is through the back. Please be quick.",
          questActive: "The rats are still in there. I can hear them chewing.",
          questReady: "Quiet at last. You have saved my stores and what remained of my patience.",
          questAfterComplete: "My pantry is peaceful again. I still check the corners twice."
        }
      },
      "sergeant-bram": {
        id: "sergeant-bram",
        name: "Sergeant Bram",
        area: GANDERSVILLE_AREA_NAME,
        alignment: "Neutral Good",
        radius: 16,
        sprite: "./assets/sprites/npcs/guard.png",
        startsQuest: true,
        questId: "fen-patrol",
        questMinimumLevelText: "The Fen patrol is not work for a green recruit. Come back when you are LVL {level}.",
        dialogueContexts: {
          questOffer: "The road by Ganderswood Fen has been too quiet, which usually means trouble is choosing where to strike. Thin the Goblin Thugs and Goblin Shamans out there, then report back.",
          questActive: "Finish the Fen patrol. Goblins do not stop being a problem because we stop counting them.",
          questReady: "Good work. The road will breathe easier for a while.",
          questAfterComplete: "Keep your eyes on the Fen. It has a habit of growing new problems."
        }
      },
      "widow-elowen": {
        id: "widow-elowen",
        name: "Widow Elowen",
        area: GANDERSVILLE_AREA_NAME,
        alignment: "Neutral Good",
        radius: 16,
        sprite: "./assets/sprites/npcs/old-woman.png",
        startsQuest: true,
        questId: "flowers-for-the-grave",
        questMinimumLevelText: "The graveyard is no place for you yet. Return when you are LVL {level}.",
        dialogueContexts: {
          questOffer: "My husband rests in the Fen graveyard, and I have not had the courage to go. Please take these Mourning Flowers to his grave.",
          questActive: "Please place the Mourning Flowers at my husband's grave in the Fen.",
          questReady: "You placed them? Thank you. Some debts of the heart can only be carried by another.",
          questAfterComplete: "You gave an old grief a little peace.",
          letterRead: "This letter... I thought his last words were lost. You have returned more than flowers to me."
        }
      },
      "reeve-marlowe": {
        id: "reeve-marlowe",
        name: "Reeve Marlowe",
        area: GANDERSVILLE_AREA_NAME,
        alignment: "Neutral",
        radius: 16,
        sprite: "./assets/sprites/npcs/mayor.png",
        startsQuest: true,
        questId: "roga-reconnaissance",
        questChain: ["roga-reconnaissance", "grindylow-problem", "bogseer-signs"],
        questMinimumLevelText: "Lake Roga is no errand for an untested soulreaper. Return when you are LVL {level}.",
        dialogueContexts: {
          questOffer: "Gandersville has need of eyes on Lake Roga. The waterline has grown restless, and the first task is simple: clear enough of the smaller threats that folk can approach the shore again.",
          questActive: "Lake Roga still needs your attention. Finish the work marked in your Chronicle and report back here.",
          questReady: "Good. A report backed by action is worth more than a stack of frightened rumors.",
          questAfterComplete: "For now, Town Hall has what it needs from Lake Roga. If the lake stirs again, I will know where to look."
        }
      }
    })[id] || null;
  }

  function makeConfiguredNpc(id, x, y, overrides = {}) {
    const config = configuredNpcById(id) || {};
    return {
      ...config,
      id,
      name: config.name || overrides.name || id,
      radius: Number(config.radius) || 16,
      renderScale: 1.12,
      ...overrides,
      x,
      y
    };
  }

  function makeDyariaNpc(x, y) {
    const config = configuredNpcById("druidess-dyaria")
      || configuredNpcById("soulreaper-trainer-dyaria")
      || ((window.SoulreaperWorldData?.devNpcConfigs || window.devNpcConfigs || [])
        .find(npc => npc?.name === "Druidess Dyaria" || npc?.name === "Soulreaper Trainer Dyaria"))
      || {};
    return {
      ...config,
      id: config.id || "druidess-dyaria",
      name: config.name || "Druidess Dyaria",
      radius: Number(config.radius) || 16,
      renderScale: 1.12,
      trainer: true,
      shopkeeper: true,
      sprite: config.sprite || "sylvanSoulreaperFemale",
      x,
      y
    };
  }

  function randomConfiguredNpcInArea(id, area, areas, passages, houses, avoid = []) {
    const radius = Number(configuredNpcById(id)?.radius) || 16;
    for (let attempt = 0; attempt < 220; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.42, area.center.x + area.width * 0.42);
      const y = randomBetween(area.center.y - area.height * 0.42, area.center.y + area.height * 0.42);
      if (!isPointInBoundary(x, y, area.boundary)) continue;
      if (!areaAt(x, y, { areas, passages })) continue;
      if (pointInAnyPassage(x, y, passages, radius + 42)) continue;
      if ((houses || []).some(house => rectCollidesCircle(houseCollisionBounds(house, 110), x, y, radius))) continue;
      if ((avoid || []).some(npc => Math.hypot(x - npc.x, y - npc.y) < radius + npc.radius + 110)) continue;
      return makeConfiguredNpc(id, x, y, { wandering: true });
    }
    return makeConfiguredNpc(id, area.center.x + randomBetween(-260, 260), area.center.y + randomBetween(-260, 260), { wandering: true });
  }

  function makeConfiguredMapNpcs({ ganderswood, fenhold, gandersvilleSite, bumsforkSite, areas, passages, houses, avoid }) {
    const keep = fenhold?.keep;
    const keepNpcs = keep ? [
      makeConfiguredNpc("banker-smeraldo", keep.x - 250, keep.y - 345, { banker: true }),
      makeConfiguredNpc("master-of-arms-lenn", keep.x + 245, keep.y - 345, { trainer: true, shopkeeper: true }),
      makeConfiguredNpc("heretic-nast", keep.x - 390, keep.y + 120, { trainer: true, shopkeeper: true }),
      makeConfiguredNpc("necromancer-morgane", keep.x + 390, keep.y + 120, { trainer: true, shopkeeper: true }),
      makeConfiguredNpc("dark-priest-zayn", keep.x, keep.y - 250, { trainer: true, shopkeeper: true }),
      makeConfiguredNpc("lord-rauf", keep.x, keep.y + 20)
    ] : [];
    const argento = gandersvilleSite?.bankerArgento
      ? makeConfiguredNpc("banker-argento", gandersvilleSite.bankerArgento.x, gandersvilleSite.bankerArgento.y, { banker: true })
      : null;
    const ndora = bumsforkSite?.mageGuild
      ? makeConfiguredNpc("magister-ndora", bumsforkSite.mageGuild.shopSpot.x, bumsforkSite.mageGuild.shopSpot.y, { trainer: true, shopkeeper: true })
      : null;
    const houseById = id => gandersvilleSite?.houses?.find(house => house.id === id);
    const npcInHouse = (id, houseId, xFraction = 0.5, yFraction = 0.5, overrides = {}) => {
      const house = houseById(houseId);
      const interior = house?.interior || house?.floor;
      if (!interior) return null;
      return makeConfiguredNpc(id, interior.x + interior.w * xFraction, interior.y + interior.h * yFraction, {
        houseId,
        ...overrides
      });
    };
    const gandersvilleQuestNpcs = [
      npcInHouse("mira-kettlewick", "gandersville-home-1", 0.18, 0.18),
      npcInHouse("sergeant-bram", "gandersville-home-2", 0.5, 0.48),
      npcInHouse("widow-elowen", "gandersville-home-3", 0.5, 0.48),
      npcInHouse("reeve-marlowe", "gandersville-town-hall", 0.78, 0.58)
    ].filter(Boolean);
    const walden = randomConfiguredNpcInArea("naturalist-walden", ganderswood, areas, passages, houses, [
      ...(avoid || []),
      ...keepNpcs,
      argento,
      ndora,
      ...gandersvilleQuestNpcs
    ].filter(Boolean));
    return [argento, ...keepNpcs, ndora, ...gandersvilleQuestNpcs, walden].filter(Boolean);
  }

  function makeFenholdKeepEntranceGuards(keep) {
    const names = ["Shadow Guard Zelus", "Shadow Guard Ares", "Shadow Guard Limos", "Shadow Guard Mors"];
    return (keep?.outsideDoors || []).map((door, index) => ({
      name: names[index] || `Shadow Guard ${index + 1}`,
      template: "Shadow Guard",
      lvl: 10,
      x: door.x,
      y: door.y,
      aggroRange: 9,
      gold: "4D4",
      noWander: true
    }));
  }

  function midpoint(points = []) {
    const usable = points.filter(Boolean);
    if (!usable.length) return null;
    return {
      x: usable.reduce((sum, point) => sum + point.x, 0) / usable.length,
      y: usable.reduce((sum, point) => sum + point.y, 0) / usable.length
    };
  }

  function makeGandersguardFootmen(site, gandersvillePassage) {
    const footman = point => ({
      name: "Gandersguard Footman",
      template: "Guard",
      lvl: 10,
      x: point.x,
      y: point.y,
      aggroRange: 9,
      gold: "4D4",
      noWander: true
    });
    const spawns = [];
    if (gandersvillePassage) {
      const dx = gandersvillePassage.x2 - gandersvillePassage.x1;
      const dy = gandersvillePassage.y2 - gandersvillePassage.y1;
      const length = Math.hypot(dx, dy) || 1;
      const dirX = dx / length;
      const dirY = dy / length;
      const perpX = -dirY;
      const perpY = dirX;
      const gateX = gandersvillePassage.x2 + dirX * 110;
      const gateY = gandersvillePassage.y2 + dirY * 110;
      spawns.push(
        footman({ x: gateX + perpX * 125, y: gateY + perpY * 125 }),
        footman({ x: gateX - perpX * 125, y: gateY - perpY * 125 })
      );
    }
    const townHallPost = midpoint(site?.townHall?.outsideDoors);
    if (townHallPost) spawns.push(footman({ x: townHallPost.x + RANGE_UNIT * 3, y: townHallPost.y }));
    const bankPost = midpoint(site?.bank?.outsideDoors);
    if (bankPost) spawns.push(footman(bankPost));
    return spawns;
  }
  
  function makeGandersvilleGreenery(gandersville, site, passages, houses, count) {
    const greenery = [];
    const square = site?.townSquare;
    let attempts = 0;
    while (greenery.length < count && attempts < count * 80) {
      attempts += 1;
      const obstacle = {
        x: randomBetween(gandersville.center.x - gandersville.width * 0.44, gandersville.center.x + gandersville.width * 0.44),
        y: randomBetween(gandersville.center.y - gandersville.height * 0.44, gandersville.center.y + gandersville.height * 0.44),
        radius: Math.random() < 0.68 ? randomBetween(16, 27) : randomBetween(12, 19),
        kind: randomGandersvilleGreeneryKind()
      };
      if (!isPointInBoundary(obstacle.x, obstacle.y, gandersville.boundary)) continue;
      if (pointInAnyPassage(obstacle.x, obstacle.y, passages, obstacle.radius + 18)) continue;
      if (square && rectCollidesCircle({
        x: square.x - square.w / 2 - 230,
        y: square.y - square.h / 2 - 230,
        w: square.w + 460,
        h: square.h + 460
      }, obstacle.x, obstacle.y, obstacle.radius)) continue;
      if ((houses || []).some(house => rectCollidesCircle(houseCollisionBounds(house, 95), obstacle.x, obstacle.y, obstacle.radius))) continue;
      if (site?.gvada && Math.hypot(obstacle.x - site.gvada.x, obstacle.y - site.gvada.y) < obstacle.radius + 85) continue;
      if (greenery.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 36)) continue;
      greenery.push(obstacle);
    }
    return greenery;
  }

  function randomGandersvilleGreeneryKind() {
    const roll = Math.random();
    if (roll < 0.34) return "summer-tree";
    if (roll < 0.56) return "autumn-tree";
    if (roll < 0.78) return "summer-bush";
    return "autumn-bush";
  }

  function makeGandersvilleTownStatue(site) {
    const square = site?.townSquare || { x: 0, y: 0 };
    return {
      x: square.x,
      y: square.y,
      radius: 56,
      kind: "ruined-statue"
    };
  }
  
  function makeGladeRuinedPillars(glade, passages, puddles, eliteSpawns, count) {
    const pillars = [];
    let attempts = 0;
    while (pillars.length < count && attempts < count * 90) {
      attempts += 1;
      const obstacle = {
        x: randomBetween(glade.center.x - glade.width * 0.39, glade.center.x + glade.width * 0.39),
        y: randomBetween(glade.center.y - glade.height * 0.39, glade.center.y + glade.height * 0.39),
        radius: randomBetween(20, 30),
        kind: "ruined-pillar"
      };
      if (!isPointInBoundary(obstacle.x, obstacle.y, glade.boundary)) continue;
      if (pointInAnyPassage(obstacle.x, obstacle.y, passages, obstacle.radius + 28)) continue;
      if (puddles.some(puddle => pointInPuddle(obstacle.x, obstacle.y, puddle, obstacle.radius + 16))) continue;
      if (eliteSpawns.some(elite => Math.hypot(obstacle.x - elite.x, obstacle.y - elite.y) < obstacle.radius + 150)) continue;
      if (pillars.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 115)) continue;
      pillars.push(obstacle);
    }
    return pillars;
  }
  
  function makeEvermistGlade(glade, blockedAreas = []) {
    const width = 3600;
    const height = 3000;
    const startAngle = randomBetween(0, Math.PI * 2);
    const stepAngle = Math.PI * (3 - Math.sqrt(5));
    let fallback = null;
    for (let attempt = 0; attempt < 220; attempt += 1) {
      const angle = startAngle + attempt * stepAngle;
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      const gladeRadius = boundaryRadiusAt(glade, dirX, dirY);
      const evermistRadius = areaRadiusAt({ width, height }, dirX, dirY);
      const area = makeTouchingArea(
        glade,
        EVERMIST_GLADE_NAME,
        dirX,
        dirY,
        width,
        height,
        0.58,
        { min: 20, max: 23 },
        "Normal",
        0.42,
        500
      );
      const passage = makePassage(
        glade.center.x + dirX * Math.max(0, gladeRadius - 560),
        glade.center.y + dirY * Math.max(0, gladeRadius - 560),
        area.center.x - dirX * Math.max(0, evermistRadius - 620),
        area.center.y - dirY * Math.max(0, evermistRadius - 620),
        420,
        EVERMIST_GLADE_NAME
      );
      const passagePads = makeConnectorFloorPads([passage], EVERMIST_GLADE_NAME, { min: 20, max: 23 }, "Normal", Math.max(220, passage.width * 0.7));
      fallback = { area, passage };
      if (
        blockedAreas.every(blocked => !areaBoundsOverlap(area, blocked, 260))
        && blockedAreas.every(blocked => !areaBoundsOverlap(passage, blocked, 260))
        && passagePads.every(pad => blockedAreas.every(blocked => !areaBoundsOverlap(pad, blocked, 260)))
      ) return { area, passage };
    }
    return fallback;
  }
  
  function boundsOverlap(a, b, padding = 0) {
    return a.minX - padding <= b.maxX
      && a.maxX + padding >= b.minX
      && a.minY - padding <= b.maxY
      && a.maxY + padding >= b.minY;
  }
  
  function areasOverlap(areaA, areaB, padding = 0) {
    if (!areaA?.boundary || !areaB?.boundary) return false;
    const boundsA = areaA.bounds || boundsForPoints(areaA.boundary);
    const boundsB = areaB.bounds || boundsForPoints(areaB.boundary);
    if (!boundsOverlap(boundsA, boundsB, padding)) return false;
    if (areaA.boundary.some(point => isPointInBoundary(point.x, point.y, areaB.boundary))) return true;
    if (areaB.boundary.some(point => isPointInBoundary(point.x, point.y, areaA.boundary))) return true;
    for (let i = 0; i < areaA.boundary.length; i += 1) {
      const a1 = areaA.boundary[i];
      const a2 = areaA.boundary[(i + 1) % areaA.boundary.length];
      for (let j = 0; j < areaB.boundary.length; j += 1) {
        const b1 = areaB.boundary[j];
        const b2 = areaB.boundary[(j + 1) % areaB.boundary.length];
        if (segmentsIntersect(a1, a2, b1, b2)) return true;
      }
    }
    return false;
  }
  
  function segmentsIntersect(a, b, c, d) {
    const cross = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
    const onSegment = (p, q, r) => Math.min(p.x, r.x) <= q.x && q.x <= Math.max(p.x, r.x)
      && Math.min(p.y, r.y) <= q.y && q.y <= Math.max(p.y, r.y);
    const o1 = Math.sign(cross(a, b, c));
    const o2 = Math.sign(cross(a, b, d));
    const o3 = Math.sign(cross(c, d, a));
    const o4 = Math.sign(cross(c, d, b));
    if (o1 !== o2 && o3 !== o4) return true;
    if (o1 === 0 && onSegment(a, c, b)) return true;
    if (o2 === 0 && onSegment(a, d, b)) return true;
    if (o3 === 0 && onSegment(c, a, d)) return true;
    if (o4 === 0 && onSegment(c, b, d)) return true;
    return false;
  }
  
  function evermistFeatureRadius(kind) {
    if (kind === "summer-bush") return randomBetween(14, 24);
    if (kind === "ruined-pillar") return randomBetween(19, 30);
    if (kind === "ancient-tree") return randomBetween(30, 48);
    return randomBetween(22, 40);
  }
  
  function makeEvermistFeatures(area, passages, count) {
    const features = [];
    const plan = [
      { kind: "summer-tree", count: Math.round(count * 0.46) },
      { kind: "summer-bush", count: Math.round(count * 0.32) },
      { kind: "ancient-tree", count: 10 },
      { kind: "enchanted-tree", count: 10 },
      { kind: "ruined-pillar", count: 6 }
    ];
    let attempts = 0;
    for (const entry of plan) {
      let placed = 0;
      while (placed < entry.count && attempts < count * 120) {
        attempts += 1;
        const kind = entry.kind;
        const obstacle = {
          x: randomBetween(area.center.x - area.width * 0.45, area.center.x + area.width * 0.45),
          y: randomBetween(area.center.y - area.height * 0.45, area.center.y + area.height * 0.45),
          radius: evermistFeatureRadius(kind),
          kind
        };
        if (!isPointInBoundary(obstacle.x, obstacle.y, area.boundary)) continue;
        if (pointInAnyPassage(obstacle.x, obstacle.y, passages, obstacle.radius + 54)) continue;
        const spacing = kind === "summer-bush" ? 28 : kind === "ruined-pillar" ? 70 : 62;
        if (features.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + spacing)) continue;
        features.push(obstacle);
        placed += 1;
      }
    }
    return features;
  }
  
  function makeEvermistClouds(area, count) {
    const clouds = [];
    let attempts = 0;
    while (clouds.length < count && attempts < count * 70) {
      attempts += 1;
      const x = randomBetween(area.center.x - area.width * 0.48, area.center.x + area.width * 0.48);
      const y = randomBetween(area.center.y - area.height * 0.48, area.center.y + area.height * 0.48);
      if (!isPointInBoundary(x, y, area.boundary)) continue;
      clouds.push({
        areaName: EVERMIST_GLADE_NAME,
        x,
        y,
        rx: randomBetween(150, 340),
        ry: randomBetween(48, 110),
        phase: randomBetween(0, Math.PI * 2),
        drift: randomBetween(16, 48),
        speed: randomBetween(0.055, 0.13),
        alpha: randomBetween(0.11, 0.23)
      });
    }
    return clouds;
  }
  
  function makeGrimswoodPath(fen, fenDirX, fenDirY) {
    const angle = Math.atan2(fenDirY, fenDirX) + randomBetween(-0.55, 0.55);
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };
    const tangent = { x: -dir.y, y: dir.x };
    const fenRadius = areaRadiusAt(fen, dir.x, dir.y);
    const entrance = {
      x: fen.center.x + dir.x * (fenRadius - 440),
      y: fen.center.y + dir.y * (fenRadius - 440)
    };
    const hubCenter = {
      x: fen.center.x + dir.x * (fenRadius + 3400),
      y: fen.center.y + dir.y * (fenRadius + 3400)
    };
    const hub = makeArea(GRIMSWOOD_PATH_NAME, hubCenter.x, hubCenter.y, 1280, 860, 0.58, { min: 7, max: 8 }, "Normal", 0.34);
    const stem = makeWindingPolyline(entrance, hubCenter, 7, 115);
    const branchAngles = [angle - 0.72, angle + 0.72];
    const branches = branchAngles.map(branchAngle => {
      const branchEnd = {
        x: hubCenter.x + Math.cos(branchAngle) * 3800,
        y: hubCenter.y + Math.sin(branchAngle) * 3800
      };
      return makeWindingPolyline(hubCenter, branchEnd, 7, 125);
    });
    const wyndhelmIndex = Math.random() < 0.5 ? 0 : 1;
    const crowingIndex = wyndhelmIndex === 0 ? 1 : 0;
    const passages = [
      ...polylineToPassages(stem, 540, GRIMSWOOD_PATH_NAME),
      ...polylineToPassages(branches[wyndhelmIndex], 495, GRIMSWOOD_PATH_NAME),
      ...polylineToPassages(branches[crowingIndex], 495, GRIMSWOOD_PATH_NAME)
    ];
    return { hub, hubCenter, entrance, passages, villageRange: 24, wyndhelmBranch: branches[wyndhelmIndex], crowingBranch: branches[crowingIndex] };
  }
  
  function makeWindingPolyline(start, end, segments, wobble) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    const dir = { x: dx / length, y: dy / length };
    const tangent = { x: -dir.y, y: dir.x };
    let drift = 0;
    return Array.from({ length: segments + 1 }, (_, index) => {
      const t = index / segments;
      drift += randomBetween(-36, 36);
      const wave = Math.sin(t * Math.PI * 2.4 + randomBetween(-0.3, 0.3)) * wobble + drift;
      return {
        x: start.x + dx * t + tangent.x * wave,
        y: start.y + dy * t + tangent.y * wave
      };
    });
  }
  
  function polylineToPassages(points, width, areaName, surface = null) {
    const passages = [];
    for (let i = 0; i < points.length - 1; i += 1) {
      passages.push(makePassage(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, width, areaName, surface));
    }
    return passages;
  }
  
  function pathEndDirection(points) {
    const end = points[points.length - 1];
    const beforeEnd = points[points.length - 2];
    const dx = end.x - beforeEnd.x;
    const dy = end.y - beforeEnd.y;
    const length = Math.hypot(dx, dy) || 1;
    return { x: dx / length, y: dy / length };
  }
  
  function makeAreaAtPathEnd(name, path, width, height, gap, treeChance, levelRange, spawnRate, irregularity) {
    const end = path[path.length - 1];
    const dir = pathEndDirection(path);
    const radius = Math.min(
      Math.abs((width / 2) / (dir.x || 0.0001)),
      Math.abs((height / 2) / (dir.y || 0.0001))
    );
    return makeArea(
      name,
      end.x + dir.x * (radius + gap),
      end.y + dir.y * (radius + gap),
      width,
      height,
      treeChance,
      levelRange,
      spawnRate,
      irregularity
    );
  }
  
  function makeCircularBoundary(cx, cy, radius, points = 18) {
    return Array.from({ length: points }, (_, index) => {
      const angle = (index / points) * Math.PI * 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius
      };
    });
  }
  
  function makeConnectorFloorPads(passages, areaName, levelRange, spawnRate, radius) {
    const pads = [];
    for (const passage of passages) {
      const length = Math.hypot(passage.x2 - passage.x1, passage.y2 - passage.y1);
      const steps = Math.max(3, Math.ceil(length / (radius * 0.75)));
      for (let i = 0; i <= steps; i += 1) {
        const t = i / steps;
        const x = passage.x1 + (passage.x2 - passage.x1) * t;
        const y = passage.y1 + (passage.y2 - passage.y1) * t;
        const boundary = makeCircularBoundary(x, y, radius);
        pads.push({
          name: areaName,
          center: { x, y },
          width: radius * 2,
          height: radius * 2,
          boundary,
          bounds: boundsForPoints(boundary),
          treeChance: 0,
          levelRange,
          spawnRate
        });
      }
    }
    return pads;
  }

  function makeMissingTransitionPads(areas, passages) {
    const MAX_MISSING_TRANSITION_PAD_LENGTH = 1800;
    const pads = [];
    for (const passage of passages) {
      if (isPassageCoveredByAreas(passage, areas.concat(pads))) continue;
      const targetArea = findLastAreaByName(areas, passage.areaName);
      for (const missingPassage of missingPassageSegments(passage, areas.concat(pads))) {
        const requiredPassage = isRequiredTransitionPassage(passage);
        if (!requiredPassage && passageLength(missingPassage) > MAX_MISSING_TRANSITION_PAD_LENGTH) continue;
        pads.push(...makeConnectorFloorPads(
          [missingPassage],
          passage.areaName,
          targetArea?.levelRange || { min: 1, max: 1 },
          targetArea?.spawnRate || "None",
          Math.max(220, passage.width * 0.7)
        ));
      }
    }
    return pads;
  }

  function repairMissingTransitionPads(areas, passages) {
    for (let pass = 0; pass < 4; pass += 1) {
      const pads = makeMissingTransitionPads(areas, passages);
      if (!pads.length) return;
      areas.push(...pads);
      if (requiredTransitionsCovered(areas, passages)) return;
    }
  }

  function requiredTransitionsCovered(areas, passages) {
    return passages
      .filter(isRequiredTransitionPassage)
      .every(passage => isPassageCoveredByAreas(passage, areas));
  }

  function isRequiredTransitionPassage(passage) {
    return [
      FEN_AREA_NAME,
      FENHOLD_AREA_NAME,
      RAT_DEN_AREA_NAME,
      GANDERSVILLE_AREA_NAME,
      LAKE_ROGA_AREA_NAME,
      GLADE_AREA_NAME,
      EVERMIST_GLADE_NAME,
      GRIMSWOOD_PATH_NAME,
      WYNDHELM_AREA_NAME,
      CROWING_FIELDS_AREA_NAME,
      HARKHAR_HIGHLANDS_AREA_NAME,
      HARMUSH_LAGH_AREA_NAME,
      HIGHSTONE_PASS_AREA_NAME,
      HARGA_VOAGH_AREA_NAME,
      FIRECRY_PEAK_AREA_NAME,
      WASTES_OF_KEBAAN_AREA_NAME
    ].includes(passage?.areaName);
  }

  function missingPassageSegments(passage, areas) {
    const length = passageLength(passage);
    const steps = Math.max(6, Math.ceil(length / Math.max(110, passage.width * 0.32)));
    const missing = [];
    let openStart = null;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = passage.x1 + (passage.x2 - passage.x1) * t;
      const y = passage.y1 + (passage.y2 - passage.y1) * t;
      const covered = pointInAnyArea(x, y, areas);
      if (!covered && openStart === null) openStart = Math.max(0, (i - 1) / steps);
      if ((covered || i === steps) && openStart !== null) {
        const end = Math.min(1, (covered ? i : i + 1) / steps);
        if (end > openStart) missing.push(makePassageSegment(passage, openStart, end));
        openStart = null;
      }
    }
    return missing;
  }

  function makePassageSegment(passage, startT, endT) {
    return makePassage(
      passage.x1 + (passage.x2 - passage.x1) * startT,
      passage.y1 + (passage.y2 - passage.y1) * startT,
      passage.x1 + (passage.x2 - passage.x1) * endT,
      passage.y1 + (passage.y2 - passage.y1) * endT,
      passage.width,
      passage.areaName,
      passage.surface
    );
  }

  function isPassageCoveredByAreas(passage, areas) {
    const length = Math.hypot(passage.x2 - passage.x1, passage.y2 - passage.y1);
    const steps = Math.max(4, Math.ceil(length / Math.max(90, passage.width * 0.3)));
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = passage.x1 + (passage.x2 - passage.x1) * t;
      const y = passage.y1 + (passage.y2 - passage.y1) * t;
      if (!pointInAnyArea(x, y, areas)) return false;
    }
    return true;
  }

  function pointInAnyArea(x, y, areas) {
    return areas.some(area => {
      const bounds = area.bounds || boundsForPoints(area.boundary || []);
      if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) return false;
      return isPointInBoundary(x, y, area.boundary);
    });
  }

  function findLastAreaByName(areas, name) {
    for (let i = areas.length - 1; i >= 0; i -= 1) {
      if (areas[i]?.name === name) return areas[i];
    }
    return null;
  }
  
  function makePassageToArea(path, area, width, areaName, surface = null) {
    const end = path[path.length - 1];
    return makePassage(
      end.x,
      end.y,
      area.center.x,
      area.center.y,
      width,
      areaName,
      surface
    );
  }

  function makeRatDenCavernOffshoot(ratDen, blockedAreas = []) {
    const path = ratDen.path || [];
    if (path.length < 4) return { areas: [], passages: [], fixedSpawns: [] };
    const anchorIndex = Math.floor((path.length - 1) / 2);
    const before = path[anchorIndex];
    const after = path[anchorIndex + 1] || path[anchorIndex];
    const anchor = { x: (before.x + after.x) / 2, y: (before.y + after.y) / 2 };
    const mainDx = after.x - before.x;
    const mainDy = after.y - before.y;
    const mainLength = Math.hypot(mainDx, mainDy) || 1;
    const basePathAngle = Math.atan2(mainDy / mainLength, mainDx / mainLength);
    const width = 210;
    const mainCorridorRadius = 125;
    const ratRoomClearanceRadius = 360;

    const sideNormal = side => ({
      x: (-mainDy / mainLength) * side,
      y: (mainDx / mainLength) * side
    });

    const sideDistanceFromAnchor = (point, side) => {
      const normal = sideNormal(side);
      return (point.x - anchor.x) * normal.x + (point.y - anchor.y) * normal.y;
    };

    const distanceToRatDenPath = point => {
      let best = Infinity;
      for (let index = 0; index < path.length - 1; index += 1) {
        const start = path[index];
        const end = path[index + 1];
        best = Math.min(best, distancePointToSegment(point.x, point.y, start.x, start.y, end.x, end.y));
      }
      return best;
    };

    const clearsMainTunnel = (point, side, requiredClearance) => (
      sideDistanceFromAnchor(point, side) >= requiredClearance
      && distanceToRatDenPath(point) >= requiredClearance
    );

    const pathClearsMainTunnel = (points, side, skipConnector = false) => {
      for (let index = 0; index < points.length; index += 1) {
        if (skipConnector && index === 0) continue;
        const requiredClearance = index <= 1 && skipConnector
          ? mainCorridorRadius + 28
          : mainCorridorRadius + width / 2 + 70;
        if (!clearsMainTunnel(points[index], side, requiredClearance)) return false;
      }
      for (let index = 1; index < points.length; index += 1) {
        if (skipConnector && index === 1) continue;
        const start = points[index - 1];
        const end = points[index];
        for (let sample = 1; sample < 5; sample += 1) {
          const t = sample / 5;
          const point = {
            x: start.x + (end.x - start.x) * t,
            y: start.y + (end.y - start.y) * t
          };
          if (!clearsMainTunnel(point, side, mainCorridorRadius + width / 2 + 70)) return false;
        }
      }
      return true;
    };

    const ratRoomClearsMainTunnel = ratRoom => {
      if (!ratRoom) return false;
      const centerClearance = mainCorridorRadius + ratRoomClearanceRadius;
      if (distanceToRatDenPath(ratRoom.center) < centerClearance) return false;
      if (ratRoom.boundary?.some(point => distanceToRatDenPath(point) < mainCorridorRadius + width / 2 + 90)) return false;
      return true;
    };

    const makeTwistyPath = (start, angle, segments, minStep, maxStep, turnRange = 0.72) => {
      const points = [{ x: start.x, y: start.y }];
      let heading = angle;
      for (let index = 0; index < segments; index += 1) {
        heading += randomBetween(-turnRange, turnRange);
        const step = randomBetween(minStep, maxStep);
        const previous = points[points.length - 1];
        points.push({
          x: previous.x + Math.cos(heading) * step,
          y: previous.y + Math.sin(heading) * step
        });
      }
      return points;
    };

    const markHiddenPassage = passage => ({
      ...passage,
      areaName: "Rat Warren",
      hiddenFromMap: true,
      metadata: { ...(passage.metadata || {}), areaName: "Rat Warren" }
    });
    const addPathPassages = (passages, points) => {
      passages.push(...polylineToPassages(points, width, RAT_DEN_AREA_NAME).map(markHiddenPassage));
    };

    const passageArea = passage => {
      const dx = passage.x2 - passage.x1;
      const dy = passage.y2 - passage.y1;
      const length = Math.hypot(dx, dy) || 1;
      const nx = (-dy / length) * passage.width / 2;
      const ny = (dx / length) * passage.width / 2;
      const boundary = [
        { x: passage.x1 + nx, y: passage.y1 + ny },
        { x: passage.x2 + nx, y: passage.y2 + ny },
        { x: passage.x2 - nx, y: passage.y2 - ny },
        { x: passage.x1 - nx, y: passage.y1 - ny }
      ];
      return { boundary, bounds: boundsForPoints(boundary) };
    };

    const overlapsBlockedArea = candidate => blockedAreas.some(area => areasOverlap(candidate, area, 90));
    const candidateOverlaps = (areas, passages) => areas.some(overlapsBlockedArea)
      || passages.some(passage => overlapsBlockedArea(passageArea(passage)));

    for (let attempt = 0; attempt < 80; attempt += 1) {
      const side = attempt % 2 === 0 ? 1 : -1;
      const baseAngle = basePathAngle + side * (Math.PI / 2 + randomBetween(-0.35, 0.35));
      const passages = [];
      const mainPath = makeTwistyPath(anchor, baseAngle, 7, 260, 410, 0.58);
      if (!pathClearsMainTunnel(mainPath, side, true)) continue;
      addPathPassages(passages, mainPath);

      const forkSpecs = [
        { index: 2, turn: -side * randomBetween(0.78, 1.18), segments: 3, room: false },
        { index: 3, turn: side * randomBetween(0.82, 1.28), segments: 4, room: true },
        { index: 5, turn: -side * randomBetween(0.92, 1.42), segments: 3, room: false },
        { index: 6, turn: side * randomBetween(0.65, 1.05), segments: 2, room: false }
      ];

      let ratRoom = null;
      for (const fork of forkSpecs) {
        const start = mainPath[Math.min(fork.index, mainPath.length - 2)];
        const prev = mainPath[Math.max(0, fork.index - 1)];
        const currentAngle = Math.atan2(start.y - prev.y, start.x - prev.x);
        const forkPath = makeTwistyPath(start, currentAngle + fork.turn, fork.segments, 230, 360, 0.78);
        if (!pathClearsMainTunnel(forkPath, side, false)) {
          ratRoom = null;
          break;
        }
        addPathPassages(passages, forkPath);
        if (!fork.room) continue;
        const end = forkPath[forkPath.length - 1];
        const beforeEnd = forkPath[forkPath.length - 2];
        const roomAngle = Math.atan2(end.y - beforeEnd.y, end.x - beforeEnd.x);
        const roomCenter = {
          x: end.x + Math.cos(roomAngle) * 245,
          y: end.y + Math.sin(roomAngle) * 245
        };
        const roomPassageEnd = {
          x: roomCenter.x + Math.cos(roomAngle) * 260,
          y: roomCenter.y + Math.sin(roomAngle) * 260
        };
        passages.push(markHiddenPassage(makePassage(end.x, end.y, roomPassageEnd.x, roomPassageEnd.y, width * 1.12, RAT_DEN_AREA_NAME)));
        ratRoom = makeRatRoomArea(roomCenter.x, roomCenter.y, 540, 440);
        ratRoom.metadata = { areaName: "Rat Warren", roomName: "Rat Room" };
        ratRoom.surface = "rat-den";
        ratRoom.hiddenFromMap = true;
        if (!ratRoomClearsMainTunnel(ratRoom) || !ratRoomConnectedToPassages(ratRoom, passages)) {
          ratRoom = null;
          break;
        }
      }

      const areas = ratRoom ? [ratRoom] : [];
      if (ratRoom && !candidateOverlaps(areas, passages)) {
        const fixedSpawns = [
          {
            id: "rat-room-turdburglar-1",
            name: "Ratkin Turdburglar",
            template: "Ratkin Turdburglar",
            lvl: 6,
            x: ratRoom.center.x - 80,
            y: ratRoom.center.y - 36,
            area: "Rat Warren",
            homeX: ratRoom.center.x - 80,
            homeY: ratRoom.center.y - 36,
            aggroRange: 7,
            noWander: true,
            lockPosition: true
          },
          {
            id: "rat-room-turdburglar-2",
            name: "Ratkin Turdburglar",
            template: "Ratkin Turdburglar",
            lvl: 6,
            x: ratRoom.center.x + 80,
            y: ratRoom.center.y + 36,
            area: "Rat Warren",
            homeX: ratRoom.center.x + 80,
            homeY: ratRoom.center.y + 36,
            aggroRange: 7,
            noWander: true,
            lockPosition: true
          }
        ];
        return { areas, passages, ratRoom, fixedSpawns };
      }
    }

    return { areas: [], passages: [], ratRoom: null, fixedSpawns: [] };
  }

  function makeRatRoomArea(cx, cy, width = 540, height = 440) {
    const boundary = [];
    const points = 24;
    for (let index = 0; index < points; index += 1) {
      const angle = (Math.PI * 2 * index) / points;
      const wobble = 0.93 + Math.sin(angle * 3) * 0.05 + Math.sin(angle * 5 + 0.7) * 0.035;
      boundary.push({
        x: cx + Math.cos(angle) * (width / 2) * wobble,
        y: cy + Math.sin(angle) * (height / 2) * wobble
      });
    }
    return {
      name: RAT_DEN_AREA_NAME,
      center: { x: cx, y: cy },
      width,
      height,
      boundary: smoothBoundary(boundary, 1),
      treeChance: 0,
      levelRange: { min: 3, max: 5 },
      spawnRate: "Normal"
    };
  }

  function ratRoomConnectedToPassages(ratRoom, passages = []) {
    const connectionRadius = 140;
    return passages.some(passage => {
      const samples = [
        { x: passage.x1, y: passage.y1 },
        { x: passage.x2, y: passage.y2 },
        { x: (passage.x1 + passage.x2) / 2, y: (passage.y1 + passage.y2) / 2 },
        ratRoom.center
      ];
      return samples.some(point => isPointInBoundary(point.x, point.y, ratRoom.boundary))
        || distanceToSegment(ratRoom.center.x, ratRoom.center.y, passage) <= passage.width / 2 + connectionRadius;
    });
  }

  function customDungeonConfigByName(name) {
    const configs = typeof devDungeonConfigs !== "undefined" && Array.isArray(devDungeonConfigs)
      ? devDungeonConfigs
      : [];
    const id = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return configs.find(config => config?.name === name || config?.id === id) || null;
  }

  function dungeonSurfaceFromTexture(texture) {
    const file = String(texture || "").split("/").pop().replace(/\.(png|webp|jpg|jpeg)$/i, "");
    if (file === "slimepool") return "diarrh-slime";
    return file || "rat-den";
  }

  function findNorthFenEntranceSpot(fen, blockedPassages = []) {
    const bounds = boundsForPoints(fen.boundary || []);
    const candidateXs = shuffled([0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82])
      .map(fraction => bounds.minX + (bounds.maxX - bounds.minX) * fraction);
    for (const x of candidateXs) {
      for (let y = bounds.minY + 70; y < fen.center.y - 220; y += 24) {
        const door = { x, y: y + 116 };
        const returnPoint = { x, y: door.y + 84 };
        const samples = [
          { x, y },
          door,
          returnPoint,
          { x: x - 150, y: y + 86 },
          { x: x + 150, y: y + 86 }
        ];
        if (!samples.every(point => isPointInBoundary(point.x, point.y, fen.boundary))) continue;
        if (samples.some(point => pointInAnyPassage(point.x, point.y, blockedPassages, -260))) continue;
        return { x, y, door, returnPoint };
      }
    }
    const fallbackY = bounds.minY + Math.max(260, fen.height * 0.18);
    return {
      x: fen.center.x,
      y: fallbackY,
      door: { x: fen.center.x, y: fallbackY + 116 },
      returnPoint: { x: fen.center.x, y: fallbackY + 200 }
    };
  }

  function makeBearCave(fen, blockedPassages = []) {
    const name = "Bear Cave";
    const config = customDungeonConfigByName(name);
    const entranceSize = 320;
    const entranceSpot = findNorthFenEntranceSpot(fen, blockedPassages);
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      sprite: "cave-entrance",
      dungeon: "bear-cave",
      x: entranceSpot.x,
      y: entranceSpot.y,
      radius: entranceSize * 0.42,
      size: entranceSize,
      door: { x: entranceSpot.door.x, y: entranceSpot.door.y, radius: 48 },
      blockRects: [
        { x: -entranceSize * 0.44, y: -entranceSize * 0.36, w: entranceSize * 0.88, h: entranceSize * 0.4 },
        { x: -entranceSize * 0.42, y: -entranceSize * 0.02, w: entranceSize * 0.24, h: entranceSize * 0.3 },
        { x: entranceSize * 0.18, y: -entranceSize * 0.02, w: entranceSize * 0.24, h: entranceSize * 0.3 }
      ]
    };
    return makeConfiguredCaveDungeon(name, "bear-cave", config, entranceObstacle, entranceSpot.returnPoint);
  }

  function configuredDungeonOrigin(id) {
    const known = {
      "bear-cave": { x: 142000, y: 94000 },
      "rogabogu": { x: 188000, y: 94000 }
    };
    if (known[id]) {
      return {
        x: known[id].x + randomBetween(-700, 700),
        y: known[id].y + randomBetween(-700, 700)
      };
    }
    let hash = 0;
    for (const char of String(id || "")) hash = ((hash * 31) + char.charCodeAt(0)) >>> 0;
    return {
      x: 220000 + (hash % 8) * 46000 + randomBetween(-700, 700),
      y: 94000 + (Math.floor(hash / 8) % 6) * 46000 + randomBetween(-700, 700)
    };
  }

  function makeConfiguredCaveDungeon(name, id, config, entranceObstacle, returnPoint) {
    if (!config) {
      const origin = configuredDungeonOrigin(id);
      const room = makeDungeonRoom(name, "main", origin.x, origin.y, 780, 560, "rat-den");
      return {
        areas: [room],
        rooms: [{ id: "main", center: room.center, area: room }],
        passages: [],
        fixedSpawns: [],
        entranceObstacle,
        entryPoint: { x: room.center.x, y: room.center.y + 180 },
        exitPoint: { x: room.center.x, y: room.center.y + 220 },
        returnPoint
      };
    }

    const cellSize = Math.max(64, Number(config.cellSize) || 128);
    const origin = configuredDungeonOrigin(id);
    const cells = Array.isArray(config.cells) ? config.cells : [];
    const cellKey = (x, y) => `${x},${y}`;
    const texturedCells = new Map(cells.map(cell => [cellKey(Number(cell.x), Number(cell.y)), cell]));
    const centerOfCell = (x, y) => ({
      x: origin.x + (Number(x) + 0.5) * cellSize,
      y: origin.y + (Number(y) + 0.5) * cellSize
    });
    const areas = [];
    const rooms = [];
    const water = [];
    const lava = [];
    for (const cell of texturedCells.values()) {
      const x = Number(cell.x);
      const y = Number(cell.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const center = centerOfCell(x, y);
      const boundary = dungeonCellBoundary(center.x, center.y, cellSize, normalizeDungeonBrush(cell.brush));
      const area = makeDungeonShape(name, cellKey(x, y), boundary, dungeonSurfaceFromTexture(cell.texture));
      area.groundTexture = cell.texture;
      areas.push(area);
      rooms.push({ id: cellKey(x, y), center, area });
    }
    for (const cell of Array.isArray(config.water) ? config.water : []) {
      const x = Number(cell.x);
      const y = Number(cell.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const groundCell = texturedCells.get(cellKey(x, y));
      const center = centerOfCell(x, y);
      const boundary = dungeonCellBoundary(center.x, center.y, cellSize, normalizeDungeonBrush(groundCell?.brush || cell.brush));
      const bounds = boundsForPoints(boundary);
      water.push({
        kind: "polygon-water",
        areaName: name,
        x: bounds.minX,
        y: bounds.minY,
        w: bounds.maxX - bounds.minX,
        h: bounds.maxY - bounds.minY,
        bounds,
        boundary
      });
    }
    for (const cell of Array.isArray(config.lava) ? config.lava : []) {
      const x = Number(cell.x);
      const y = Number(cell.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const groundCell = texturedCells.get(cellKey(x, y));
      const center = centerOfCell(x, y);
      const boundary = dungeonCellBoundary(center.x, center.y, cellSize, normalizeDungeonBrush(groundCell?.brush || cell.brush));
      const bounds = boundsForPoints(boundary);
      lava.push({
        kind: "polygon-lava",
        terrain: "lava",
        areaName: name,
        x: bounds.minX,
        y: bounds.minY,
        w: bounds.maxX - bounds.minX,
        h: bounds.maxY - bounds.minY,
        bounds,
        boundary
      });
    }
    const entranceCell = texturedCells.get(cellKey(config.entrance?.x, config.entrance?.y))
      ? config.entrance
      : cells[0] || { x: 0, y: 0 };
    const entryPoint = centerOfCell(entranceCell.x, entranceCell.y);
    const fixedSpawns = (Array.isArray(config.units) ? config.units : []).map((unit, index) => {
      const position = centerOfCell(unit.x, unit.y);
      const template = unit.template || unit.unit || unit.name;
      return {
        id: `${id}-fixed-${index + 1}`,
        name: unit.name || template,
        template,
        lvl: Math.max(1, Math.floor(Number(unit.level) || 1)),
        x: position.x,
        y: position.y,
        homeX: position.x,
        homeY: position.y,
        leashX: position.x,
        leashY: position.y,
        leashRadius: cellSize * 2.25,
        area: name,
        elite: Boolean(unit.elite),
        boss: Boolean(unit.boss),
        noWander: Boolean(unit.elite || unit.boss),
        lockPosition: Boolean(unit.boss),
        aggroRange: 9
      };
    });
    const configuredNpcs = (Array.isArray(config.npcs) ? config.npcs : []).map(npc => {
      const position = centerOfCell(npc.x, npc.y);
      return makeConfiguredNpc(npc.id || npc.npcId, position.x, position.y, {
        area: name,
        dungeon: name,
        wandering: false
      });
    }).filter(Boolean);
    const wallRects = makeEditorDungeonWallRects(config, origin, cellSize);
    const stationKindFromSprite = sprite => {
      const file = String(sprite || "").split("/").pop().replace(/\.(png|webp|jpg|jpeg)$/i, "");
      return craftingStationDisplayDefaults[file]
        ? file
        : "";
    };
    const dungeonFeatures = (Array.isArray(config.features) ? config.features : []).map((feature, index) => {
      const x = Number(feature.x);
      const y = Number(feature.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
      const position = centerOfCell(x, y);
      const sprite = feature.sprite || feature.path || "";
      const file = String(sprite).split("/").pop().replace(/\.(png|webp|jpg|jpeg)$/i, "");
      const radius = Math.max(8, (Number(feature.size) || cellSize * 0.75) * 0.28);
      return {
        id: `${id}-feature-${index + 1}`,
        kind: file || "dungeon-feature",
        sprite,
        x: position.x,
        y: position.y,
        radius,
        area: name,
        dungeon: name,
        nonBlocking: feature.obstacle === false
      };
    }).filter(Boolean);
    const furniture = dungeonFeatures
      .map(feature => {
        const kind = stationKindFromSprite(feature.sprite);
        if (!kind) return null;
        const display = craftingStationDisplayDefaults[kind] || {};
        return {
          id: feature.id,
          kind,
          area: name,
          dungeon: name,
          x: feature.x,
          y: feature.y,
          size: display.size || Math.max(48, Math.round(feature.radius * 3.4)),
          scaleX: display.scaleX || 1,
          scaleY: display.scaleY || 1,
          yOffset: display.yOffset || 0,
          nonBlocking: true
        };
      })
      .filter(Boolean);
    return {
      id,
      areas,
      rooms,
      origin,
      cellSize,
      passages: [],
      water,
      lava,
      wallRects,
      wallTexture: config.wallTexture || "./assets/ground/whisperspring-wall.png",
      featureObstacles: dungeonFeatures.filter(feature => !stationKindFromSprite(feature.sprite) && !feature.nonBlocking),
      furniture,
      configuredNpcs,
      fixedSpawns,
      entranceObstacle,
      entryPoint,
      exitPoint: { ...entryPoint },
      returnPoint
    };
  }

  function makeRogabogu(lakeRoga) {
    const name = "Rogabogu";
    const config = customDungeonConfigByName(name);
    const entranceSize = 280;
    const lake = lakeRoga?.lake || { x: lakeRoga?.area?.center?.x || 0, y: lakeRoga?.area?.center?.y || 0 };
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      sprite: "cave-entrance",
      dungeon: "rogabogu",
      waterSubmerged: true,
      waterFeatureKind: "lake-roga-water",
      x: lake.x,
      y: lake.y,
      radius: entranceSize * 0.4,
      size: entranceSize,
      door: { x: lake.x, y: lake.y + entranceSize * 0.18, radius: 50 },
      blockRects: [
        { x: -entranceSize * 0.42, y: -entranceSize * 0.34, w: entranceSize * 0.84, h: entranceSize * 0.36 },
        { x: -entranceSize * 0.4, y: -entranceSize * 0.01, w: entranceSize * 0.22, h: entranceSize * 0.24 },
        { x: entranceSize * 0.18, y: -entranceSize * 0.01, w: entranceSize * 0.22, h: entranceSize * 0.24 }
      ]
    };
    return makeConfiguredCaveDungeon(name, "rogabogu", config, entranceObstacle, {
      x: entranceObstacle.door.x,
      y: entranceObstacle.door.y + 92
    });
  }

  function findNorthAreaEntranceSpot(area, entranceSize = 260, blockedPassages = []) {
    const bounds = boundsForPoints(area.boundary || []);
    const fractions = shuffled([0.18, 0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82]);
    for (const fraction of fractions) {
      const x = bounds.minX + (bounds.maxX - bounds.minX) * fraction;
      for (let y = bounds.minY + 80; y < area.center.y - 160; y += 28) {
        const door = { x, y: y + entranceSize * 0.36 };
        const returnPoint = { x, y: door.y + entranceSize * 0.26 };
        const samples = [
          { x, y },
          door,
          returnPoint,
          { x: x - entranceSize * 0.32, y: y + entranceSize * 0.22 },
          { x: x + entranceSize * 0.32, y: y + entranceSize * 0.22 }
        ];
        if (!samples.every(point => isPointInBoundary(point.x, point.y, area.boundary))) continue;
        if (samples.some(point => pointInAnyPassage(point.x, point.y, blockedPassages, -220))) continue;
        return { x, y, door, returnPoint };
      }
    }
    const fallbackY = bounds.minY + Math.max(220, area.height * 0.16);
    return {
      x: area.center.x,
      y: fallbackY,
      door: { x: area.center.x, y: fallbackY + entranceSize * 0.36 },
      returnPoint: { x: area.center.x, y: fallbackY + entranceSize * 0.62 }
    };
  }

  function makeYrgmaDim(harmushLagh, blockedPassages = []) {
    const name = "Yrgma Dim";
    const config = customDungeonConfigByName(name);
    const entranceSize = 300;
    const entranceSpot = findNorthAreaEntranceSpot(harmushLagh, entranceSize, blockedPassages);
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      sprite: "yrgma-dim",
      dungeon: "yrgma-dim",
      x: entranceSpot.x,
      y: entranceSpot.y,
      radius: entranceSize * 0.42,
      size: entranceSize,
      door: { x: entranceSpot.door.x, y: entranceSpot.door.y, radius: 50 },
      blockRects: [
        { x: -entranceSize * 0.46, y: -entranceSize * 0.42, w: entranceSize * 0.92, h: entranceSize * 0.36 },
        { x: -entranceSize * 0.4, y: -entranceSize * 0.08, w: entranceSize * 0.24, h: entranceSize * 0.3 },
        { x: entranceSize * 0.16, y: -entranceSize * 0.08, w: entranceSize * 0.24, h: entranceSize * 0.3 }
      ]
    };
    return makeConfiguredCaveDungeon(name, "yrgma-dim", config, entranceObstacle, entranceSpot.returnPoint);
  }

  function makeRatzkhan(ratRoom) {
    if (!ratRoom?.boundary?.length) return { areas: [], passages: [], entranceObstacle: null, entryPoint: null, exitPoint: null, returnPoint: null, rooms: [] };
    const northPoint = ratRoom.boundary.reduce((best, point) => (point.y < best.y ? point : best), ratRoom.boundary[0]);
    const entranceSize = 240;
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      sprite: "mine-entrance",
      dungeon: "ratzkhan",
      x: northPoint.x,
      y: northPoint.y - 68,
      radius: entranceSize * 0.46,
      size: entranceSize,
      door: { x: northPoint.x, y: northPoint.y + 18, radius: 42 },
      blockRects: [
        { x: -entranceSize * 0.42, y: -entranceSize * 0.36, w: entranceSize * 0.84, h: entranceSize * 0.32 },
        { x: -entranceSize * 0.42, y: -entranceSize * 0.06, w: entranceSize * 0.23, h: entranceSize * 0.24 },
        { x: entranceSize * 0.19, y: -entranceSize * 0.06, w: entranceSize * 0.23, h: entranceSize * 0.24 }
      ]
    };

    const origin = { x: 94000 + randomBetween(-800, 800), y: 94000 + randomBetween(-800, 800) };
    const chamberCenters = [
      { x: origin.x, y: origin.y },
      { x: origin.x + randomBetween(1650, 2050), y: origin.y + randomBetween(-640, 520) },
      { x: origin.x + randomBetween(3450, 4000), y: origin.y + randomBetween(-460, 760) },
      { x: origin.x + randomBetween(5050, 5600), y: origin.y + randomBetween(-760, 360) },
      { x: origin.x + randomBetween(6600, 7250), y: origin.y + randomBetween(-320, 820) },
      { x: origin.x + randomBetween(8250, 9000), y: origin.y + randomBetween(-1050, 120) }
    ];

    const makeBlobBoundary = (center, rx, ry, points = 18) => {
      const boundary = [];
      for (let index = 0; index < points; index += 1) {
        const angle = (Math.PI * 2 * index) / points;
        const wobble = randomBetween(0.82, 1.16);
        boundary.push({
          x: center.x + Math.cos(angle) * rx * wobble,
          y: center.y + Math.sin(angle) * ry * wobble
        });
      }
      return boundary;
    };

    const chamberSpecs = [
      { id: 1, rx: 360, ry: 270 },
      { id: 2, rx: 440, ry: 330 },
      { id: 3, rx: 520, ry: 360 },
      { id: 4, rx: 460, ry: 340 },
      { id: 5, rx: 560, ry: 390 },
      { id: 6, rx: 500, ry: 350 }
    ];
    const chambers = chamberSpecs.map((spec, index) => {
      const boundary = makeBlobBoundary(chamberCenters[index], spec.rx, spec.ry, 20);
      const area = makeDungeonShape(RATZKHAN_AREA_NAME, spec.id, boundary, "ratzkhan-chamber");
      area.levelRange = { min: 5, max: 8 };
      area.spawnRate = "Normal";
      return area;
    });

    const ratzkhanPassage = passage => ({ ...passage, surface: "ratzkhan" });
    const passages = [];
    const addWindingConnector = (from, to, width, wiggle = 0.5) => {
      const points = [{ ...from }];
      const segments = 6;
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const length = Math.hypot(dx, dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      for (let step = 1; step < segments; step += 1) {
        const t = step / segments;
        const wave = Math.sin(t * Math.PI * randomBetween(1.4, 2.2)) * randomBetween(180, 330) * wiggle;
        points.push({
          x: from.x + dx * t + nx * wave + randomBetween(-140, 140),
          y: from.y + dy * t + ny * wave + randomBetween(-140, 140)
        });
      }
      points.push({ ...to });
      passages.push(...polylineToPassages(points, width, RATZKHAN_AREA_NAME, "ratzkhan").map(ratzkhanPassage));
      for (let index = 1; index < points.length - 1; index += 2) {
        const base = points[index];
        const side = Math.random() < 0.5 ? -1 : 1;
        const angle = Math.atan2(dy, dx) + side * randomBetween(0.75, 1.3);
        const deadEnd = {
          x: base.x + Math.cos(angle) * randomBetween(340, 620),
          y: base.y + Math.sin(angle) * randomBetween(340, 620)
        };
        passages.push(ratzkhanPassage(makePassage(base.x, base.y, deadEnd.x, deadEnd.y, randomBetween(145, 190), RATZKHAN_AREA_NAME, "ratzkhan")));
      }
    };

    addWindingConnector(chamberCenters[0], chamberCenters[1], 210, 0.86);
    addWindingConnector(chamberCenters[1], chamberCenters[2], 220, 0.92);
    addWindingConnector(chamberCenters[2], chamberCenters[3], 220, 0.88);
    addWindingConnector(chamberCenters[3], chamberCenters[4], 230, 0.94);
    addWindingConnector(chamberCenters[4], chamberCenters[5], 210, 1.12);
    const underneathEntranceSize = 230;
    const chamberSixNorth = chamberCenters[5].y - chamberSpecs[5].ry * 0.78;
    const underneathEntrance = {
      kind: "whisperspring-entrance",
      sprite: "underneath-entrance",
      dungeon: "diarrh-realm",
      x: chamberCenters[5].x,
      y: chamberSixNorth - 64,
      radius: underneathEntranceSize * 0.46,
      size: underneathEntranceSize,
      door: { x: chamberCenters[5].x, y: chamberSixNorth + 18, radius: 44 },
      blockRects: [
        { x: -underneathEntranceSize * 0.42, y: -underneathEntranceSize * 0.36, w: underneathEntranceSize * 0.84, h: underneathEntranceSize * 0.32 },
        { x: -underneathEntranceSize * 0.42, y: -underneathEntranceSize * 0.06, w: underneathEntranceSize * 0.23, h: underneathEntranceSize * 0.24 },
        { x: underneathEntranceSize * 0.19, y: -underneathEntranceSize * 0.06, w: underneathEntranceSize * 0.23, h: underneathEntranceSize * 0.24 }
      ]
    };
    const entryPoint = { x: chamberCenters[0].x - 160, y: chamberCenters[0].y + 20 };
    const exitPoint = { x: chamberCenters[0].x - 270, y: chamberCenters[0].y + 20 };
    passages.push(makePassage(entryPoint.x, entryPoint.y, chamberCenters[0].x, chamberCenters[0].y, 220, RATZKHAN_AREA_NAME, "rat-den"));
    const fixedSpawns = [
      { template: "Ratkin Turdburglar", lvl: 6, x: chamberCenters[0].x - 92, y: chamberCenters[0].y - 42 },
      { template: "Ratkin Turdburglar", lvl: 6, x: chamberCenters[0].x + 92, y: chamberCenters[0].y + 42 },
      { template: "Ratkin Turdburglar", lvl: 6, x: chamberCenters[1].x - 124, y: chamberCenters[1].y - 54 },
      { template: "Ratkin Turdburglar", lvl: 6, x: chamberCenters[1].x + 114, y: chamberCenters[1].y + 72 },
      { template: "Ratkin Warlock", lvl: 7, x: chamberCenters[1].x + 18, y: chamberCenters[1].y - 96 },
      { template: "Ratkin Warlock", lvl: 7, x: chamberCenters[2].x - 118, y: chamberCenters[2].y - 62 },
      { template: "Shade", lvl: 7, x: chamberCenters[2].x + 88, y: chamberCenters[2].y - 100 },
      { template: "Shade", lvl: 7, x: chamberCenters[2].x + 138, y: chamberCenters[2].y + 102 },
      { template: "Narmon Ratfinkelstein", lvl: 8, x: chamberCenters[3].x - 86, y: chamberCenters[3].y - 12, leashX: chamberCenters[3].x, leashY: chamberCenters[3].y, leashRadius: Math.min(chamberSpecs[3].rx, chamberSpecs[3].ry) * 0.95 },
      { template: "Ratfinkelstein's Ratstrocity", lvl: 8, x: chamberCenters[3].x + 118, y: chamberCenters[3].y + 28, leashX: chamberCenters[3].x, leashY: chamberCenters[3].y, leashRadius: Math.min(chamberSpecs[3].rx, chamberSpecs[3].ry) * 0.95 },
      { template: "Princess Nurdine", lvl: 8, x: chamberCenters[4].x, y: chamberCenters[4].y, leashX: chamberCenters[4].x, leashY: chamberCenters[4].y, leashRadius: Math.min(chamberSpecs[4].rx, chamberSpecs[4].ry) * 0.95 },
      { template: "Ratkin Turdburglar", lvl: 7, x: chamberCenters[4].x - 150, y: chamberCenters[4].y - 86 },
      { template: "Ratkin Turdburglar", lvl: 7, x: chamberCenters[4].x + 150, y: chamberCenters[4].y - 86 },
      { template: "Ratkin Turdburglar", lvl: 7, x: chamberCenters[4].x, y: chamberCenters[4].y + 150 },
      { template: "Ratkin Warlock", lvl: 8, x: chamberCenters[4].x + 2, y: chamberCenters[4].y - 168 }
    ].map((spawn, index) => ({
      ...spawn,
      id: `ratzkhan-fixed-${index + 1}`,
      name: spawn.template,
      area: RATZKHAN_AREA_NAME,
      homeX: spawn.x,
      homeY: spawn.y,
      leashX: spawn.leashX,
      leashY: spawn.leashY,
      leashRadius: spawn.leashRadius,
      aggroRange: (() => {
        const chamberIndex = chamberCenters
          .map((center, candidateIndex) => ({ candidateIndex, distance: Math.hypot(spawn.x - center.x, spawn.y - center.y) }))
          .sort((a, b) => a.distance - b.distance)[0]?.candidateIndex ?? 0;
        return Math.ceil((Math.max(chamberSpecs[chamberIndex].rx, chamberSpecs[chamberIndex].ry) + 96) / RANGE_UNIT);
      })(),
      noWander: true
    }));

    return {
      areas: chambers,
      passages,
      entranceObstacle,
      underneathEntrance,
      entryPoint,
      exitPoint,
      returnPoint: { x: entranceObstacle.door.x, y: entranceObstacle.door.y + 62 },
      fixedSpawns,
      rooms: chambers.map((area, index) => ({ roomId: index + 1, center: area.center, labelCenter: area.center }))
    };
  }

  function makeDiarrhRealm(ratzkhan) {
    const sourceEntrance = ratzkhan?.underneathEntrance;
    if (!sourceEntrance?.door) return { areas: [], passages: [], entranceObstacle: null, entryPoint: null, exitPoint: null, returnPoint: null, rooms: [] };

    const origin = { x: 108000 + randomBetween(-700, 700), y: 88000 + randomBetween(-700, 700) };
    const scale = 34;
    const centerX = 50;
    const toWorld = (mockX, mockY) => ({
      x: origin.x + (mockX - centerX) * scale,
      y: origin.y + mockY * scale
    });

    const makeRectArea = (rect, surface) => {
      const [x, y, w, h] = rect;
      const center = toWorld(x + w / 2, y + h / 2);
      const area = makeDungeonRoom("Diarrh Realm", null, center.x, center.y, w * scale, h * scale, surface);
      area.levelRange = { min: 8, max: 10 };
      return area;
    };

    const floorRects = [
      [7, 5, 20, 12],
      [60, 16, 38, 1],
      [60, 17, 39, 4],
      [47, 21, 52, 3],
      [47, 24, 35, 3],
      [60, 27, 22, 4],
      [60, 31, 21, 1],
      [14, 17, 7, 19],
      [47, 27, 5, 9],
      [92, 24, 7, 12],
      [14, 36, 49, 6],
      [68, 36, 31, 6],
      [68, 42, 7, 7],
      [44, 42, 19, 11],
      [68, 49, 32, 5],
      [69, 54, 31, 1],
      [12, 57, 31, 1],
      [94, 55, 6, 5],
      [11, 58, 32, 7],
      [82, 60, 18, 7],
      [69, 67, 31, 1],
      [35, 65, 8, 9],
      [57, 53, 6, 21],
      [68, 68, 32, 8],
      [11, 65, 8, 13],
      [35, 74, 28, 7],
      [68, 76, 8, 6],
      [11, 78, 20, 7],
      [68, 82, 24, 6],
      [24, 85, 7, 7],
      [24, 92, 47, 1],
      [24, 93, 48, 7],
      [64, 100, 8, 7],
      [85, 88, 7, 19],
      [43, 100, 14, 9],
      [43, 109, 13, 1],
      [43, 110, 14, 2],
      [64, 107, 28, 7],
      [64, 114, 27, 1],
      [43, 112, 13, 5],
      [46, 117, 7, 6]
    ];
    const slimeRects = [
      [7, 17, 7, 8],
      [20, 17, 7, 8],
      [35, 42, 9, 10],
      [35, 52, 22, 1],
      [69, 54, 2, 1],
      [77, 54, 1, 1],
      [92, 54, 2, 1],
      [35, 53, 23, 5],
      [68, 55, 27, 5],
      [68, 60, 26, 1],
      [68, 61, 14, 6],
      [69, 67, 13, 1],
      [43, 58, 15, 17],
      [75, 75, 25, 7],
      [91, 82, 9, 6]
    ];

    const floorAreas = [
      ...floorRects.map(rect => makeRectArea(rect, "diarrh-floor")),
      ...slimeRects.map(rect => makeRectArea(rect, "diarrh-slime"))
    ];

    const occupiedCells = new Set();
    const markOccupied = rect => {
      const [x, y, w, h] = rect;
      for (let yy = y; yy < y + h; yy += 1) {
        for (let xx = x; xx < x + w; xx += 1) occupiedCells.add(`${xx},${yy}`);
      }
    };
    floorRects.forEach(markOccupied);
    slimeRects.forEach(markOccupied);

    const wallRows = new Map();
    for (const key of occupiedCells) {
      const [x, y] = key.split(",").map(Number);
      if (occupiedCells.has(`${x},${y - 1}`)) continue;
      if (!wallRows.has(y)) wallRows.set(y, []);
      wallRows.get(y).push(x);
    }
    const wallRects = [];
    for (const [y, xs] of wallRows) {
      xs.sort((a, b) => a - b);
      let start = xs[0];
      let previous = xs[0];
      for (let index = 1; index <= xs.length; index += 1) {
        const current = xs[index];
        if (current === previous + 1) {
          previous = current;
          continue;
        }
        const width = previous - start + 1;
        if (width >= 3) {
          const topLeft = toWorld(start, y - 0.65);
          wallRects.push({
            x: topLeft.x,
            y: topLeft.y,
            w: width * scale,
            h: scale * 1.8
          });
        }
        start = current;
        previous = current;
      }
    }

    const roomLabelSpecs = [
      { roomId: 1, x: 50, y: 106 },
      { roomId: 2, x: 90, y: 68 },
      { roomId: 3, x: 52, y: 45 },
      { roomId: 4, x: 72, y: 25 },
      { roomId: 5, x: 18, y: 13 }
    ];
    const rooms = roomLabelSpecs.map(label => ({
      roomId: label.roomId,
      center: toWorld(label.x, label.y),
      labelCenter: toWorld(label.x, label.y)
    }));
    const entryPoint = toWorld(50, 121);
    const exitPoint = toWorld(50, 121);
    const returnPoint = { x: sourceEntrance.door.x, y: sourceEntrance.door.y + 64 };
    const shapeBounds = floorAreas.map(area => boundsForPoints(area.boundary));
    const minX = Math.min(...shapeBounds.map(bounds => bounds.minX));
    const minY = Math.min(...shapeBounds.map(bounds => bounds.minY));
    const maxX = Math.max(...shapeBounds.map(bounds => bounds.maxX));
    const maxY = Math.max(...shapeBounds.map(bounds => bounds.maxY));
    const background = {
      x: minX - 12 * scale,
      y: minY - 12 * scale,
      w: maxX - minX + 24 * scale,
      h: maxY - minY + 24 * scale
    };

    return {
      areas: floorAreas,
      rooms,
      passages: [],
      water: [],
      wallRects,
      background,
      entranceObstacle: sourceEntrance,
      entryPoint,
      exitPoint,
      returnPoint
    };
  }
  
  function rectangleBoundary(cx, cy, width, height) {
    return [
      { x: cx - width / 2, y: cy - height / 2 },
      { x: cx + width / 2, y: cy - height / 2 },
      { x: cx + width / 2, y: cy + height / 2 },
      { x: cx - width / 2, y: cy + height / 2 }
    ];
  }
  
  function rectContainsPoint(rect, x, y, padding = 0) {
    return x >= rect.x - padding
      && x <= rect.x + rect.w + padding
      && y >= rect.y - padding
      && y <= rect.y + rect.h + padding;
  }
  
  function rectCollidesCircle(rect, x, y, radius = 0) {
    const dx = Math.max(rect.x - x, 0, x - (rect.x + rect.w));
    const dy = Math.max(rect.y - y, 0, y - (rect.y + rect.h));
    return Math.hypot(dx, dy) <= radius;
  }

  function rectsOverlap(a, b, padding = 0) {
    return a.x - padding < b.x + b.w
      && a.x + a.w + padding > b.x
      && a.y - padding < b.y + b.h
      && a.y + a.h + padding > b.y;
  }
  
  function makeDungeonRoom(name, roomId, cx, cy, width, height, surface = "whisperspring") {
    return {
      name,
      roomId,
      dungeon: true,
      center: { x: cx, y: cy },
      width,
      height,
      boundary: rectangleBoundary(cx, cy, width, height),
      treeChance: 0,
      levelRange: { min: 1, max: 1 },
      spawnRate: "None",
      surface
    };
  }

  function makeDungeonShape(name, roomId, boundary, surface = "whisperspring") {
    const bounds = boundsForPoints(boundary);
    return {
      name,
      roomId,
      dungeon: true,
      center: {
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2
      },
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
      boundary,
      treeChance: 0,
      levelRange: { min: 1, max: 1 },
      spawnRate: "None",
      surface
    };
  }

  function normalizeDungeonBrush(brush) {
    return ["square", "diag-nw", "diag-ne", "diag-se", "diag-sw", "curve-nw", "curve-ne", "curve-se", "curve-sw"].includes(brush) ? brush : "square";
  }

  function dungeonBrushGeneratesWalls(brush) {
    return !["diag-nw", "diag-ne", "curve-nw", "curve-ne"].includes(normalizeDungeonBrush(brush));
  }

  function dungeonCellBoundary(cx, cy, size, brush = "square") {
    brush = normalizeDungeonBrush(brush);
    const half = size / 2;
    const left = cx - half;
    const right = cx + half;
    const top = cy - half;
    const bottom = cy + half;
    const curvePoints = (corner, steps = 7) => {
      const arc = [];
      const origin = corner === "curve-nw"
        ? { x: left, y: top, start: 0, end: Math.PI / 2 }
        : corner === "curve-ne"
        ? { x: right, y: top, start: Math.PI / 2, end: Math.PI }
        : corner === "curve-se"
        ? { x: right, y: bottom, start: Math.PI, end: Math.PI * 1.5 }
        : corner === "curve-sw"
        ? { x: left, y: bottom, start: Math.PI * 1.5, end: Math.PI * 2 }
        : null;
      if (!origin) return rectangleBoundary(cx, cy, size, size);
      for (let index = 0; index <= steps; index += 1) {
        const t = index / steps;
        const angle = origin.start + (origin.end - origin.start) * t;
        arc.push({
          x: origin.x + Math.cos(angle) * size,
          y: origin.y + Math.sin(angle) * size
        });
      }
      if (corner === "curve-nw") return [{ x: left, y: top }, ...arc, { x: left, y: bottom }];
      if (corner === "curve-ne") return [{ x: left, y: top }, { x: right, y: top }, ...arc];
      if (corner === "curve-se") return [{ x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom }, ...arc];
      if (corner === "curve-sw") return [...arc, { x: left, y: bottom }];
      return rectangleBoundary(cx, cy, size, size);
    };
    if (brush === "diag-nw") return [{ x: left, y: top }, { x: right, y: top }, { x: left, y: bottom }];
    if (brush === "diag-ne") return [{ x: left, y: top }, { x: right, y: top }, { x: right, y: bottom }];
    if (brush === "diag-se") return [{ x: right, y: top }, { x: right, y: bottom }, { x: left, y: bottom }];
    if (brush === "diag-sw") return [{ x: left, y: top }, { x: right, y: bottom }, { x: left, y: bottom }];
    if (String(brush).startsWith("curve-")) return curvePoints(brush);
    return rectangleBoundary(cx, cy, size, size);
  }

  function makeEditorDungeonWallRects(config, origin, cellSize) {
    const cells = Array.isArray(config.cells) ? config.cells : [];
    const cellByKey = new Map(cells.map(cell => [`${Number(cell.x)},${Number(cell.y)}`, cell]));
    const close = (a, b) => Math.abs(a.x - b.x) < 0.001 && Math.abs(a.y - b.y) < 0.001;
    const normalizedEdgeKey = (a, b) => {
      const first = `${Math.round(a.x * 100)},${Math.round(a.y * 100)}`;
      const second = `${Math.round(b.x * 100)},${Math.round(b.y * 100)}`;
      return first < second ? `${first}|${second}` : `${second}|${first}`;
    };
    const edgeCounts = new Map();
    const cellEdges = [];
    for (const cell of cells) {
      const x = Number(cell.x);
      const y = Number(cell.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const cx = origin.x + (x + 0.5) * cellSize;
      const cy = origin.y + (y + 0.5) * cellSize;
      const boundary = dungeonCellBoundary(cx, cy, cellSize, normalizeDungeonBrush(cell.brush));
      const edges = [];
      for (let index = 0; index < boundary.length; index += 1) {
        const a = boundary[index];
        const b = boundary[(index + 1) % boundary.length];
        const key = normalizedEdgeKey(a, b);
        edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
        edges.push({ a, b, key });
      }
      cellEdges.push({ x, y, edges, generatesWalls: dungeonBrushGeneratesWalls(cell.brush) });
    }
    const walls = [];
    const thickness = cellSize * 0.36;
    for (const cell of cellEdges) {
      if (!cell.generatesWalls) continue;
      for (const edge of cell.edges) {
        if (edgeCounts.get(edge.key) > 1) continue;
        const { a, b } = edge;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length = Math.hypot(dx, dy) || 1;
        if (length < 8) continue;
        if (Math.abs(dx) < cellSize * 0.04) continue;
        if (Math.abs(dy) > cellSize * 0.04 && dy < 0) continue;
        const nx = -dy / length;
        const ny = dx / length;
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const cellCenter = { x: origin.x + (cell.x + 0.5) * cellSize, y: origin.y + (cell.y + 0.5) * cellSize };
        if (midY > cellCenter.y + cellSize * 0.12) continue;
        const pointsTowardCell = ((cellCenter.x - midX) * nx + (cellCenter.y - midY) * ny) > 0;
        const inX = pointsTowardCell ? nx : -nx;
        const inY = pointsTowardCell ? ny : -ny;
        const polygon = [
          a,
          b,
          { x: b.x + inX * thickness, y: b.y + inY * thickness },
          { x: a.x + inX * thickness, y: a.y + inY * thickness }
        ];
        const bounds = boundsForPoints(polygon);
        walls.push({
          x: bounds.minX,
          y: bounds.minY,
          w: bounds.maxX - bounds.minX,
          h: bounds.maxY - bounds.minY,
          polygon
        });
      }
    }
    return walls;
  }
  
  function makeWhisperspring(glade) {
    const northPoint = glade.boundary.reduce((best, point) => (point.y < best.y ? point : best), glade.boundary[0]);
    const entranceSize = 420;
    const doorYOffset = 168;
    const doorRadius = 54;
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      x: northPoint.x,
      y: northPoint.y + 64,
      radius: entranceSize * 0.48,
      size: entranceSize,
      door: { x: northPoint.x, y: northPoint.y + doorYOffset, radius: doorRadius },
      blockRects: [
        { x: -entranceSize * 0.48, y: -entranceSize * 0.48, w: entranceSize * 0.96, h: entranceSize * 0.42 },
        { x: -entranceSize * 0.48, y: -entranceSize * 0.08, w: entranceSize * 0.25, h: entranceSize * 0.35 },
        { x: entranceSize * 0.23, y: -entranceSize * 0.08, w: entranceSize * 0.25, h: entranceSize * 0.35 }
      ]
    };
  
    const origin = { x: 62000 + randomBetween(-900, 900), y: 62000 + randomBetween(-900, 900) };
    const scale = 22;
    const toWorld = (mockX, mockY) => ({
      x: origin.x + (mockX - 64) * scale,
      y: origin.y + mockY * scale
    });
    const layoutRects = WHISPERSPRING_LAYOUT_RECTS.split(";").map(encoded => {
      const [x, y, w, h, surfaceCode] = encoded.split(",");
      return { x: Number(x), y: Number(y), w: Number(w), h: Number(h), surfaceCode };
    });
    const roomLabelSpecs = [
      { id: 1, x: 64, y: 161 },
      { id: 2, x: 64, y: 124 },
      { id: 3, x: 105, y: 128 },
      { id: 4, x: 100, y: 91 },
      { id: 5, x: 99, y: 67 },
      { id: 6, x: 87, y: 39 },
      { id: 7, x: 121, y: 20 },
      { id: 8, x: 17, y: 127 },
      { id: 9, x: 17, y: 92 },
      { id: 10, x: 54, y: 73 },
      { id: 11, x: 54, y: 22 }
    ];
    const roomSpawnCenterSpecs = {
      1: { x: 63, y: 153 },
      2: { x: 63, y: 122 },
      3: { x: 106.5, y: 123 },
      4: { x: 95, y: 84.5 },
      5: { x: 109.5, y: 56 },
      6: { x: 93.5, y: 37.5 },
      7: { x: 109.5, y: 22.5 },
      8: { x: 19.5, y: 111 },
      9: { x: 27.5, y: 85.5 },
      10: { x: 53.5, y: 74 },
      11: { x: 53.5, y: 28 }
    };
    const floorAreas = layoutRects.map((rect, index) => {
      const center = toWorld(rect.x + rect.w / 2, rect.y + rect.h / 2);
      return makeDungeonRoom(
        WHISPERSPRING_AREA_NAME,
        null,
        center.x,
        center.y,
        rect.w * scale,
        rect.h * scale,
        rect.surfaceCode === "g" ? "glade" : "whisperspring"
      );
    });
    const roomLabels = roomLabelSpecs.map(label => {
      const spawnCenter = roomSpawnCenterSpecs[label.id] || label;
      return {
        roomId: label.id,
        center: toWorld(spawnCenter.x, spawnCenter.y),
        labelCenter: toWorld(label.x, label.y)
      };
    });
    const passages = [];
    const entryPoint = toWorld(64, 161);
    const exitPoint = toWorld(64, 172);
    const returnPoint = { x: entranceObstacle.door.x, y: entranceObstacle.door.y + 58 };
    const water = layoutRects
      .filter(rect => rect.surfaceCode === "b")
      .map(rect => {
        const topLeft = toWorld(rect.x, rect.y);
        return {
          x: topLeft.x,
          y: topLeft.y,
          w: rect.w * scale,
          h: rect.h * scale,
          kind: "rect-water",
          areaName: WHISPERSPRING_AREA_NAME
        };
      });
    const occupiedCells = new Set();
    for (const rect of layoutRects) {
      for (let yy = rect.y; yy < rect.y + rect.h; yy += 1) {
        for (let xx = rect.x; xx < rect.x + rect.w; xx += 1) occupiedCells.add(`${xx},${yy}`);
      }
    }
    const wallRows = new Map();
    for (const key of occupiedCells) {
      const [x, y] = key.split(",").map(Number);
      if (occupiedCells.has(`${x},${y - 1}`)) continue;
      if (!wallRows.has(y)) wallRows.set(y, []);
      wallRows.get(y).push(x);
    }
    const wallRects = [];
    for (const [y, xs] of wallRows) {
      xs.sort((a, b) => a - b);
      let start = xs[0];
      let previous = xs[0];
      for (let index = 1; index <= xs.length; index += 1) {
        const current = xs[index];
        if (current === previous + 1) {
          previous = current;
          continue;
        }
        const topLeft = toWorld(start, y - 0.65);
        wallRects.push({
          x: topLeft.x,
          y: topLeft.y,
          w: (previous - start + 1) * scale,
          h: scale * 1.8
        });
        start = current;
        previous = current;
      }
    }
    const minX = Math.min(...layoutRects.map(rect => rect.x));
    const minY = Math.min(...layoutRects.map(rect => rect.y));
    const maxX = Math.max(...layoutRects.map(rect => rect.x + rect.w));
    const maxY = Math.max(...layoutRects.map(rect => rect.y + rect.h));
    const backgroundTopLeft = toWorld(minX - 16, minY - 16);
    const backgroundBottomRight = toWorld(maxX + 16, maxY + 16);
    const background = {
      x: backgroundTopLeft.x,
      y: backgroundTopLeft.y,
      w: backgroundBottomRight.x - backgroundTopLeft.x,
      h: backgroundBottomRight.y - backgroundTopLeft.y
    };
    return { areas: floorAreas, rooms: roomLabels, passages, water, wallRects, background, entranceObstacle, entryPoint, exitPoint, returnPoint };
  }

  function makeWyndhelmCathedral(wyndhelm) {
    const northPoint = wyndhelm.boundary.reduce((best, point) => (point.y < best.y ? point : best), wyndhelm.boundary[0]);
    const entranceSize = 500;
    const doorYOffset = 190;
    const doorRadius = 62;
    const entranceObstacle = {
      kind: "whisperspring-entrance",
      sprite: "wyndhelm-cathedral",
      dungeon: "wyndhelm-cathedral",
      x: northPoint.x,
      y: northPoint.y + 74,
      radius: entranceSize * 0.48,
      size: entranceSize,
      door: { x: northPoint.x, y: northPoint.y + doorYOffset, radius: doorRadius },
      blockRects: [
        { x: -entranceSize * 0.48, y: -entranceSize * 0.48, w: entranceSize * 0.96, h: entranceSize * 0.43 },
        { x: -entranceSize * 0.48, y: -entranceSize * 0.08, w: entranceSize * 0.27, h: entranceSize * 0.35 },
        { x: entranceSize * 0.21, y: -entranceSize * 0.08, w: entranceSize * 0.27, h: entranceSize * 0.35 }
      ]
    };

    const origin = { x: 78000 + randomBetween(-900, 900), y: 78000 + randomBetween(-900, 900) };
    const scale = 27;
    const cathedralCenterX = 65.5;
    const toWorld = (mockX, mockY) => ({
      x: origin.x + (mockX - cathedralCenterX) * scale,
      y: origin.y + mockY * scale
    });
    const rawFloorRects = [[56,2,9,15],[54,3,2,13],[65,3,2,13],[53,4,1,12],[67,4,1,12],[52,5,1,10],[68,5,1,10],[51,6,1,8],[69,6,1,7],[50,8,1,3],[70,9,1,2],[55,16,1,1],[65,16,1,1],[57,17,7,40],[50,24,7,20],[64,24,7,20],[51,44,6,1],[64,44,6,1],[36,50,21,4],[64,50,21,7],[37,54,20,3],[36,55,1,1],[36,57,8,5],[76,57,9,42],[37,62,7,38],[36,63,1,21],[89,64,24,20],[1,65,19,21],[120,70,9,14],[20,71,16,6],[85,71,4,6],[129,71,1,13],[113,75,7,5],[26,77,6,1],[26,78,5,46],[32,78,1,1],[85,78,1,1],[113,80,1,1],[119,80,1,1],[118,81,1,1],[107,84,6,40],[36,86,1,13],[120,89,10,13],[44,92,32,7],[113,94,7,6],[44,99,5,1],[80,99,4,1],[11,104,15,20],[31,104,11,20],[49,104,23,46],[81,106,26,18],[120,107,10,13],[42,110,7,6],[72,110,9,6],[113,111,7,6],[114,117,1,1],[118,117,1,1],[120,120,9,1],[57,150,7,6]];
    const topCircleRasterRects = rawFloorRects.slice(0, 13);
    const isolatedNoiseRects = [[32,78,1,1],[85,78,1,1],[113,80,1,1],[119,80,1,1],[118,81,1,1],[114,117,1,1],[118,117,1,1]];
    const sameRect = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);
    const floorRects = rawFloorRects.filter(rect => {
      if (topCircleRasterRects.some(circleRect => sameRect(rect, circleRect))) return false;
      if (isolatedNoiseRects.some(noiseRect => sameRect(rect, noiseRect))) return false;
      return true;
    });
    const courtyardRects = [[44,57,32,35]];
    const makeRasterRectArea = (rect, surface) => {
      const [x, y, w, h] = rect;
      const center = toWorld(x + w / 2, y + h / 2);
      return makeDungeonRoom(WYNDHELM_CATHEDRAL_AREA_NAME, null, center.x, center.y, w * scale, h * scale, surface);
    };
    const topSquareRoom = [50, -1, 21, 21];
    const roomOneFloor = [49, 104, 23, 46];
    const roomTwoFloors = [[11, 104, 15, 20], [31, 104, 11, 20]];
    const roomTwoOldwoodOverlay = [11, 104, 31, 20];
    const roomThreeFloors = [[1, 65, 19, 21]];
    const isRoomOneFloor = rect => roomOneFloor.every((value, index) => value === rect[index]);
    const isOldwoodFloor = rect => [...roomTwoFloors, ...roomThreeFloors].some(oldwoodRect => sameRect(rect, oldwoodRect));
    const cathedralSurfaceForRect = rect => {
      if (isRoomOneFloor(rect)) return "cathedral-carpet";
      if (isOldwoodFloor(rect)) return "cathedral-oldwood";
      return "cathedral-floor";
    };
    const floorAreas = [
      makeRasterRectArea(topSquareRoom, "cathedral-floor"),
      ...floorRects.map(rect => makeRasterRectArea(rect, cathedralSurfaceForRect(rect))),
      makeRasterRectArea(roomTwoOldwoodOverlay, "cathedral-oldwood"),
      ...courtyardRects.map(rect => makeRasterRectArea(rect, "cathedral-courtyard"))
    ];
    const courtyard = courtyardRects[0];
    const courtyardCenter = toWorld(courtyard[0] + courtyard[2] / 2, courtyard[1] + courtyard[3] / 2);
    const courtyardObstacles = [{
      x: courtyardCenter.x,
      y: courtyardCenter.y,
      radius: scale * 1.25,
      kind: "ruined-statue"
    }];
    const courtyardKinds = [
      "dead-tree",
      "dead-tree",
      "dead-tree",
      "weeping-willow",
      "weeping-willow",
      "bush",
      "bush",
      "bush",
      "bush"
    ];
    let courtyardAttempts = 0;
    while (courtyardObstacles.length < courtyardKinds.length + 1 && courtyardAttempts < 900) {
      courtyardAttempts += 1;
      const kind = courtyardKinds[courtyardObstacles.length - 1];
      const obstacle = {
        x: randomBetween(toWorld(courtyard[0] + 2, 0).x, toWorld(courtyard[0] + courtyard[2] - 2, 0).x),
        y: randomBetween(toWorld(0, courtyard[1] + 2).y, toWorld(0, courtyard[1] + courtyard[3] - 2).y),
        radius: kind === "bush" ? randomBetween(scale * 0.45, scale * 0.75) : randomBetween(scale * 0.7, scale * 1.05),
        kind
      };
      if (Math.hypot(obstacle.x - courtyardCenter.x, obstacle.y - courtyardCenter.y) < obstacle.radius + scale * 2.2) continue;
      if (courtyardObstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + scale * 0.85)) continue;
      courtyardObstacles.push(obstacle);
    }
    const occupiedCells = new Set();
    const markOccupied = rect => {
      const [x, y, w, h] = rect;
      for (let yy = y; yy < y + h; yy += 1) {
        for (let xx = x; xx < x + w; xx += 1) occupiedCells.add(`${xx},${yy}`);
      }
    };
    markOccupied(topSquareRoom);
    floorRects.forEach(markOccupied);
    courtyardRects.forEach(markOccupied);
    const wallRows = new Map();
    for (const key of occupiedCells) {
      const [x, y] = key.split(",").map(Number);
      if (occupiedCells.has(`${x},${y - 1}`)) continue;
      if (!wallRows.has(y)) wallRows.set(y, []);
      wallRows.get(y).push(x);
    }
    const wallRects = [];
    for (const [y, xs] of wallRows) {
      xs.sort((a, b) => a - b);
      let start = xs[0];
      let previous = xs[0];
      for (let index = 1; index <= xs.length; index += 1) {
        const current = xs[index];
        if (current === previous + 1) {
          previous = current;
          continue;
        }
        const width = previous - start + 1;
        if (width >= 3) {
          const topLeft = toWorld(start, y - 0.65);
          wallRects.push({
            x: topLeft.x,
            y: topLeft.y,
            w: width * scale,
            h: scale * 1.8
          });
        }
        start = current;
        previous = current;
      }
    }
    const roomLabelSpecs = [
      { roomId: 1, x: 59.5, y: 129.5 },
      { roomId: 2, x: 22.5, y: 113.5 },
      { roomId: 3, x: 8.5, y: 74.5 },
      { roomId: 4, x: 60.5, y: 75.5 },
      { roomId: 5, x: 88.5, y: 113.5 },
      { roomId: 6, x: 124.5, y: 113.5 },
      { roomId: 7, x: 124.5, y: 95.5 },
      { roomId: 8, x: 124.5, y: 77.5 },
      { roomId: 9, x: 99.5, y: 75.5 },
      { roomId: 10, x: 60.5, y: 34.5 },
      { roomId: 11, x: 60.5, y: 9.5 }
    ];
    const roomLabels = roomLabelSpecs.map(label => ({
      roomId: label.roomId,
      center: toWorld(label.x, label.y),
      labelCenter: toWorld(label.x, label.y)
    }));
    const entryPoint = toWorld(60.5, 153);
    const exitPoint = toWorld(60.5, 153);
    const returnPoint = { x: entranceObstacle.door.x, y: entranceObstacle.door.y + 66 };
    const shapeBounds = floorAreas.map(area => boundsForPoints(area.boundary));
    const minX = Math.min(...shapeBounds.map(bounds => bounds.minX));
    const minY = Math.min(...shapeBounds.map(bounds => bounds.minY));
    const maxX = Math.max(...shapeBounds.map(bounds => bounds.maxX));
    const maxY = Math.max(...shapeBounds.map(bounds => bounds.maxY));
    const background = {
      x: minX - 16 * scale,
      y: minY - 16 * scale,
      w: maxX - minX + 32 * scale,
      h: maxY - minY + 32 * scale
    };
    return { areas: floorAreas, rooms: roomLabels, passages: [], water: [], wallRects, obstacles: courtyardObstacles, background, entranceObstacle, entryPoint, exitPoint, returnPoint };
  }
  
  function makeWhisperspringRoomOneElites(whisperspring) {
    const roomOne = whisperspring.rooms.find(room => room.roomId === 1);
    if (!roomOne) return [];
    const { x, y } = roomOne.center;
    return [
      {
        name: "Finnegan",
        template: "Leprechaun",
        lvl: 5,
        x: x - 92,
        y: y - 54,
        aggroRange: 9,
        friendlyToGoodPlayer: true,
        shopkeeper: true,
        inventory: [],
        consumables: shopkeeperStartingConsumables.map(cloneItem).filter(Boolean),
        scrolls: sylvanScrolls.map(cloneItem).filter(Boolean)
      },
      {
        name: "Quigley Thistleberry",
        template: "Brownie Druid",
        lvl: 5,
        x: x + 92,
        y: y - 34,
        aggroRange: 9,
        friendlyToGoodPlayer: true
      },
      {
        name: "Soulreaper Trainer Bogsley",
        template: "Brownie Druid",
        lvl: 5,
        x,
        y: y + 96,
        aggroRange: 9,
        friendlyToGoodPlayer: true,
        trainer: true
      }
    ];
  }
  
  function makeWhisperspringFixedSpawns(whisperspring) {
    const roomTwo = whisperspring.rooms.find(room => room.roomId === 2);
    const roomNine = whisperspring.rooms.find(room => room.roomId === 9);
    const spawns = [];
    if (roomTwo) {
      const { x, y } = roomTwo.center;
      spawns.push(
        { name: "Razorfang Snapdragon", template: "Snapdragon", lvl: 5, x: x - 118, y: y - 88 },
        { name: "Razorfang Snapdragon", template: "Snapdragon", lvl: 5, x: x + 118, y: y - 88 },
        { name: "Razorfang Snapdragon", template: "Snapdragon", lvl: 5, x, y: y + 82 }
      );
    }
    if (roomNine) {
      const { x, y } = roomNine.center;
      spawns.push(
        { name: "Green Drake", template: "Green Drake", lvl: 5, x: x - 126, y: y - 58 },
        { name: "Green Drake", template: "Green Drake", lvl: 5, x: x + 126, y: y - 58 }
      );
    }
    return spawns.map((spawn, index) => ({
      ...spawn,
      id: `whisperspring-fixed-${index + 1}`,
      area: WHISPERSPRING_AREA_NAME,
      homeX: spawn.x,
      homeY: spawn.y,
      noWander: true
    }));
  }

  function makeWhisperspringRoomThreeElites(whisperspring) {
    const room = whisperspring.rooms.find(candidate => candidate.roomId === 3);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Whisperspring Dryad", template: "Whisperspring Dryad", lvl: 8, x: x - 118, y: y - 24, aggroRange: 9, noWander: true },
      { name: "Whisperspring Dryad", template: "Whisperspring Dryad", lvl: 8, x: x + 118, y: y - 24, aggroRange: 9, noWander: true },
      { name: "Whisperspring Nymph", template: "Whisperspring Nymph", lvl: 8, x, y: y + 92, aggroRange: 9, noWander: true }
    ];
  }

  function makeWhisperspringRoomFourElites(whisperspring) {
    const room = whisperspring.rooms.find(candidate => candidate.roomId === 4);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Tatzelwurm", template: "Tatzelwurm", lvl: 10, x, y, aggroRange: 10, noWander: true, leashX: x, leashY: y, leashRadius: 280 },
      { name: "Whisperspring Nymph", template: "Whisperspring Nymph", lvl: 9, x: x - 128, y: y + 86, aggroRange: 9, noWander: true },
      { name: "Whisperspring Nymph", template: "Whisperspring Nymph", lvl: 9, x: x + 128, y: y + 86, aggroRange: 9, noWander: true }
    ];
  }

  function makeWhisperspringRoomFiveElites(whisperspring) {
    const room = whisperspring.rooms.find(candidate => candidate.roomId === 5);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Whisperspring Elder Dryad", template: "Whisperspring Elder Dryad", lvl: 10, x: x - 132, y: y - 74, aggroRange: 9, noWander: true },
      { name: "Whisperspring Elder Dryad", template: "Whisperspring Elder Dryad", lvl: 10, x: x + 132, y: y - 74, aggroRange: 9, noWander: true },
      { name: "Whisperspring Elder Nymph", template: "Whisperspring Elder Nymph", lvl: 10, x: x - 112, y: y + 96, aggroRange: 9, noWander: true },
      { name: "Whisperspring Elder Nymph", template: "Whisperspring Elder Nymph", lvl: 10, x: x + 112, y: y + 96, aggroRange: 9, noWander: true }
    ];
  }

  function makeWhisperspringRoomSixElites(whisperspring) {
    const room = whisperspring.rooms.find(candidate => candidate.roomId === 6);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Leshy", template: "Leshy", lvl: 11, x: x - 112, y: y - 12, aggroRange: 10, noWander: true, leashX: x, leashY: y, leashRadius: 300 },
      { name: "Leshachikha", template: "Leshachikha", lvl: 11, x: x + 112, y: y - 12, aggroRange: 10, noWander: true, leashX: x, leashY: y, leashRadius: 300 },
      { name: "Whisperspring Elder Dryad", template: "Whisperspring Elder Dryad", lvl: 10, x, y: y + 112, aggroRange: 9, noWander: true }
    ];
  }

  function makeWhisperspringRoomSevenElites(whisperspring) {
    const room = whisperspring.rooms.find(candidate => candidate.roomId === 7);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Yaar the Slumberer", template: "Yaar the Slumberer", lvl: 12, x, y, aggroRange: 10, noWander: true, leashX: x, leashY: y, leashRadius: 320 },
      { name: "Green Drake", template: "Green Drake", lvl: 11, x: x - 138, y: y + 96, aggroRange: 9, noWander: true, aggressive: true },
      { name: "Green Drake", template: "Green Drake", lvl: 11, x: x + 138, y: y + 96, aggroRange: 9, noWander: true, aggressive: true }
    ];
  }
  
  function makeWhisperspringRoomEightElites(whisperspring) {
    const room = whisperspring.rooms.find(room => room.roomId === 8);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Zesty Satyr", template: "Satyr", lvl: 6, x: x - 108, y: y + 14 },
      { name: "Zesty Satyr", template: "Satyr", lvl: 6, x: x + 108, y: y + 14 },
      { name: "Whisperspring Treant", template: "Treant", lvl: 6, x: x - 108, y: y + 104 },
      { name: "Whisperspring Treant", template: "Treant", lvl: 6, x: x + 108, y: y + 104 }
    ];
  }

  function makeWhisperspringRoomNineElites(whisperspring) {
    const room = whisperspring.rooms.find(room => room.roomId === 9);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Whisperspring Nymph", template: "Nymph", lvl: 7, x, y: y + 88 }
    ];
  }

  function makeWhisperspringRoomTenElites(whisperspring) {
    const room = whisperspring.rooms.find(room => room.roomId === 10);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Scylox the Many", template: "Scylox the Many", lvl: 8, x, y },
      { name: "Whisperspring Naiad", template: "Naiad", lvl: 8, x: x - 132, y: y + 82 },
      { name: "Whisperspring Naiad", template: "Naiad", lvl: 8, x: x + 132, y: y + 82 }
    ];
  }

  function makeWhisperspringRoomElevenElites(whisperspring) {
    const room = whisperspring.rooms.find(room => room.roomId === 11);
    if (!room) return [];
    const { x, y } = room.center;
    return [
      { name: "Cogar the Whisperer", template: "Cogar the Whisperer", lvl: 8, x, y: y - 24 },
      { name: "Whisperspring Naiad", template: "Naiad", lvl: 8, x: x - 122, y: y + 88 },
      { name: "Whisperspring Naiad", template: "Naiad", lvl: 8, x: x + 122, y: y + 88 }
    ];
  }
  
  function makeGanderswoodBlasphemiumSite(area, areas, passages, existingHouses = []) {
    const patchW = 430;
    const patchH = 360;
    const houseDiameter = 310;
    const makeSite = (graveyard, house) => {
      graveyard.id = graveyard.id || "ganderswood-blasphemium-graveyard";
      graveyard.areaName = AREA_NAME;
      graveyard.stoneCount = graveyard.stoneCount || 7;
      const hereticSlayleigh = makeHereticSlayleigh(graveyard);
      return {
        graveyard,
        obstacles: makeGanderswoodGravestoneObstacles(graveyard, [hereticSlayleigh]),
        houses: [house],
        hereticOswaldo: {
          id: "heretic-oswaldo",
          name: "Heretic Oswaldo",
          x: house.shopSpot.x,
          y: house.shopSpot.y,
          radius: 16
        },
        hereticSlayleigh
      };
    };
    const makeBlasphemiumHouse = (x, y) => makeCircularHouse("ganderswood-blasphemium", x, y, houseDiameter, {
      name: "Ganderswood Blasphemium",
      label: "Ganderswood Blasphemium",
      roofTexture: "purpleCircularShingles",
      floorTexture: "hereticCarpet"
    });
    const sitePointsInGanderswood = (graveyard, house) => {
      const slayleigh = makeHereticSlayleigh(graveyard);
      return [
        { x: graveyard.x, y: graveyard.y },
        house.shopSpot,
        house.outsideDoor,
        house.entrance,
        slayleigh
      ].every(point => areaAt(point.x, point.y, { areas, passages })?.name === AREA_NAME);
    };
    const siteCollidesExistingHouse = (graveyard, house) => {
      const graveyardBuffer = 90;
      const houseBuffer = 220;
      const houseRadiusBuffer = 120;
      return existingHouses.some(existing => (
        rectsOverlap(graveyard.bounds, houseCollisionBounds(existing, graveyardBuffer))
          || rectCollidesCircle(
            houseCollisionBounds(existing, houseBuffer),
            house.x,
            house.y,
            house.radius + houseRadiusBuffer
          )
      ));
    };
    const siteIsUsable = (graveyard, house, passagePadding = 170) => {
      if (!sitePointsInGanderswood(graveyard, house)) return false;
      if (siteCollidesExistingHouse(graveyard, house)) return false;
      if (rectsOverlap(graveyard.bounds, houseCollisionBounds(house, 26))) return false;
      const points = [
        house.shopSpot,
        house.outsideDoor,
        house.entrance,
        ...rectangleBoundary(house.x, house.y, house.w + 190, house.h + 190)
      ];
      if (!points.every(point => areaAt(point.x, point.y, { areas, passages })?.name === AREA_NAME)) return false;
      if (points.some(point => pointInAnyPassage(point.x, point.y, passages, passagePadding))) return false;
      return true;
    };
    const makeHouseEastOfGraveyard = graveyard => makeBlasphemiumHouse(graveyard.x + patchW / 2 + houseDiameter * 0.62, graveyard.y);
    const offsets = shuffled([
      { x: 0, y: -patchH / 2 - houseDiameter * 0.62 },
      { x: patchW / 2 + houseDiameter * 0.62, y: 0 },
      { x: 0, y: patchH / 2 + houseDiameter * 0.62 },
      { x: -patchW / 2 - houseDiameter * 0.62, y: 0 }
    ]);
    for (let attempt = 0; attempt < 260; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.38, area.center.x + area.width * 0.38);
      const y = randomBetween(area.center.y - area.height * 0.38, area.center.y + area.height * 0.38);
      if (Math.hypot(x - area.center.x, y - area.center.y) < 760) continue;
      const graveyard = makeGanderswoodGraveyardPatch(x, y, patchW, patchH);
      if (pointInAnyPassage(x, y, passages, 260)) continue;
      if (!rectangleBoundary(x, y, patchW + 140, patchH + 140).every(point => areaAt(point.x, point.y, { areas, passages })?.name === AREA_NAME)) continue;
      for (const offset of offsets) {
        const house = makeBlasphemiumHouse(x + offset.x, y + offset.y);
        if (!siteIsUsable(graveyard, house, 170)) continue;
        return makeSite(graveyard, house);
      }
    }
    const fallbackOffsets = shuffled([
      { x: 0.27, y: -0.18 },
      { x: -0.27, y: -0.18 },
      { x: 0.27, y: 0.18 },
      { x: -0.27, y: 0.18 },
      { x: 0, y: -0.32 },
      { x: 0, y: 0.32 }
    ]);
    let fallback = null;
    let house = null;
    for (const offset of fallbackOffsets) {
      const candidateGraveyard = makeGanderswoodGraveyardPatch(area.center.x + area.width * offset.x, area.center.y + area.height * offset.y, patchW, patchH);
      if (pointInAnyPassage(candidateGraveyard.x, candidateGraveyard.y, passages, 240)) continue;
      const candidateHouse = makeHouseEastOfGraveyard(candidateGraveyard);
      if (!siteIsUsable(candidateGraveyard, candidateHouse, 170)) continue;
      fallback = candidateGraveyard;
      house = candidateHouse;
      break;
    }
    if (fallback && house) return makeSite(fallback, house);

    const forcedOffsets = [
      { x: 0.36, y: -0.32 },
      { x: -0.36, y: -0.32 },
      { x: 0.36, y: 0.32 },
      { x: -0.36, y: 0.32 },
      { x: 0.42, y: 0 },
      { x: -0.42, y: 0 },
      { x: 0, y: -0.42 },
      { x: 0, y: 0.42 },
      { x: 0.24, y: -0.42 },
      { x: -0.24, y: -0.42 },
      { x: 0.24, y: 0.42 },
      { x: -0.24, y: 0.42 }
    ];
    for (const offset of forcedOffsets) {
      const forcedGraveyard = makeGanderswoodGraveyardPatch(area.center.x + area.width * offset.x, area.center.y + area.height * offset.y, patchW, patchH);
      const forcedHouse = makeHouseEastOfGraveyard(forcedGraveyard);
      if (pointInAnyPassage(forcedGraveyard.x, forcedGraveyard.y, passages, 160)) continue;
      if (siteIsUsable(forcedGraveyard, forcedHouse, 140)) return makeSite(forcedGraveyard, forcedHouse);
    }

    for (let attempt = 0; attempt < 5000; attempt += 1) {
      const forcedGraveyard = makeGanderswoodGraveyardPatch(
        randomBetween(area.center.x - area.width * 0.44, area.center.x + area.width * 0.44),
        randomBetween(area.center.y - area.height * 0.44, area.center.y + area.height * 0.44),
        patchW,
        patchH
      );
      const forcedHouse = makeHouseEastOfGraveyard(forcedGraveyard);
      if (pointInAnyPassage(forcedGraveyard.x, forcedGraveyard.y, passages, 120)) continue;
      if (siteIsUsable(forcedGraveyard, forcedHouse, 100)) return makeSite(forcedGraveyard, forcedHouse);
    }

    for (const offset of shuffled(forcedOffsets)) {
      const forcedGraveyard = makeGanderswoodGraveyardPatch(area.center.x + area.width * offset.x, area.center.y + area.height * offset.y, patchW, patchH);
      const forcedHouse = makeHouseEastOfGraveyard(forcedGraveyard);
      if (sitePointsInGanderswood(forcedGraveyard, forcedHouse) && !siteCollidesExistingHouse(forcedGraveyard, forcedHouse)) {
        return makeSite(forcedGraveyard, forcedHouse);
      }
    }

    const lastResortOffsets = [
      { x: 0.42, y: -0.42 },
      { x: -0.42, y: -0.42 },
      { x: 0.42, y: 0.42 },
      { x: -0.42, y: 0.42 },
      { x: 0.46, y: -0.18 },
      { x: -0.46, y: -0.18 },
      { x: 0.46, y: 0.18 },
      { x: -0.46, y: 0.18 },
      { x: 0, y: -0.46 },
      { x: 0, y: 0.46 }
    ];
    for (const offset of lastResortOffsets) {
      const forcedGraveyard = makeGanderswoodGraveyardPatch(area.center.x + area.width * offset.x, area.center.y + area.height * offset.y, patchW, patchH);
      const forcedHouse = makeHouseEastOfGraveyard(forcedGraveyard);
      if (!siteCollidesExistingHouse(forcedGraveyard, forcedHouse)) return makeSite(forcedGraveyard, forcedHouse);
    }

    const forcedGraveyard = makeGanderswoodGraveyardPatch(area.center.x, area.center.y, patchW, patchH);
    const forcedHouse = makeHouseEastOfGraveyard(forcedGraveyard);
    return makeSite(forcedGraveyard, forcedHouse);
  }

  function makeHereticSlayleigh(graveyard) {
    return {
      id: "heretic-slayleigh",
      name: "Heretic Slayleigh",
      x: graveyard.x - graveyard.w * 0.28,
      y: graveyard.y + graveyard.h * 0.24,
      radius: 16,
      trainer: true
    };
  }

  function makeGanderswoodGraveyardPatch(x, y, w, h) {
    return {
      x,
      y,
      w,
      h,
      radius: Math.max(w, h) / 2,
      cornerRadius: 72,
      textureAreaName: RAT_DEN_AREA_NAME,
      bounds: { x: x - w / 2, y: y - h / 2, w, h }
    };
  }

  function makeGanderswoodGravestoneObstacles(graveyard, protectedPoints = []) {
    const stones = [];
    let attempts = 0;
    const target = graveyard.stoneCount || 7;
    while (stones.length < target && attempts < target * 40) {
      attempts += 1;
      const x = randomBetween(graveyard.x - graveyard.w * 0.38, graveyard.x + graveyard.w * 0.38);
      const y = randomBetween(graveyard.y - graveyard.h * 0.35, graveyard.y + graveyard.h * 0.35);
      const stone = {
        x,
        y,
        radius: randomBetween(17, 25),
        kind: "gravestone",
        rotation: randomBetween(-0.22, 0.22)
      };
      if (protectedPoints.some(point => Math.hypot(point.x - stone.x, point.y - stone.y) < (point.radius || 16) + stone.radius + 54)) continue;
      if (stones.some(existing => Math.hypot(existing.x - stone.x, existing.y - stone.y) < existing.radius + stone.radius + 58)) continue;
      stones.push(stone);
    }
    return stones;
  }

  function makeRandomGraveyardSite(area, areas, passages = [], houses = [], options = {}) {
    const patchW = options.w || 430;
    const patchH = options.h || 360;
    const clearance = Math.max(patchW, patchH) * 0.62;
    const overlapsHouse = graveyard => houses.some(house => rectsOverlap(graveyard.bounds, houseCollisionBounds(house, 90)));
    for (let attempt = 0; attempt < 260; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.38, area.center.x + area.width * 0.38);
      const y = randomBetween(area.center.y - area.height * 0.38, area.center.y + area.height * 0.38);
      if (Math.hypot(x - area.center.x, y - area.center.y) < (options.centerAvoidance || 0)) continue;
      const graveyard = makeGanderswoodGraveyardPatch(x, y, patchW, patchH);
      graveyard.id = options.id || `${area.name.toLowerCase().replaceAll(/\s+/g, "-")}-graveyard`;
      graveyard.areaName = area.name;
      graveyard.stoneCount = options.stones || 7;
      if (pointInAnyPassage(x, y, passages, clearance)) continue;
      if (!rectangleBoundary(x, y, patchW + 130, patchH + 130).every(point => areaAt(point.x, point.y, { areas, passages })?.name === area.name)) continue;
      if (overlapsHouse(graveyard)) continue;
      if ((options.avoidObstacles || []).some(obstacle => rectCollidesCircle(graveyard.bounds, obstacle.x, obstacle.y, (obstacle.radius || 0) + 28))) continue;
      return {
        graveyard,
        obstacles: makeGanderswoodGravestoneObstacles(graveyard)
      };
    }
    const fallbackOffsets = shuffled([
      { x: -0.26, y: -0.26 },
      { x: 0.26, y: -0.26 },
      { x: -0.26, y: 0.26 },
      { x: 0.26, y: 0.26 },
      { x: 0, y: -0.32 },
      { x: 0, y: 0.32 },
      { x: -0.32, y: 0 },
      { x: 0.32, y: 0 }
    ]);
    let fallback = null;
    for (const offset of fallbackOffsets) {
      const candidate = makeGanderswoodGraveyardPatch(
        area.center.x + area.width * offset.x,
        area.center.y + area.height * offset.y,
        patchW,
        patchH
      );
      if (overlapsHouse(candidate)) continue;
      if (passages.some(passage => pointInPassage(candidate.x, candidate.y, passage, clearance))) continue;
      if (!rectangleBoundary(candidate.x, candidate.y, patchW + 80, patchH + 80).every(point => areaAt(point.x, point.y, { areas, passages })?.name === area.name)) continue;
      fallback = candidate;
      break;
    }
    if (!fallback) return null;
    fallback.id = options.id || `${area.name.toLowerCase().replaceAll(/\s+/g, "-")}-graveyard`;
    fallback.areaName = area.name;
    fallback.stoneCount = options.stones || 7;
    return {
      graveyard: fallback,
      obstacles: makeGanderswoodGravestoneObstacles(fallback)
    };
  }
  
  function makeCecil(grimswood) {
    return {
      name: "Cecil Paddywagon",
      x: grimswood.hubCenter.x + 82,
      y: grimswood.hubCenter.y + 16,
      radius: 16
    };
  }

  function makeBumsforkSite(grimswood) {
    const { hubCenter } = grimswood;
    const mageGuild = makeCircularHouse("bumsfork-mage-guild", hubCenter.x + 320, hubCenter.y - 130, 330, {
      label: "Bumsfork Mage Guild",
      roofTexture: "purpleCircularShingles",
      floorTexture: "mageGuildCarpet",
      metadata: { area: GRIMSWOOD_PATH_NAME, name: "Bumsfork Mage Guild" }
    });
    return {
      houses: [
        makeHouse("bumsfork-house-1", hubCenter.x - 320, hubCenter.y - 130, 340, 270, {
          label: "Bumsfork House 1",
          roofTexture: "thatch",
          metadata: { area: GRIMSWOOD_PATH_NAME, name: "Bumsfork House 1" }
        }),
        mageGuild
      ],
      mageGuild
    };
  }
  
  function makeBumsforkNpcs(grimswood) {
    return [
      { name: "Bumsfork Local", label: "Local", x: grimswood.hubCenter.x - 92, y: grimswood.hubCenter.y - 78, radius: 14, color: "#c9b17a" },
      { name: "Bumsfork Watcher", label: "Watcher", x: grimswood.hubCenter.x - 126, y: grimswood.hubCenter.y + 72, radius: 14, color: "#9aa0a6" },
      { name: "Quiet Villager", label: "Villager", x: grimswood.hubCenter.x + 12, y: grimswood.hubCenter.y + 112, radius: 14, color: "#b58a62" }
    ];
  }

  function makeGobbaSite(gobba) {
    const cx = gobba.center.x;
    const cy = gobba.center.y;
    const namedHouseOptions = name => ({
      label: name,
      metadata: { area: GOBBA_AREA_NAME, name },
      wallTexture: "woodenposts",
      floorTexture: "ratDen",
      roofTexture: "houseRoof"
    });
    const stronghold = makeCircularHouse("gobba-stronghold", cx, cy, 990, {
      ...namedHouseOptions("Gobba Stronghold"),
      floorTexture: "gobbaStronghold",
      roofTexture: "thatchedCircleRoof",
      blockCount: 56,
      entranceAngles: [Math.PI / 2, 0, Math.PI * 1.5, Math.PI],
      entranceGap: 0.13
    });
    const specs = shuffled([
      {
        id: "gobba-house-1",
        name: "Gobba House 1",
        make: (x, y) => makeCircularHouse("gobba-house-1", x, y, 330, {
          ...namedHouseOptions("Gobba House 1"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-house-2",
        name: "Gobba House 2",
        make: (x, y) => makeCircularHouse("gobba-house-2", x, y, 330, {
          ...namedHouseOptions("Gobba House 2"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-house-3",
        name: "Gobba House 3",
        make: (x, y) => makeCircularHouse("gobba-house-3", x, y, 330, {
          ...namedHouseOptions("Gobba House 3"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-house-5",
        name: "Gobba House 5",
        make: (x, y) => makeCircularHouse("gobba-house-5", x, y, 330, {
          ...namedHouseOptions("Gobba House 5"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-house-6",
        name: "Gobba House 6",
        make: (x, y) => makeCircularHouse("gobba-house-6", x, y, 330, {
          ...namedHouseOptions("Gobba House 6"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-house-7",
        name: "Gobba House 7",
        make: (x, y) => makeCircularHouse("gobba-house-7", x, y, 330, {
          ...namedHouseOptions("Gobba House 7"),
          roofTexture: "thatchedCircleRoof"
        })
      },
      {
        id: "gobba-longhouse",
        name: "Gobba Longhouse",
        make: (x, y) => makeLonghouse("gobba-longhouse", x, y, namedHouseOptions("Gobba Longhouse"))
      },
      {
        id: "gobba-house-4",
        name: "Gobba House 4",
        make: (x, y) => makeHouse("gobba-house-4", x, y, 340, 270, namedHouseOptions("Gobba House 4"))
      }
    ]);
    const entranceClearanceRects = house => {
      const rects = [];
      const doors = house.outsideDoors || [house.outsideDoor].filter(Boolean);
      const entrances = house.entrances || [house.entrance].filter(Boolean);
      for (let index = 0; index < doors.length; index += 1) {
        const door = doors[index];
        const entrance = entrances[index] || house.entrance || door;
        const minX = Math.min(door.x, entrance.x);
        const minY = Math.min(door.y, entrance.y);
        const maxX = Math.max(door.x, entrance.x);
        const maxY = Math.max(door.y, entrance.y);
        rects.push({ x: door.x - 92, y: door.y - 78, w: 184, h: 156 });
        rects.push({
          x: minX - 70,
          y: minY - 70,
          w: Math.max(140, maxX - minX + 140),
          h: Math.max(140, maxY - minY + 140)
        });
      }
      return rects;
    };
    const houseFitsGobba = house => {
      const bounds = houseCollisionBounds(house, 115);
      const corners = [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.w, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.h },
        { x: bounds.x + bounds.w, y: bounds.y + bounds.h }
      ];
      const clearanceCorners = entranceClearanceRects(house).flatMap(rect => [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.w, y: rect.y },
        { x: rect.x, y: rect.y + rect.h },
        { x: rect.x + rect.w, y: rect.y + rect.h }
      ]);
      return [...corners, ...clearanceCorners].every(point => isPointInBoundary(point.x, point.y, gobba.boundary));
    };
    const houseBlocksExistingEntrance = (house, existingHouses) => {
      const bounds = houseCollisionBounds(house, 115);
      const clearances = entranceClearanceRects(house);
      return existingHouses.some(existing => {
        const existingBounds = houseCollisionBounds(existing, 115);
        const existingClearances = entranceClearanceRects(existing);
        return rectsOverlap(bounds, existingBounds)
          || existingClearances.some(rect => rectsOverlap(bounds, rect))
          || clearances.some(rect => rectsOverlap(existingBounds, rect))
          || clearances.some(rect => existingClearances.some(existingRect => rectsOverlap(rect, existingRect, 8)));
      });
    };
    const randomSlots = shuffled([
      { x: -0.34, y: -0.34 },
      { x: 0.34, y: -0.34 },
      { x: -0.36, y: 0.34 },
      { x: 0.36, y: 0.34 },
      { x: 0, y: -0.39 },
      { x: -0.42, y: 0.02 },
      { x: 0.42, y: 0.03 },
      { x: 0, y: 0.39 },
      { x: -0.17, y: -0.44 },
      { x: 0.17, y: 0.44 },
      { x: -0.45, y: -0.16 },
      { x: 0.45, y: 0.17 }
    ]);
    const houses = [stronghold];
    for (const spec of specs) {
      let placed = null;
      for (let attempt = 0; attempt < 420 && !placed; attempt += 1) {
        const slot = attempt < randomSlots.length ? randomSlots[(houses.length + attempt) % randomSlots.length] : null;
        const x = slot
          ? cx + gobba.width * slot.x + randomBetween(-44, 44)
          : randomBetween(cx - gobba.width * 0.34, cx + gobba.width * 0.34);
        const y = slot
          ? cy + gobba.height * slot.y + randomBetween(-38, 38)
          : randomBetween(cy - gobba.height * 0.32, cy + gobba.height * 0.32);
        const house = spec.make(x, y);
        if (!houseFitsGobba(house)) continue;
        if (houseBlocksExistingEntrance(house, houses)) continue;
        placed = house;
      }
      if (placed) houses.push(placed);
    }
    if (houses.length === specs.length + 1) return { houses };

    const fallbackSlots = {
      "gobba-house-1": { x: -0.35, y: -0.34 },
      "gobba-house-2": { x: 0.35, y: -0.34 },
      "gobba-house-3": { x: -0.36, y: 0.36 },
      "gobba-house-5": { x: 0.36, y: 0.36 },
      "gobba-house-6": { x: -0.42, y: 0.02 },
      "gobba-house-7": { x: 0.42, y: 0.03 },
      "gobba-longhouse": { x: 0, y: -0.39 },
      "gobba-house-4": { x: 0, y: 0.39 }
    };
    const fallbackHouses = [stronghold];
    for (const spec of specs) {
      const slot = fallbackSlots[spec.id] || { x: 0, y: 0 };
      const house = spec.make(cx + gobba.width * slot.x, cy + gobba.height * slot.y);
      if (!houseFitsGobba(house) || houseBlocksExistingEntrance(house, fallbackHouses)) return { houses };
      fallbackHouses.push(house);
    }
    return { houses: fallbackHouses };
  }

  function makeGobbaTumbleweeds(gobba, houses = [], count = 36) {
    const tumbleweeds = [];
    let attempts = 0;
    while (tumbleweeds.length < count && attempts < count * 80) {
      attempts += 1;
      const obstacle = {
        x: randomBetween(gobba.center.x - gobba.width * 0.46, gobba.center.x + gobba.width * 0.46),
        y: randomBetween(gobba.center.y - gobba.height * 0.46, gobba.center.y + gobba.height * 0.46),
        radius: randomBetween(10, 22),
        kind: "tumbleweed"
      };
      if (!isPointInBoundary(obstacle.x, obstacle.y, gobba.boundary)) continue;
      if (Math.hypot(obstacle.x - gobba.center.x, obstacle.y - gobba.center.y) < 680) continue;
      if (houses.some(house => rectCollidesCircle(houseCollisionBounds(house, 120), obstacle.x, obstacle.y, obstacle.radius + 12))) continue;
      if (tumbleweeds.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 38)) continue;
      tumbleweeds.push(obstacle);
    }
    return tumbleweeds;
  }
  
  function makeGrimswoodDeadTrees(grimswood, count) {
    const trees = [];
    const passages = grimswood.passages || [];
    let attempts = 0;
    while (trees.length < count && attempts < count * 26) {
      attempts += 1;
      const passage = passages[randomInt(0, passages.length - 1)];
      if (!passage) break;
      const dx = passage.x2 - passage.x1;
      const dy = passage.y2 - passage.y1;
      const length = Math.hypot(dx, dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      const radius = randomBetween(18, 36);
      const t = randomBetween(0.06, 0.94);
      const interiorLimit = Math.max(0, passage.width / 2 - radius - 36);
      const interiorOffset = randomBetween(-interiorLimit, interiorLimit);
      const tree = {
        x: passage.x1 + dx * t + nx * interiorOffset + randomBetween(-18, 18),
        y: passage.y1 + dy * t + ny * interiorOffset + randomBetween(-18, 18),
        radius,
        kind: "dead-tree"
      };
      if (Math.hypot(tree.x - grimswood.hubCenter.x, tree.y - grimswood.hubCenter.y) < grimswood.villageRange * RANGE_UNIT + tree.radius + 34) continue;
      if (trees.some(existing => distance(tree, existing) < tree.radius + existing.radius + 30)) continue;
      trees.push(tree);
    }
    return trees;
  }
  
  function makeWyndhelmSite(wyndhelm, passages = []) {
    const cx = wyndhelm.center.x;
    const cy = wyndhelm.center.y;
    const namedHouseOptions = name => ({
      label: name,
      metadata: { area: WYNDHELM_AREA_NAME, name },
      roofTexture: "spooky",
      floorTexture: name === "Wyndhelm Church" ? "cathCarpet" : "oldwood",
      wallDarken: 0.5
    });
    const placed = (x, y) => ({ x: x + randomBetween(-26, 26), y: y + randomBetween(-26, 26) });
    const houseSlots = shuffled([
      placed(cx - 760, cy - 650),
      placed(cx + 790, cy - 625),
      placed(cx - 795, cy + 690)
    ]);
    const houses = [
      makeLHouse("wyndhelm-hall", cx - 705 + randomBetween(-34, 34), cy + 40 + randomBetween(-40, 40), namedHouseOptions("Wyndhelm Hall")),
      makeLonghouse("wyndhelm-barracks", cx + 735 + randomBetween(-34, 34), cy + 40 + randomBetween(-40, 40), namedHouseOptions("Wyndhelm Barracks")),
      makeTallHouse("wyndhelm-church", cx + randomBetween(-40, 40), cy - 760 + randomBetween(-34, 34), namedHouseOptions("Wyndhelm Church")),
      ...[1, 2, 3].map(index => makeHouse(
        `wyndhelm-house-${index}`,
        houseSlots[index - 1].x,
        houseSlots[index - 1].y,
        340,
        270,
        namedHouseOptions(`Wyndhelm House ${index}`)
      ))
    ];
    const obstacles = [{
      x: cx,
      y: cy,
      radius: 38,
      kind: "ruined-statue"
    }];
    const vegetationPlan = [
      { kind: "dead-tree", count: 24, minRadius: 18, maxRadius: 36 },
      { kind: "bush", count: 18, minRadius: 13, maxRadius: 24 },
      { kind: "tumbleweed", count: 16, minRadius: 12, maxRadius: 22 }
    ];
    let attempts = 0;
    for (const entry of vegetationPlan) {
      let placedCount = 0;
      while (placedCount < entry.count && attempts < 2400) {
        attempts += 1;
        const obstacle = {
          x: randomBetween(cx - wyndhelm.width * 0.42, cx + wyndhelm.width * 0.42),
          y: randomBetween(cy - wyndhelm.height * 0.42, cy + wyndhelm.height * 0.42),
          radius: randomBetween(entry.minRadius, entry.maxRadius),
          kind: entry.kind
        };
        if (!isPointInBoundary(obstacle.x, obstacle.y, wyndhelm.boundary)) continue;
        if (Math.hypot(obstacle.x - cx, obstacle.y - cy) < obstacle.radius + 115) continue;
        if (passages.some(passage => pointInPassage(obstacle.x, obstacle.y, passage, obstacle.radius + 30))) continue;
        if (houses.some(house => rectCollidesCircle(houseCollisionBounds(house, 80), obstacle.x, obstacle.y, obstacle.radius))) continue;
        if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 42)) continue;
        obstacles.push(obstacle);
        placedCount += 1;
      }
    }
    return { houses, obstacles };
  }
  
  function randomFenVegetationKind() {
    const roll = Math.random();
    if (roll < 0.16) return "weeping-willow";
    if (roll < 0.46) return "pine-tree";
    if (roll < 0.70) return "dead-tree";
    if (roll < 0.88) return "bush";
    return "boulder";
  }
  
  function randomAreaObstacleKind(area) {
    const roll = Math.random();
    if (area.name === AREA_NAME || area.name === GLADE_AREA_NAME) {
      if (roll < area.treeChance) return "summer-tree";
      if (roll < area.treeChance + 0.18) return "summer-bush";
      return "boulder";
    }
    return roll < area.treeChance ? "tree" : "boulder";
  }
  
  function makeCrowingFieldObstacles(area, river) {
    const obstacles = [];
    const plan = [
      { kind: "dead-tree", count: 24 },
      { kind: "pine-tree", count: 22 },
      { kind: "autumn-tree", count: 20 },
      { kind: "bush", count: 18 },
      { kind: "autumn-bush", count: 16 },
      { kind: "boulder", count: 34 }
    ];
    let attempts = 0;
    for (const entry of plan) {
      let placed = 0;
      while (placed < entry.count && attempts < 4200) {
        attempts += 1;
        const obstacle = {
          x: randomBetween(area.center.x - area.width * 0.46, area.center.x + area.width * 0.46),
          y: randomBetween(area.center.y - area.height * 0.46, area.center.y + area.height * 0.46),
          radius: entry.kind === "boulder" ? randomBetween(16, 30) : randomBetween(18, 40),
          kind: entry.kind
        };
        if (!isPointInBoundary(obstacle.x, obstacle.y, area.boundary)) continue;
        if (river.some(segment => pointInPuddle(obstacle.x, obstacle.y, segment, obstacle.radius + 22))) continue;
        if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 58)) continue;
        obstacles.push(obstacle);
        placed += 1;
      }
    }
    return obstacles;
  }
  
  function makeCrowingRiver(area, count) {
    const angle = randomBetween(-0.32, 0.32);
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };
    const tangent = { x: -dir.y, y: dir.x };
    const riverLength = Math.hypot(area.width, area.height) * 1.18;
    const points = [];
    const pointCount = Math.max(7, Math.min(13, Math.floor(count / 3)));
    let drift = randomBetween(-90, 90);
    for (let i = 0; i < pointCount; i += 1) {
      const t = pointCount === 1 ? 0 : i / (pointCount - 1);
      const along = (t - 0.5) * riverLength;
      drift += randomBetween(-75, 75);
      const wave = Math.sin(t * Math.PI * 3.4 + randomBetween(-0.24, 0.24)) * 210 + drift;
      points.push({
        x: area.center.x + dir.x * along + tangent.x * wave,
        y: area.center.y + dir.y * along + tangent.y * wave
      });
    }
    const width = randomBetween(135, 185);
    const bounds = {
      minX: Math.min(...points.map(point => point.x)) - width / 2,
      minY: Math.min(...points.map(point => point.y)) - width / 2,
      maxX: Math.max(...points.map(point => point.x)) + width / 2,
      maxY: Math.max(...points.map(point => point.y)) + width / 2
    };
    return [{
      kind: "river",
      areaName: area.name,
      x: area.center.x,
      y: area.center.y,
      width,
      points,
      bounds
    }];
  }

  function makeCrowingRiverMudBanks(rivers) {
    return (rivers || []).map(river => {
      const width = (river.width || 150) + 96;
      return {
        kind: "mud-bank",
        areaName: river.areaName,
        x: river.x,
        y: river.y,
        width,
        points: river.points,
        bounds: {
          minX: river.bounds.minX - 48,
          minY: river.bounds.minY - 48,
          maxX: river.bounds.maxX + 48,
          maxY: river.bounds.maxY + 48
        }
      };
    });
  }

  function makeKebaanWastes(wastes) {
    const ruins = makeRuinsOfKebaan(wastes);
    const chooseOasisCenter = () => {
      const ruinsCenter = {
        x: ruins.bounds.x + ruins.bounds.w / 2,
        y: ruins.bounds.y + ruins.bounds.h / 2
      };
      const clearanceFromRuins = point => {
        const dx = Math.max(ruins.bounds.x - point.x, 0, point.x - (ruins.bounds.x + ruins.bounds.w));
        const dy = Math.max(ruins.bounds.y - point.y, 0, point.y - (ruins.bounds.y + ruins.bounds.h));
        return Math.hypot(dx, dy);
      };
      const fitsWastes = point => {
        if (!point) return false;
        const corners = rectangleBoundary(point.x, point.y, 2450, 1850);
        return corners.every(corner => isPointInBoundary(corner.x, corner.y, wastes.boundary));
      };
      const sideX = ruinsCenter.x < wastes.center.x ? 1 : -1;
      const sideY = ruinsCenter.y < wastes.center.y ? 1 : -1;
      let best = null;
      const consider = point => {
        if (!fitsWastes(point)) return;
        const score = clearanceFromRuins(point);
        if (!best || score > best.score) best = { point, score };
      };
      for (let attempt = 0; attempt < 1600; attempt += 1) {
        consider({
          x: randomBetween(wastes.center.x - wastes.width * 0.48, wastes.center.x + wastes.width * 0.48),
          y: randomBetween(wastes.center.y - wastes.height * 0.48, wastes.center.y + wastes.height * 0.48)
        });
        if (best?.score >= 2100) return best.point;
      }
      const fallbacks = [
        { x: wastes.center.x + sideX * wastes.width * 0.38, y: wastes.center.y + sideY * wastes.height * 0.32 },
        { x: wastes.center.x + sideX * wastes.width * 0.42, y: wastes.center.y - sideY * wastes.height * 0.24 },
        { x: wastes.center.x - sideX * wastes.width * 0.36, y: wastes.center.y + sideY * wastes.height * 0.31 },
        { x: wastes.center.x + sideX * wastes.width * 0.27, y: wastes.center.y + sideY * wastes.height * 0.22 },
        { x: wastes.center.x + sideX * wastes.width * 0.32, y: wastes.center.y - sideY * wastes.height * 0.2 },
        { x: wastes.center.x - sideX * wastes.width * 0.28, y: wastes.center.y + sideY * wastes.height * 0.25 }
      ];
      fallbacks.forEach(consider);
      return best?.point || wastes.center;
    };
    const center = chooseOasisCenter();
    const oasisArea = makeArea(KEBAAN_OASIS_AREA_NAME, center.x, center.y, 1750, 1250, 0, { min: 12, max: 15 }, "None", 0.42);
    const wobble = Array.from({ length: 32 }, () => randomBetween(0.82, 1.18));
    const oasisWater = {
      kind: "oasis-water",
      areaName: KEBAAN_OASIS_AREA_NAME,
      x: center.x + randomBetween(-70, 70),
      y: center.y + randomBetween(-50, 50),
      rx: randomBetween(430, 560),
      ry: randomBetween(255, 350),
      wobble
    };
    const oasisGround = {
      kind: "oasis-ground",
      areaName: KEBAAN_OASIS_AREA_NAME,
      x: oasisWater.x,
      y: oasisWater.y,
      rx: oasisWater.rx + 330,
      ry: oasisWater.ry + 255,
      wobble: [...wobble],
      bounds: {
        minX: oasisWater.x - oasisWater.rx - 390,
        minY: oasisWater.y - oasisWater.ry - 315,
        maxX: oasisWater.x + oasisWater.rx + 390,
        maxY: oasisWater.y + oasisWater.ry + 315
      }
    };
    const obstacles = [];
    const addObstacle = obstacle => {
      if (obstacles.some(existing => distance(obstacle, existing) < obstacle.radius + existing.radius + 42)) return false;
      obstacles.push(obstacle);
      return true;
    };
    const desertPlan = [
      { kind: "red-boulder", count: 70, minRadius: 15, maxRadius: 42 },
      { kind: "tumbleweed", count: 58, minRadius: 10, maxRadius: 23 },
      { kind: "desert-ruin", count: 22, minRadius: 28, maxRadius: 62 },
      { kind: "cactus", count: 54, minRadius: 12, maxRadius: 30 },
      { kind: "dead-tree", count: 36, minRadius: 18, maxRadius: 36 }
    ];
    let attempts = 0;
    for (const entry of desertPlan) {
      let placed = 0;
      while (placed < entry.count && attempts < 8500) {
        attempts += 1;
        const obstacle = {
          x: randomBetween(wastes.center.x - wastes.width * 0.47, wastes.center.x + wastes.width * 0.47),
          y: randomBetween(wastes.center.y - wastes.height * 0.47, wastes.center.y + wastes.height * 0.47),
          radius: randomBetween(entry.minRadius, entry.maxRadius),
          kind: entry.kind
        };
        if (!isPointInBoundary(obstacle.x, obstacle.y, wastes.boundary)) continue;
        if (isPointInBoundary(obstacle.x, obstacle.y, oasisArea.boundary)) continue;
        if (pointInPuddle(obstacle.x, obstacle.y, oasisGround, obstacle.radius + 34)) continue;
        if (rectCollidesCircle(ruins.bounds, obstacle.x, obstacle.y, obstacle.radius + 90)) continue;
        if (!addObstacle(obstacle)) continue;
        placed += 1;
      }
    }
    const oasisPlan = [
      { kind: "palm-tree", count: 18, minRadius: 18, maxRadius: 34 },
      { kind: "tropical-tree", count: 14, minRadius: 18, maxRadius: 36 }
    ];
    attempts = 0;
    for (const entry of oasisPlan) {
      let placed = 0;
      while (placed < entry.count && attempts < 2600) {
        attempts += 1;
        const angle = randomBetween(0, Math.PI * 2);
        const distanceScale = randomBetween(0.55, 0.98);
        const obstacle = {
          x: oasisGround.x + Math.cos(angle) * oasisGround.rx * distanceScale * randomBetween(0.72, 1.04),
          y: oasisGround.y + Math.sin(angle) * oasisGround.ry * distanceScale * randomBetween(0.72, 1.04),
          radius: randomBetween(entry.minRadius, entry.maxRadius),
          kind: entry.kind
        };
        if (!isPointInBoundary(obstacle.x, obstacle.y, oasisArea.boundary)) continue;
        if (pointInPuddle(obstacle.x, obstacle.y, oasisWater, obstacle.radius + 26)) continue;
        if (!addObstacle(obstacle)) continue;
        placed += 1;
      }
    }
    return { oasisArea, oasisWater, oasisGround, ruins, obstacles };
  }

  function makeRuinsOfKebaan(wastes) {
    const gridW = 56;
    const gridH = 42;
    const cell = 72;
    const wall = 40;
    const verticalWall = 54;
    const footprintW = gridW * cell;
    const footprintH = gridH * cell;
    let center = null;
    const fitsFootprint = candidate => {
      const corners = rectangleBoundary(candidate.x, candidate.y, footprintW + 300, footprintH + 300);
      return corners.every(point => isPointInBoundary(point.x, point.y, wastes.boundary));
    };
    for (let attempt = 0; attempt < 260 && !center; attempt += 1) {
      const candidate = randomPointInArea(wastes, wastes.width * 0.34, wastes.height * 0.34);
      if (!candidate) continue;
      if (!fitsFootprint(candidate)) continue;
      center = candidate;
    }
    if (!center) {
      const fallbacks = [
        { x: wastes.center.x + wastes.width * 0.18, y: wastes.center.y - wastes.height * 0.18 },
        { x: wastes.center.x - wastes.width * 0.18, y: wastes.center.y + wastes.height * 0.18 },
        { x: wastes.center.x, y: wastes.center.y }
      ];
      center = fallbacks.find(fitsFootprint) || wastes.center;
    }
    const origin = {
      x: center.x - footprintW / 2,
      y: center.y - footprintH / 2
    };
    const occupied = new Set();
    const rooms = [];
    const mark = (x, y) => {
      if (x < 1 || y < 1 || x >= gridW - 1 || y >= gridH - 1) return;
      occupied.add(`${x},${y}`);
    };
    const carveRect = (x, y, w, h) => {
      for (let yy = y; yy < y + h; yy += 1) {
        for (let xx = x; xx < x + w; xx += 1) mark(xx, yy);
      }
    };
    const rectsOverlapCells = (a, b, pad = 1) => a.x - pad < b.x + b.w
      && a.x + a.w + pad > b.x
      && a.y - pad < b.y + b.h
      && a.y + a.h + pad > b.y;
    const addRoom = room => {
      if (room.x < 2 || room.y < 2 || room.x + room.w > gridW - 2 || room.y + room.h > gridH - 2) return false;
      if (rooms.some(existing => rectsOverlapCells(room, existing, 2))) return false;
      rooms.push(room);
      carveRect(room.x, room.y, room.w, room.h);
      return true;
    };
    addRoom({ x: 20, y: 16, w: 14, h: 9, id: "grand-hall" });
    addRoom({ x: 5, y: 5, w: 8, h: 6, id: "northwest-hall" });
    addRoom({ x: 42, y: 5, w: 9, h: 7, id: "northeast-hall" });
    addRoom({ x: 4, y: 30, w: 10, h: 7, id: "southwest-hall" });
    addRoom({ x: 40, y: 30, w: 11, h: 7, id: "southeast-hall" });
    let attempts = 0;
    while (rooms.length < 28 && attempts < 1200) {
      attempts += 1;
      addRoom({
        x: randomInt(3, gridW - 12),
        y: randomInt(3, gridH - 10),
        w: randomInt(4, 10),
        h: randomInt(3, 8),
        id: `room-${rooms.length + 1}`
      });
    }
    const centerCell = room => ({
      x: Math.floor(room.x + room.w / 2),
      y: Math.floor(room.y + room.h / 2)
    });
    const carveHorizontal = (x1, x2, y, width = 2) => {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x += 1) {
        for (let offset = 0; offset < width; offset += 1) mark(x, y + offset);
      }
    };
    const carveVertical = (y1, y2, x, width = 2) => {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y <= maxY; y += 1) {
        for (let offset = 0; offset < width; offset += 1) mark(x + offset, y);
      }
    };
    const connectCells = (a, b, width = 2) => {
      if (Math.random() < 0.5) {
        carveHorizontal(a.x, b.x, a.y, width);
        carveVertical(a.y, b.y, b.x, width);
      } else {
        carveVertical(a.y, b.y, a.x, width);
        carveHorizontal(a.x, b.x, b.y, width);
      }
    };
    const connected = [rooms[0]];
    for (const room of rooms.slice(1)) {
      const from = connected.reduce((best, candidate) => {
        const d = Math.hypot(centerCell(room).x - centerCell(candidate).x, centerCell(room).y - centerCell(candidate).y);
        return d < best.distance ? { room: candidate, distance: d } : best;
      }, { room: connected[0], distance: Infinity }).room;
      connectCells(centerCell(from), centerCell(room), Math.random() < 0.28 ? 3 : 2);
      connected.push(room);
    }
    for (let index = 0; index < 14; index += 1) {
      const room = rooms[randomInt(0, rooms.length - 1)];
      const start = centerCell(room);
      const direction = randomInt(0, 3);
      const length = randomInt(6, 14);
      const end = {
        x: Math.max(2, Math.min(gridW - 4, start.x + (direction === 0 ? length : direction === 1 ? -length : randomInt(-5, 5)))),
        y: Math.max(2, Math.min(gridH - 4, start.y + (direction === 2 ? length : direction === 3 ? -length : randomInt(-5, 5))))
      };
      connectCells(start, end, 2);
      if (Math.random() < 0.62) carveRect(Math.max(2, end.x - 2), Math.max(2, end.y - 2), randomInt(3, 6), randomInt(3, 5));
    }
    const entranceSpecs = [
      { edge: "S", cell: [...occupied].map(key => key.split(",").map(Number)).sort((a, b) => b[1] - a[1])[0] },
      { edge: "N", cell: [...occupied].map(key => key.split(",").map(Number)).sort((a, b) => a[1] - b[1])[0] },
      { edge: "W", cell: [...occupied].map(key => key.split(",").map(Number)).sort((a, b) => a[0] - b[0])[0] },
      { edge: "E", cell: [...occupied].map(key => key.split(",").map(Number)).sort((a, b) => b[0] - a[0])[0] }
    ].filter(spec => spec.cell);
    const openEdges = new Set(entranceSpecs.map(spec => `${spec.cell[0]},${spec.cell[1]},${spec.edge}`));
    const edgeRects = [];
    const has = (x, y) => occupied.has(`${x},${y}`);
    for (const key of occupied) {
      const [x, y] = key.split(",").map(Number);
      if (!has(x, y - 1) && !openEdges.has(`${x},${y},N`)) edgeRects.push({ kind: "H", x, y, w: 1, h: 1 });
      if (!has(x, y + 1) && !openEdges.has(`${x},${y},S`)) edgeRects.push({ kind: "H", x, y: y + 1, w: 1, h: 1 });
      if (!has(x - 1, y) && !openEdges.has(`${x},${y},W`)) edgeRects.push({ kind: "V", x, y, w: 1, h: 1 });
      if (!has(x + 1, y) && !openEdges.has(`${x},${y},E`)) edgeRects.push({ kind: "V", x: x + 1, y, w: 1, h: 1 });
    }
    const mergeEdges = kind => {
      const groups = new Map();
      for (const edge of edgeRects.filter(edge => edge.kind === kind)) {
        const key = kind === "H" ? edge.y : edge.x;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(edge);
      }
      const merged = [];
      for (const [key, edges] of groups) {
        edges.sort((a, b) => (kind === "H" ? a.x - b.x : a.y - b.y));
        let start = kind === "H" ? edges[0].x : edges[0].y;
        let previous = start;
        for (let i = 1; i <= edges.length; i += 1) {
          const current = edges[i] ? (kind === "H" ? edges[i].x : edges[i].y) : null;
          if (current === previous + 1) {
            previous = current;
            continue;
          }
          if (kind === "H") {
            merged.push({
              x: origin.x + start * cell,
              y: origin.y + key * cell - wall / 2,
              w: (previous - start + 1) * cell,
              h: wall,
              orientation: "H"
            });
          } else {
            merged.push({
              x: origin.x + key * cell - verticalWall / 2,
              y: origin.y + start * cell,
              w: verticalWall,
              h: (previous - start + 1) * cell + 18,
              orientation: "V"
            });
          }
          start = current;
          previous = current;
        }
      }
      return merged;
    };
    const wallRects = [...mergeEdges("H"), ...mergeEdges("V")];
    const roofRects = wallRects.map(rect => rect.orientation === "H"
      ? { x: rect.x - 6, y: rect.y - 34, w: rect.w + 12, h: 42 }
      : { x: rect.x + 1, y: rect.y - 54, w: rect.w, h: rect.h + 24 });
    const wallObstacles = wallRects.map(rect => ({
      kind: "ruins-wall",
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2,
      w: rect.w,
      h: rect.h,
      areaName: RUINS_OF_KEBAAN_AREA_NAME
    }));
    const areas = [];
    const occupiedByRow = new Map();
    for (const key of occupied) {
      const [x, y] = key.split(",").map(Number);
      if (!occupiedByRow.has(y)) occupiedByRow.set(y, []);
      occupiedByRow.get(y).push(x);
    }
    for (const [y, xs] of occupiedByRow) {
      xs.sort((a, b) => a - b);
      let start = xs[0];
      let previous = xs[0];
      for (let i = 1; i <= xs.length; i += 1) {
        const current = xs[i];
        if (current === previous + 1) {
          previous = current;
          continue;
        }
        const w = previous - start + 1;
        areas.push(makeDungeonRoom(
          RUINS_OF_KEBAAN_AREA_NAME,
          null,
          origin.x + (start + w / 2) * cell,
          origin.y + (y + 0.5) * cell,
          w * cell,
          cell,
          "desert-ruins-floor"
        ));
        start = current;
        previous = current;
      }
    }
    const minX = origin.x + Math.min(...[...occupied].map(key => Number(key.split(",")[0]))) * cell;
    const minY = origin.y + Math.min(...[...occupied].map(key => Number(key.split(",")[1]))) * cell;
    const maxX = origin.x + (Math.max(...[...occupied].map(key => Number(key.split(",")[0]))) + 1) * cell;
    const maxY = origin.y + (Math.max(...[...occupied].map(key => Number(key.split(",")[1]))) + 1) * cell;
    return {
      areas,
      wallRects,
      roofRects,
      wallObstacles,
      entrances: entranceSpecs.map(spec => ({
        side: spec.edge,
        x: origin.x + (spec.cell[0] + 0.5) * cell,
        y: origin.y + (spec.cell[1] + 0.5) * cell
      })),
      bounds: { x: minX - 180, y: minY - 180, w: maxX - minX + 360, h: maxY - minY + 360 }
    };
  }

  function randomPointInArea(area, xRange = area.width * 0.4, yRange = area.height * 0.4) {
    for (let attempt = 0; attempt < 260; attempt += 1) {
      const point = {
        x: randomBetween(area.center.x - xRange, area.center.x + xRange),
        y: randomBetween(area.center.y - yRange, area.center.y + yRange)
      };
      if (isPointInBoundary(point.x, point.y, area.boundary)) return point;
    }
    return null;
  }

  function makeHouse(id, cx, cy, w = 340, h = 270, options = {}) {
    const wall = 32;
    const horizontalWall = 54;
    const door = 76;
    const left = cx - w / 2;
    const top = cy - h / 2;
    const bottom = top + h;
    const defaultSide = options.entranceSide || "south";
    const entranceSpecs = options.entrances || (options.farDoor
      ? [{ side: "south", offset: 0 }, { side: "north", offset: 0 }]
      : [{ side: defaultSide, offset: 0 }]);
    const doorRects = entranceSpecs.map(spec => {
      const side = spec.side === "north" ? "north" : "south";
      const x = cx + (spec.offset || 0) - door / 2;
      return {
        side,
        x,
        y: side === "north" ? top - 16 : bottom - horizontalWall - 6,
        w: door,
        h: horizontalWall + 16
      };
    });
    const horizontalBlocks = side => {
      const y = side === "north" ? top : bottom - horizontalWall;
      const gaps = doorRects
        .filter(rect => rect.side === side)
        .map(rect => ({ left: rect.x, right: rect.x + rect.w }))
        .sort((a, b) => a.left - b.left);
      const blocks = [];
      let cursor = left;
      for (const gap of gaps) {
        if (gap.left > cursor) blocks.push({ x: cursor, y, w: gap.left - cursor, h: horizontalWall });
        cursor = Math.max(cursor, gap.right);
      }
      if (cursor < left + w) blocks.push({ x: cursor, y, w: left + w - cursor, h: horizontalWall });
      return blocks;
    };
    const outsideDoors = doorRects.map(rect => ({
      x: rect.x + rect.w / 2,
      y: rect.side === "north" ? top - 54 : bottom + 54
    }));
    const entrances = doorRects.map(rect => ({
      x: rect.x + rect.w / 2,
      y: rect.side === "north" ? top + horizontalWall / 2 - 8 : bottom - horizontalWall / 2 + 8
    }));
    return {
      id,
      label: options.label || options.name || id,
      metadata: options.metadata || null,
      kind: options.kind || "house",
      roofTexture: options.roofTexture || "houseRoof",
      floorTexture: options.floorTexture || "houseFloor",
      wallTexture: options.wallTexture || "houseWall",
      wallDarken: Number(options.wallDarken) || 0,
      x: cx,
      y: cy,
      w,
      h,
      wall,
      horizontalWall,
      door,
      interior: { x: left + wall, y: top + horizontalWall, w: w - wall * 2, h: h - horizontalWall * 2 },
      floor: { x: left + wall, y: top + horizontalWall, w: w - wall * 2, h: h - horizontalWall },
      doorRects,
      doorRect: doorRects[0],
      farDoorRect: doorRects[1] || null,
      blocks: [
        ...horizontalBlocks("north"),
        { x: left, y: top, w: wall, h },
        { x: left + w - wall, y: top, w: wall, h },
        ...horizontalBlocks("south")
      ],
      roof: { x: left, y: top, w, h: h - horizontalWall },
      entrances,
      entrance: entrances[0],
      outsideDoors,
      outsideDoor: outsideDoors[0],
      playerStart: { x: cx, y: cy + 18 },
      shopSpot: { x: cx, y: cy + 8 }
    };
  }

  function obstacleIntersectsDoorCorridor(obstacle, start, end, clearance = 78) {
    if (!obstacle || !start || !end) return false;
    if (obstacle.kind === "city-building" || obstacle.kind === "ruins-wall") return false;
    if (obstacle.kind === "whisperspring-entrance") return false;
    const radius = Number(obstacle.radius) || Math.max(Number(obstacle.w) || 0, Number(obstacle.h) || 0, Number(obstacle.size) || 0) / 2 || 24;
    if (!Number.isFinite(obstacle.x) || !Number.isFinite(obstacle.y)) return false;
    const corridorHit = distancePointToSegment(obstacle.x, obstacle.y, start.x, start.y, end.x, end.y) <= radius + clearance;
    const doorstepHit = Math.hypot(obstacle.x - end.x, obstacle.y - end.y) <= radius + clearance * 1.15;
    return corridorHit || doorstepHit;
  }

  function clearBlockedHouseEntrances(obstacles = [], houses = []) {
    for (let index = obstacles.length - 1; index >= 0; index -= 1) {
      const obstacle = obstacles[index];
      const blocksDoor = (houses || []).some(house => {
        const entrances = house.entrances || [house.entrance].filter(Boolean);
        const outsideDoors = house.outsideDoors || [house.outsideDoor].filter(Boolean);
        return outsideDoors.some((outsideDoor, doorIndex) => {
          const entrance = entrances[doorIndex] || house.entrance || outsideDoor;
          return obstacleIntersectsDoorCorridor(obstacle, entrance, outsideDoor);
        });
      });
      if (blocksDoor) obstacles.splice(index, 1);
    }
  }
  
  function makeLonghouse(id, cx, cy, options = {}) {
    const w = options.w || 720;
    const entranceSide = options.entranceSide || "south";
    return makeHouse(id, cx, cy, w, options.h || 270, {
      ...options,
      kind: options.kind || "longhouse",
      entrances: options.entrances || [
        { side: entranceSide, offset: -w * 0.24 },
        { side: entranceSide, offset: w * 0.24 }
      ]
    });
  }
  
  function makeTallHouse(id, cx, cy, options = {}) {
    return makeHouse(id, cx, cy, options.w || 340, options.h || 540, { ...options, kind: "tall-house", farDoor: true });
  }
  
  function makeNorthEntranceHouse(id, cx, cy, options = {}) {
    return makeHouse(id, cx, cy, options.w || 340, options.h || 270, { ...options, kind: "house-north", entranceSide: "north" });
  }
  
  function makeNorthEntranceLonghouse(id, cx, cy, options = {}) {
    return makeLonghouse(id, cx, cy, { ...options, kind: "longhouse-north", entranceSide: "north" });
  }
  
  function makeLHouse(id, cx, cy, options = {}) {
    const cellW = options.cellW || 340;
    const cellH = options.cellH || 270;
    const wall = 32;
    const horizontalWall = 54;
    const door = 76;
    const left = cx - cellW;
    const top = cy - cellH;
    const midX = cx;
    const midY = cy;
    const right = cx + cellW;
    const bottom = cy + cellH;
    const bottomLeftDoorRect = { side: "south", x: left + cellW / 2 - door / 2, y: bottom - horizontalWall - 6, w: door, h: horizontalWall + 16 };
    const topRightDoorRect = { side: "south", x: midX + cellW / 2 - door / 2, y: midY - 6, w: door, h: horizontalWall + 16 };
    const doorRects = [bottomLeftDoorRect, topRightDoorRect];
    const entrances = [
      { x: bottomLeftDoorRect.x + door / 2, y: bottom - horizontalWall / 2 + 8 },
      { x: topRightDoorRect.x + door / 2, y: midY + horizontalWall / 2 + 8 }
    ];
    const outsideDoors = [
      { x: bottomLeftDoorRect.x + door / 2, y: bottom + 54 },
      { x: topRightDoorRect.x + door / 2, y: midY + horizontalWall + 54 }
    ];
    const gappedBlocks = (x, y, w, gap) => [
      { x, y, w: gap.x - x, h: horizontalWall },
      { x: gap.x + gap.w, y, w: x + w - (gap.x + gap.w), h: horizontalWall }
    ].filter(block => block.w > 0);
    const interiors = [
      { x: left + wall, y: top + horizontalWall, w: cellW * 2 - wall * 2, h: cellH - horizontalWall },
      { x: left + wall, y: midY, w: cellW - wall * 2, h: cellH - horizontalWall }
    ];
    const floors = [
      { x: left + wall, y: top + horizontalWall, w: cellW * 2 - wall * 2, h: cellH },
      { x: left + wall, y: midY, w: cellW - wall * 2, h: cellH }
    ];
    return {
      id,
      label: options.label || options.name || id,
      metadata: options.metadata || null,
      kind: "l-house",
      roofTexture: options.roofTexture || "houseRoof",
      floorTexture: options.floorTexture || "houseFloor",
      wallTexture: options.wallTexture || "houseWall",
      wallDarken: Number(options.wallDarken) || 0,
      x: cx,
      y: cy,
      w: cellW * 2,
      h: cellH * 2,
      wall,
      horizontalWall,
      door,
      interiors,
      interior: interiors[0],
      floors,
      floor: floors[0],
      doorRects,
      doorRect: doorRects[0],
      farDoorRect: doorRects[1],
      blocks: [
        { x: left, y: top, w: cellW * 2, h: horizontalWall },
        { x: left, y: top, w: wall, h: cellH * 2 },
        { x: right - wall, y: top, w: wall, h: cellH },
        { x: midX - wall, y: midY, w: wall, h: cellH },
        ...gappedBlocks(midX, midY, cellW, topRightDoorRect),
        ...gappedBlocks(left, bottom - horizontalWall, cellW, bottomLeftDoorRect)
      ],
      roofs: [
        { x: left, y: top, w: cellW, h: cellH * 2 - horizontalWall },
        { x: midX, y: top, w: cellW, h: cellH }
      ],
      roof: {
        x: cx - cellW,
        y: cy - cellH,
        w: cellW * 2,
        h: cellH * 2
      },
      entrances,
      entrance: entrances[0],
      outsideDoors,
      outsideDoor: outsideDoors[0],
      playerStart: { x: cx - cellW / 2, y: cy + cellH / 2 + 18 },
      shopSpot: { x: cx - cellW / 2, y: cy + cellH / 2 + 8 }
    };
  }
  
  function makeCircularHouse(id, cx, cy, diameter = 330, options = {}) {
    const radius = diameter / 2;
    const wall = options.wall || 34;
    const door = options.door || 78;
    const entranceAngles = (options.entranceAngles || [Math.PI / 2]).map(angle => (angle + Math.PI * 2) % (Math.PI * 2));
    const entranceGap = Number(options.entranceGap ?? 0.24);
    const blockCount = Math.max(12, Math.floor(options.blockCount || 28));
    const blockWidth = wall * 1.32;
    const blockHeight = wall * 2.32;
    const wallRadius = radius - wall * 0.32;
    const blocks = [];
    for (let i = 0; i < blockCount; i += 1) {
      const angle = (i / blockCount) * Math.PI * 2;
      const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
      if (entranceAngles.some(entranceAngle => Math.abs(Math.atan2(Math.sin(normalized - entranceAngle), Math.cos(normalized - entranceAngle))) < entranceGap)) continue;
      blocks.push({
        x: cx + Math.cos(angle) * wallRadius - blockWidth / 2,
        y: cy + Math.sin(angle) * wallRadius - blockHeight / 2,
        w: blockWidth,
        h: blockHeight
      });
    }
    const roofLeft = Math.min(...blocks.map(block => block.x));
    const roofRight = Math.max(...blocks.map(block => block.x + block.w));
    const topWallY = Math.min(...blocks.map(block => block.y));
    const bottomWallY = Math.max(...blocks.map(block => block.y));
    const roofRadius = Math.max(
      Math.abs(cx - roofLeft),
      Math.abs(roofRight - cx),
      Math.abs(cy - topWallY),
      Math.abs(bottomWallY - cy)
    );
    const floorRadius = Math.max(...blocks.map(block => block.y + block.h - cy));
    const roofOffsetY = -blockHeight * 0.72;
    const doorRects = entranceAngles.map(angle => {
      const x = cx + Math.cos(angle) * (radius - wall / 2) - door / 2;
      const y = cy + Math.sin(angle) * (radius - wall / 2) - (wall + 34) / 2;
      return { angle, x, y, w: door, h: wall + 34 };
    });
    const entrances = entranceAngles.map(angle => ({
      x: cx + Math.cos(angle) * (radius - wall / 2 + 8),
      y: cy + Math.sin(angle) * (radius - wall / 2 + 8)
    }));
    const outsideDoors = entranceAngles.map(angle => ({
      x: cx + Math.cos(angle) * (radius + 54),
      y: cy + Math.sin(angle) * (radius + 54)
    }));
    return {
      id,
      label: options.label || options.name || id,
      metadata: options.metadata || null,
      kind: "circular",
      roofTexture: options.roofTexture || "circularHouseRoof",
      floorTexture: options.floorTexture || "houseFloor",
      wallTexture: options.wallTexture || "houseWall",
      x: cx,
      y: cy,
      w: diameter,
      h: diameter,
      radius,
      wall,
      door,
      interior: { x: cx, y: cy, radius: Math.max(20, radius - wall) },
      floor: { x: cx, y: cy, radius: floorRadius },
      doorRects,
      doorRect: doorRects[0],
      blocks,
      roof: { x: cx - roofRadius, y: cy - roofRadius + roofOffsetY, w: roofRadius * 2, h: roofRadius * 2, radius: roofRadius },
      entrances,
      entrance: entrances[0],
      outsideDoors,
      outsideDoor: outsideDoors[0],
      playerStart: { x: cx, y: cy + 8 },
      shopSpot: { x: cx, y: cy + 4 }
    };
  }
  
  function pointInsideHouse(house, x, y, padding = 0) {
    const doorRects = house?.doorRects || [house?.doorRect, house?.farDoorRect].filter(Boolean);
    if (house?.kind === "circular") {
      const interiorRadius = (house.interior?.radius || house.radius || 1) + padding;
      return Math.hypot(x - house.x, y - house.y) <= interiorRadius
        || doorRects.some(rect => rectContainsPoint(rect, x, y, padding));
    }
    const interiors = house?.interiors || [house?.interior].filter(Boolean);
    return interiors.some(interior => rectContainsPoint(interior, x, y, padding))
      || doorRects.some(rect => rectContainsPoint(rect, x, y, padding));
  }
  
  function pointCollidesHouseWalls(x, y, radius, houses = []) {
    return houses.some(house => (house.blocks || []).some(block => rectCollidesCircle(block, x, y, radius)));
  }
  
  function houseCollisionBounds(house, padding = 0) {
    const blocks = house?.blocks || [];
    if (!blocks.length) {
      return {
        x: house.x - house.w / 2 - padding,
        y: house.y - house.h / 2 - padding,
        w: house.w + padding * 2,
        h: house.h + padding * 2
      };
    }
    const minX = Math.min(...blocks.map(block => block.x));
    const minY = Math.min(...blocks.map(block => block.y));
    const maxX = Math.max(...blocks.map(block => block.x + block.w));
    const maxY = Math.max(...blocks.map(block => block.y + block.h));
    return { x: minX - padding, y: minY - padding, w: maxX - minX + padding * 2, h: maxY - minY + padding * 2 };
  }
  
  function makeStartingHomestead(area, areas, passages) {
    const layouts = [
      { shop: { x: 430, y: 26 }, trainer: { x: 232, y: 326 }, gvada: { x: 0, y: 250 } },
      { shop: { x: -430, y: 26 }, trainer: { x: -232, y: 326 }, gvada: { x: 0, y: 250 } },
      { shop: { x: 408, y: -18 }, trainer: { x: 224, y: 306 }, gvada: { x: 0, y: 250 } },
      { shop: { x: -408, y: -18 }, trainer: { x: -224, y: 306 }, gvada: { x: 0, y: 250 } }
    ];
    for (let attempt = 0; attempt < 220; attempt += 1) {
      const cx = randomBetween(area.center.x - area.width * 0.26, area.center.x + area.width * 0.26);
      const cy = randomBetween(area.center.y - area.height * 0.22, area.center.y + area.height * 0.22);
      const layout = layouts[Math.floor(randomBetween(0, layouts.length))];
      const playerHouse = makeHouse("player-house", cx, cy);
      const shopHouse = makeHouse("billiam-shop", cx + layout.shop.x, cy + layout.shop.y);
      const gvadaSpot = { x: playerHouse.x + layout.gvada.x, y: playerHouse.outsideDoor.y };
      const trainerSpot = { x: shopHouse.x + layout.trainer.x, y: shopHouse.y + layout.trainer.y };
      const guardSpot = makeStartingGuardSpot(playerHouse, layout);
      const points = [
        playerHouse.playerStart,
        playerHouse.outsideDoor,
        shopHouse.shopSpot,
        shopHouse.outsideDoor,
        gvadaSpot,
        trainerSpot,
        guardSpot
      ];
      const corners = [playerHouse, shopHouse].flatMap(house => rectangleBoundary(house.x, house.y, house.w + 180, house.h + 180));
      const allPoints = [...points, ...corners];
      if (!allPoints.every(point => areaAt(point.x, point.y, { areas, passages })?.name === AREA_NAME)) continue;
      if (points.some(point => pointInAnyPassage(point.x, point.y, passages, 160))) continue;
      if (distance(playerHouse, shopHouse) < 360) continue;
      return {
        houses: [playerHouse, shopHouse],
        playerStart: playerHouse.playerStart,
        gvada: { name: "Gvada", x: gvadaSpot.x, y: gvadaSpot.y, radius: 16, spoken: false },
        shopkeeper: applyNpcShopInventory({
          name: "Shopkeeper Billiam",
          x: shopHouse.shopSpot.x,
          y: shopHouse.shopSpot.y,
          radius: 18,
          companionRange: 5
        }),
        trainer: { name: "Soulreaper Trainer", x: trainerSpot.x, y: trainerSpot.y, radius: 16 },
        guard: guardSpot
      };
    }
    const playerHouse = makeHouse("player-house", area.center.x, area.center.y);
    const shopHouse = makeHouse("billiam-shop", area.center.x + 430, area.center.y + 26);
    return {
      houses: [playerHouse, shopHouse],
      playerStart: playerHouse.playerStart,
      gvada: { name: "Gvada", x: playerHouse.outsideDoor.x, y: playerHouse.outsideDoor.y, radius: 16, spoken: false },
      shopkeeper: applyNpcShopInventory({
        name: "Shopkeeper Billiam",
        x: shopHouse.shopSpot.x,
        y: shopHouse.shopSpot.y,
        radius: 18,
        companionRange: 5
      }),
      trainer: { name: "Soulreaper Trainer", x: shopHouse.x + 232, y: shopHouse.y + 326, radius: 16 },
      guard: makeStartingGuardSpot(playerHouse, { shop: { x: 430 } })
    };
  }
  
  function makeStartingGuardSpot(playerHouse, layout) {
    const side = (layout?.shop?.x || 1) > 0 ? -1 : 1;
    return {
      x: playerHouse.outsideDoor.x + side * 96,
      y: playerHouse.outsideDoor.y + 72
    };
  }
  
  function makeStartingGuard(homestead) {
    if (!homestead?.guard) return null;
    return {
      name: "Guard Dorin",
      template: "Guard",
      lvl: 5,
      x: homestead.guard.x,
      y: homestead.guard.y,
      gold: "4D4",
      noWander: true
    };
  }
  
  function makeTheodoraSite(area, areas, passages, homestead = null) {
    const existingHouses = homestead?.houses || [];
    for (let attempt = 0; attempt < 260; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.39, area.center.x + area.width * 0.39);
      const y = randomBetween(area.center.y - area.height * 0.39, area.center.y + area.height * 0.39);
      const house = makeHouse("theodora-house", x, y, 340, 270, { roofTexture: "theodoraRoof" });
      const points = [
        house.shopSpot,
        house.outsideDoor,
        house.entrance,
        ...rectangleBoundary(house.x, house.y, house.w + 190, house.h + 190)
      ];
      if (!points.every(point => areaAt(point.x, point.y, { areas, passages })?.name === AREA_NAME)) continue;
      if (points.some(point => pointInAnyPassage(point.x, point.y, passages, 170))) continue;
      if (homestead?.playerStart && Math.hypot(house.x - homestead.playerStart.x, house.y - homestead.playerStart.y) < 900) continue;
      if (existingHouses.some(existing => rectCollidesCircle({
        x: existing.x - existing.w / 2 - 260,
        y: existing.y - existing.h / 2 - 260,
        w: existing.w + 520,
        h: existing.h + 520
      }, house.x, house.y, Math.max(house.w, house.h) * 0.62))) continue;
      return {
        houses: [house],
        theodora: {
          name: "Theodora",
          x: house.shopSpot.x,
          y: house.shopSpot.y,
          radius: 16
        }
      };
    }
    const fallbackX = area.center.x - area.width * 0.31;
    const fallbackY = area.center.y + area.height * 0.31;
    const house = makeHouse("theodora-house", fallbackX, fallbackY, 340, 270, { roofTexture: "theodoraRoof" });
    return {
      houses: [house],
      theodora: { name: "Theodora", x: house.shopSpot.x, y: house.shopSpot.y, radius: 16 }
    };
  }
  
  function makeGvada(area, areas, passages, homestead = null) {
    if (homestead?.gvada) return homestead.gvada;
    const spot = { x: 150, y: 75 };
    return {
      name: "Gvada",
      x: spot.x,
      y: spot.y,
      radius: 16,
      spoken: false
    };
  }
  
  function makeShopkeeper(area, areas, passages, homestead = null) {
    if (homestead?.shopkeeper) return homestead.shopkeeper;
    for (let attempt = 0; attempt < 160; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.36, area.center.x + area.width * 0.36);
      const y = randomBetween(area.center.y - area.height * 0.36, area.center.y + area.height * 0.36);
      if (Math.hypot(x, y) < 520) continue;
      if (!isPointInBoundary(x, y, area.boundary)) continue;
      if (pointInAnyPassage(x, y, passages, 120)) continue;
      if (areaAt(x, y, { areas, passages })?.name !== AREA_NAME) continue;
      return applyNpcShopInventory({
        name: "Shopkeeper Billiam",
        x,
        y,
        radius: 18,
        companionRange: 5
      });
    }
    return applyNpcShopInventory({
      name: "Shopkeeper Billiam",
      x: area.center.x + 520,
      y: area.center.y,
      radius: 18,
      companionRange: 5
    });
  }
  
  function makePleezix(shopkeeper, areas, passages, homestead = null) {
    if (!shopkeeper) return null;
    const oldPlayerHouse = homestead?.houses?.find(house => house.id === "player-house");
    if (oldPlayerHouse) {
      return {
        name: "Pleezix",
        x: oldPlayerHouse.shopSpot.x,
        y: oldPlayerHouse.shopSpot.y,
        radius: 15
      };
    }
    const minDistance = shopkeeper.radius + 42;
    const maxDistance = shopkeeper.companionRange * RANGE_UNIT - 34;
    const isValidPleezixSpot = (x, y) => areaAt(x, y, { areas, passages })?.name === AREA_NAME
      && !pointCollidesHouseWalls(x, y, 15, homestead?.houses || []);
    const preferredSpots = [
      { x: shopkeeper.x, y: shopkeeper.y - 70 },
      { x: shopkeeper.x - 70, y: shopkeeper.y - 34 },
      { x: shopkeeper.x + 70, y: shopkeeper.y - 34 },
      { x: shopkeeper.x - 76, y: shopkeeper.y + 18 },
      { x: shopkeeper.x + 76, y: shopkeeper.y + 18 }
    ];
    const preferred = preferredSpots.find(spot => isValidPleezixSpot(spot.x, spot.y));
    if (preferred) {
      return {
        name: "Pleezix",
        x: preferred.x,
        y: preferred.y,
        radius: 15
      };
    }
    for (let attempt = 0; attempt < 80; attempt += 1) {
      const angle = randomBetween(Math.PI, Math.PI * 2);
      const distanceFromShop = randomBetween(minDistance, maxDistance);
      const x = shopkeeper.x + Math.cos(angle) * distanceFromShop;
      const y = shopkeeper.y + Math.sin(angle) * distanceFromShop;
      if (!isValidPleezixSpot(x, y)) continue;
      return {
        name: "Pleezix",
        x,
        y,
        radius: 15
      };
    }
    const fallbackSpots = [
      { x: shopkeeper.x + maxDistance + 30, y: shopkeeper.y },
      { x: shopkeeper.x - maxDistance - 30, y: shopkeeper.y },
      { x: shopkeeper.x, y: shopkeeper.y - maxDistance - 30 }
    ];
    const fallback = fallbackSpots.find(spot => isValidPleezixSpot(spot.x, spot.y))
      || { x: shopkeeper.x + minDistance, y: shopkeeper.y + 20 };
    return {
      name: "Pleezix",
      x: fallback.x,
      y: fallback.y,
      radius: 15
    };
  }
  
  function makeSoulreaperTrainer(shopkeeper, areas, passages, homestead = null) {
    if (homestead?.trainer) return homestead.trainer;
    if (!shopkeeper) return null;
    const minDistance = shopkeeper.radius + 54;
    const maxDistance = shopkeeper.companionRange * RANGE_UNIT - 30;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const distanceFromShop = randomBetween(minDistance, maxDistance);
      const x = shopkeeper.x + Math.cos(angle) * distanceFromShop;
      const y = shopkeeper.y + Math.sin(angle) * distanceFromShop;
      if (areaAt(x, y, { areas, passages })?.name !== AREA_NAME) continue;
      return { name: "Soulreaper Trainer", x, y, radius: 16 };
    }
    return { name: "Soulreaper Trainer", x: shopkeeper.x - minDistance, y: shopkeeper.y - 20, radius: 16 };
  }
  
  function makeGladeTrainerSite(glade, areas, passages) {
    for (let attempt = 0; attempt < 180; attempt += 1) {
      const x = randomBetween(glade.center.x - glade.width * 0.34, glade.center.x + glade.width * 0.34);
      const y = randomBetween(glade.center.y - glade.height * 0.34, glade.center.y + glade.height * 0.34);
      const house = makeHouse("dyaria-house", x, y, 340, 270, { roofTexture: "ganderswood" });
      const points = [
        house.shopSpot,
        house.outsideDoor,
        house.entrance,
        ...rectangleBoundary(house.x, house.y, house.w + 180, house.h + 180)
      ];
      if (!points.every(point => areaAt(point.x, point.y, { areas, passages })?.name === GLADE_AREA_NAME)) continue;
      if (points.some(point => pointInAnyPassage(point.x, point.y, passages, 160))) continue;
      return {
        houses: [house],
        eliteSpawns: [{
          name: "Happie Filmore",
          template: "Leprechaun",
          lvl: 5,
          x: house.shopSpot.x - 86,
          y: house.shopSpot.y + 26,
          aggroRange: 9,
          friendlyToNonEvilPlayer: true,
          questGiver: "war-with-goblins"
        }],
        trainer: makeDyariaNpc(house.shopSpot.x, house.shopSpot.y)
      };
    }
    const house = makeHouse("dyaria-house", glade.center.x, glade.center.y, 340, 270, { roofTexture: "ganderswood" });
    return {
      houses: [house],
      eliteSpawns: [{
        name: "Happie Filmore",
        template: "Leprechaun",
        lvl: 5,
        x: house.shopSpot.x - 86,
        y: house.shopSpot.y + 26,
        aggroRange: 9,
        friendlyToNonEvilPlayer: true,
        questGiver: "war-with-goblins"
      }],
      trainer: makeDyariaNpc(house.shopSpot.x, house.shopSpot.y)
    };
  }
  
  function makeSharlene(fenPassage, areas, passages) {
    const dx = fenPassage.x2 - fenPassage.x1;
    const dy = fenPassage.y2 - fenPassage.y1;
    const length = Math.hypot(dx, dy) || 1;
    const dirX = dx / length;
    const dirY = dy / length;
    const perpX = -dirY;
    const perpY = dirX;
    const candidates = [
      { x: fenPassage.x1 - dirX * 80 + perpX * 120, y: fenPassage.y1 - dirY * 80 + perpY * 120 },
      { x: fenPassage.x1 - dirX * 80 - perpX * 120, y: fenPassage.y1 - dirY * 80 - perpY * 120 },
      { x: fenPassage.x1 + dirX * 90 + perpX * 130, y: fenPassage.y1 + dirY * 90 + perpY * 130 },
      { x: fenPassage.x1 + dirX * 90 - perpX * 130, y: fenPassage.y1 + dirY * 90 - perpY * 130 }
    ];
    const spot = candidates.find(candidate => areaAt(candidate.x, candidate.y, { areas, passages })) || {
      x: fenPassage.x1 - dirX * 80,
      y: fenPassage.y1 - dirY * 80
    };
    return {
      name: "Sharlene",
      x: spot.x,
      y: spot.y,
      radius: 15
    };
  }
  
  function makeMordren(ratDenPassage, areas, passages) {
    const dx = ratDenPassage.x2 - ratDenPassage.x1;
    const dy = ratDenPassage.y2 - ratDenPassage.y1;
    const length = Math.hypot(dx, dy) || 1;
    const dirX = dx / length;
    const dirY = dy / length;
    const perpX = -dirY;
    const perpY = dirX;
    const candidates = [
      { x: ratDenPassage.x1 - dirX * 90 + perpX * 110, y: ratDenPassage.y1 - dirY * 90 + perpY * 110 },
      { x: ratDenPassage.x1 - dirX * 90 - perpX * 110, y: ratDenPassage.y1 - dirY * 90 - perpY * 110 },
      { x: ratDenPassage.x1 + dirX * 80 + perpX * 120, y: ratDenPassage.y1 + dirY * 80 + perpY * 120 },
      { x: ratDenPassage.x1 + dirX * 80 - perpX * 120, y: ratDenPassage.y1 + dirY * 80 - perpY * 120 }
    ];
    const spot = candidates.find(candidate => areaAt(candidate.x, candidate.y, { areas, passages })?.name === AREA_NAME) || {
      x: ratDenPassage.x1 - dirX * 90,
      y: ratDenPassage.y1 - dirY * 90
    };
    return {
      name: "Mordren",
      x: spot.x,
      y: spot.y,
      radius: 15
    };
  }
  
  function makeNapaea(glade, areas, passages) {
    for (let attempt = 0; attempt < 120; attempt += 1) {
      const x = randomBetween(glade.center.x - glade.width * 0.36, glade.center.x + glade.width * 0.36);
      const y = randomBetween(glade.center.y - glade.height * 0.36, glade.center.y + glade.height * 0.36);
      if (!isPointInBoundary(x, y, glade.boundary)) continue;
      if (pointInAnyPassage(x, y, passages, 180)) continue;
      if (areaAt(x, y, { areas, passages })?.name !== GLADE_AREA_NAME) continue;
      return { name: "Napaea", x, y, template: "Napaea", lvl: 5, aggroRange: 9 };
    }
    return {
      name: "Napaea",
      x: glade.center.x,
      y: glade.center.y,
      template: "Napaea",
      lvl: 5,
      aggroRange: 9
    };
  }

  function makeJanglebones(graveyard, area) {
    if (!graveyard || !area?.levelRange) return null;
    const candidates = [
      { x: graveyard.x, y: graveyard.y },
      { x: graveyard.x + graveyard.w * 0.18, y: graveyard.y - graveyard.h * 0.12 },
      { x: graveyard.x - graveyard.w * 0.18, y: graveyard.y - graveyard.h * 0.08 },
      { x: graveyard.x + graveyard.w * 0.12, y: graveyard.y + graveyard.h * 0.16 },
      { x: graveyard.x - graveyard.w * 0.12, y: graveyard.y + graveyard.h * 0.14 }
    ];
    const point = candidates.find(candidate => isPointInBoundary(candidate.x, candidate.y, area.boundary)) || candidates[0];
    return {
      name: "Janglebones",
      x: point.x,
      y: point.y,
      template: "Skeleton",
      lvl: randomInt(area.levelRange.min, area.levelRange.max),
      aggroRange: 9,
      noWander: true
    };
  }

  function makeArea(name, cx, cy, width, height, treeChance, levelRange, spawnRate = "Normal", irregularity = 0.34) {
    if (irregularity === 0) {
      const boundary = [
        { x: cx - width / 2, y: cy - height / 2 },
        { x: cx + width / 2, y: cy - height / 2 },
        { x: cx + width / 2, y: cy + height / 2 },
        { x: cx - width / 2, y: cy + height / 2 }
      ];
      return { name, center: { x: cx, y: cy }, width, height, boundary, treeChance, levelRange, spawnRate };
    }
    const boundary = [];
    const points = 40;
    for (let i = 0; i < points; i += 1) {
      const angle = (i / points) * Math.PI * 2;
      const wobble = 1
        + Math.sin(angle * 3 + randomBetween(0, 2)) * irregularity * 0.35
        + Math.sin(angle * 7 + randomBetween(0, 2)) * irregularity * 0.24
        + randomBetween(-irregularity * 0.41, irregularity * 0.41);
      boundary.push({
        x: cx + Math.cos(angle) * (width / 2) * wobble,
        y: cy + Math.sin(angle) * (height / 2) * wobble
      });
    }
    return { name, center: { x: cx, y: cy }, width, height, boundary: smoothBoundary(boundary, 2), treeChance, levelRange, spawnRate };
  }
  
  function smoothBoundary(points, iterations = 1) {
    let output = points.map(point => ({ ...point }));
    for (let pass = 0; pass < iterations; pass += 1) {
      const smoothed = [];
      for (let i = 0; i < output.length; i += 1) {
        const current = output[i];
        const next = output[(i + 1) % output.length];
        smoothed.push({
          x: current.x * 0.75 + next.x * 0.25,
          y: current.y * 0.75 + next.y * 0.25
        });
        smoothed.push({
          x: current.x * 0.25 + next.x * 0.75,
          y: current.y * 0.25 + next.y * 0.75
        });
      }
      output = smoothed;
    }
    return output;
  }
  
  function areaBoundsOverlap(a, b, padding = 0) {
    const boundsA = a.bounds || boundsForPoints(a.boundary || []);
    const boundsB = b.bounds || boundsForPoints(b.boundary || []);
    return boundsA.minX - padding <= boundsB.maxX
      && boundsA.maxX + padding >= boundsB.minX
      && boundsA.minY - padding <= boundsB.maxY
      && boundsA.maxY + padding >= boundsB.minY;
  }
  
  function areaRadiusAt(area, dirX, dirY) {
    return Math.min(
      Math.abs((area.width / 2) / (dirX || 0.0001)),
      Math.abs((area.height / 2) / (dirY || 0.0001))
    );
  }
  
  function boundaryRadiusAt(area, dirX, dirY) {
    const maxRadius = areaRadiusAt(area, dirX, dirY) * 2;
    let low = 0;
    let high = maxRadius;
    while (isPointInBoundary(area.center.x + dirX * high, area.center.y + dirY * high, area.boundary)) {
      low = high;
      high *= 1.35;
    }
    for (let i = 0; i < 28; i += 1) {
      const mid = (low + high) / 2;
      const x = area.center.x + dirX * mid;
      const y = area.center.y + dirY * mid;
      if (isPointInBoundary(x, y, area.boundary)) low = mid;
      else high = mid;
    }
    return low;
  }
  
  function makeWindingArea(name, parentArea, angle, length, width, levelRange, spawnRate = "Normal") {
    const dir = { x: Math.cos(angle), y: Math.sin(angle) };
    const tangent = { x: -dir.y, y: dir.x };
    const startRadius = boundaryRadiusAt(parentArea, dir.x, dir.y) - width * 0.8;
    const points = [];
    const segments = 9;
    let sideDrift = 0;
  
    for (let i = 0; i <= segments; i += 1) {
      const t = i / segments;
      sideDrift += randomBetween(-80, 80);
      const wave = Math.sin(t * Math.PI * 3 + randomBetween(-0.4, 0.4)) * 170;
      points.push({
        x: parentArea.center.x + dir.x * (startRadius + length * t) + tangent.x * (sideDrift + wave),
        y: parentArea.center.y + dir.y * (startRadius + length * t) + tangent.y * (sideDrift + wave)
      });
    }
  
    const left = [];
    const right = [];
    for (let i = 0; i < points.length; i += 1) {
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const vx = next.x - prev.x;
      const vy = next.y - prev.y;
      const mag = Math.hypot(vx, vy) || 1;
      const nx = (-vy / mag) * width / 2;
      const ny = (vx / mag) * width / 2;
      left.push({ x: points[i].x + nx, y: points[i].y + ny });
      right.unshift({ x: points[i].x - nx, y: points[i].y - ny });
    }
    const boundary = smoothBoundary([...left, ...right], 1);
    const xs = boundary.map(point => point.x);
    const ys = boundary.map(point => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return {
      name,
      center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
      width: maxX - minX,
      height: maxY - minY,
      boundary,
      treeChance: 0.08,
      levelRange,
      spawnRate,
      path: points,
      pathWidth: width
    };
  }
  
  function makeGladePuddles(glade, count) {
    const puddles = [];
    let attempts = 0;
    while (puddles.length < count && attempts < count * 20) {
      attempts += 1;
      const puddle = {
        x: randomBetween(glade.center.x - glade.width * 0.42, glade.center.x + glade.width * 0.42),
        y: randomBetween(glade.center.y - glade.height * 0.42, glade.center.y + glade.height * 0.42),
        rx: randomBetween(42, 145),
        ry: randomBetween(26, 92),
        wobble: Array.from({ length: 24 }, () => randomBetween(0.86, 1.14))
      };
      if (!isPointInBoundary(puddle.x, puddle.y, glade.boundary)) continue;
      if (puddles.some(existing => Math.hypot(existing.x - puddle.x, existing.y - puddle.y) < existing.rx + puddle.rx + 34)) continue;
      puddles.push(puddle);
    }
    return puddles;
  }

  function makeHarmushLake(area, passages = []) {
    const makeLake = (x, y) => ({
      kind: "harmush-lake",
      areaName: HARMUSH_LAGH_AREA_NAME,
      x,
      y,
      rx: randomBetween(430, 560),
      ry: randomBetween(255, 350),
      wobble: Array.from({ length: 32 }, () => randomBetween(0.82, 1.18))
    });
    const fits = lake => {
      const sampleCount = 18;
      for (let i = 0; i < sampleCount; i += 1) {
        const angle = (i / sampleCount) * Math.PI * 2;
        const x = lake.x + Math.cos(angle) * lake.rx * 1.08;
        const y = lake.y + Math.sin(angle) * lake.ry * 1.08;
        if (!isPointInBoundary(x, y, area.boundary)) return false;
      }
      return !pointInAnyPassage(lake.x, lake.y, passages, Math.max(lake.rx, lake.ry) + 180);
    };
    for (let attempt = 0; attempt < 160; attempt += 1) {
      const lake = makeLake(
        randomBetween(area.center.x - area.width * 0.34, area.center.x + area.width * 0.34),
        randomBetween(area.center.y - area.height * 0.34, area.center.y + area.height * 0.34)
      );
      if (fits(lake)) return lake;
    }
    const fallback = makeLake(area.center.x, area.center.y);
    fallback.rx = Math.min(fallback.rx, area.width * 0.2);
    fallback.ry = Math.min(fallback.ry, area.height * 0.16);
    return fallback;
  }

  function makeHollyhockLakeSite(area, lake) {
    if (!area || !lake) return null;
    const shorePoint = (angle, distance = 90) => ({
      x: lake.x + Math.cos(angle) * ((lake.rx || 420) + distance),
      y: lake.y + Math.sin(angle) * ((lake.ry || 260) + distance)
    });
    const pick = (angles, distance = 90) => {
      for (const angle of angles) {
        const point = shorePoint(angle, distance);
        if (isPointInBoundary(point.x, point.y, area.boundary)) return point;
      }
      return {
        x: lake.x + Math.min((lake.rx || 420) + distance, area.width * 0.28),
        y: lake.y
      };
    };
    const npcPoint = pick([0, Math.PI * 0.18, -Math.PI * 0.18, Math.PI], 120);
    const mossSites = [
      { id: "lakeward-stone", label: "lakeward stone", correct: true, ...pick([Math.PI * 0.72, Math.PI * 0.55, Math.PI * 0.9], 78) },
      { id: "dry-silver-stone", label: "dry silver stone", correct: false, ...pick([Math.PI * 1.22, Math.PI * 1.08, Math.PI * 1.4], 135) },
      { id: "rain-facing-stone", label: "rain-facing stone", correct: false, ...pick([-Math.PI * 0.35, -Math.PI * 0.55, -Math.PI * 0.12], 130) }
    ];
    const rootSites = [
      { id: "water-root-charm", label: "water", ...pick([Math.PI * 0.05, -Math.PI * 0.05], 66) },
      { id: "stone-root-charm", label: "stone", ...pick([Math.PI * 0.92, Math.PI * 0.82], 120) },
      { id: "tree-root-charm", label: "tree", ...pick([-Math.PI * 0.75, -Math.PI * 0.62], 145) }
    ];
    return {
      npc: makeConfiguredNpc("herbalist-hollyhock", npcPoint.x, npcPoint.y, {
        area: HARMUSH_LAGH_AREA_NAME,
        wandering: false,
        startsQuest: true,
        questChain: ["hollyhocks-mossy-errand", "hollyhocks-lake-offering", "hollyhocks-green-touch"],
        dialogueContexts: {
          questOffer: "Aye, I can feel a shy bit of green waking in you. If you want my teaching, start with a patient errand: find me a Moss-Covered Stone out in Harmush Lagh. The old stones here drink root-whispers better than any bottle I own, but they do not sit politely beside the road.",
          questActive: "Still hunting the stone, are you? Keep your eyes low and your boots steady. Moss loves the quiet places, away from shouting halls and hot forge smoke.",
          questReady: "There it is. Do not hand it over. Keep it close. A stone that has listened this long should hear what the lake has to say next.",
          questLakeOffer: "Now take that Moss-Covered Stone to the lake and drop it in. Do not toss it like rubbish. Offer it. If something answers with teeth, keep your wits and show me you can survive the bargain.",
          questLakeActive: "The lake has not had your offering yet. Stand near the water and drop the Moss-Covered Stone in. If the water spits trouble back, put it down cleanly.",
          questLakeReady: "Good. The lake answered, and you answered louder. That is how a dwarf learns Sylvan work: not by pretty words, but by standing firm when the deep places blink back.",
          questTellursaOffer: "One more lesson, and this one needs a gentler hand. A rare Tellursa wanders the Harkhar Highlands. Find it, do not butcher it, and cast Chlorophyll on it. I want to know you can mend a living thing when the mountains are trying to harden your heart.",
          questTellursaActive: "Find the Tellursa in Harkhar Highlands and lay Chlorophyll on it. If it bolts, let it breathe and try again. Sylvan magic is not a hammer, no matter what our kin say.",
          questTellursaReady: "Aye, that will do. You have listened to stone, water, tooth, and beast. Take this trinket. It is not fancy, but it remembers the lake better than most people do.",
          questAfterComplete: "Keep your roots deep and your axe sharper than your pride. Harmush Lagh has more to teach, if you keep listening."
        }
      }),
      questSites: { mossSites, rootSites }
    };
  }

  function makeBarbarianHouseSite(area, passages = [], lake = null, avoidNpcs = []) {
    if (!area) return null;
    const houseW = 340;
    const houseH = 270;
    const clearOfLake = house => {
      if (!lake) return true;
      const pad = 70;
      const points = [
        { x: house.x, y: house.y },
        { x: house.x - house.w / 2 - pad, y: house.y - house.h / 2 - pad },
        { x: house.x + house.w / 2 + pad, y: house.y - house.h / 2 - pad },
        { x: house.x - house.w / 2 - pad, y: house.y + house.h / 2 + pad },
        { x: house.x + house.w / 2 + pad, y: house.y + house.h / 2 + pad }
      ];
      return points.every(point => !pointInPuddle(point.x, point.y, lake, 0));
    };
    const validHouse = house => {
      const bounds = houseCollisionBounds(house, 90);
      const corners = [
        { x: bounds.x, y: bounds.y },
        { x: bounds.x + bounds.w, y: bounds.y },
        { x: bounds.x, y: bounds.y + bounds.h },
        { x: bounds.x + bounds.w, y: bounds.y + bounds.h }
      ];
      if (!corners.every(point => isPointInBoundary(point.x, point.y, area.boundary))) return false;
      if (pointInAnyPassage(house.x, house.y, passages, Math.max(house.w, house.h) * 0.65)) return false;
      if (!clearOfLake(house)) return false;
      if ((avoidNpcs || []).some(npc => Math.hypot(house.x - npc.x, house.y - npc.y) < 430)) return false;
      return true;
    };
    let house = null;
    for (let attempt = 0; attempt < 180; attempt += 1) {
      const x = randomBetween(area.center.x - area.width * 0.36, area.center.x + area.width * 0.36);
      const y = randomBetween(area.center.y - area.height * 0.36, area.center.y + area.height * 0.36);
      const candidate = makeHouse("barbarian-house", x, y, houseW, houseH, {
        label: "Barbarian House",
        metadata: { area: HARMUSH_LAGH_AREA_NAME, name: "Barbarian House" },
        roofTexture: "thatch"
      });
      if (!validHouse(candidate)) continue;
      house = candidate;
      break;
    }
    if (!house) {
      house = makeHouse("barbarian-house", area.center.x + area.width * 0.18, area.center.y - area.height * 0.18, houseW, houseH, {
        label: "Barbarian House",
        metadata: { area: HARMUSH_LAGH_AREA_NAME, name: "Barbarian House" },
        roofTexture: "thatch"
      });
    }
    const interior = house.interior || house.floor;
    const fenrir = makeConfiguredNpc("fenrir", interior.x + interior.w * 0.34, interior.y + interior.h * 0.48, {
      area: HARMUSH_LAGH_AREA_NAME,
      houseId: house.id,
      wandering: false
    });
    const sigrid = makeConfiguredNpc("sigrid", interior.x + interior.w * 0.66, interior.y + interior.h * 0.48, {
      area: HARMUSH_LAGH_AREA_NAME,
      houseId: house.id,
      wandering: false
    });
    return {
      house,
      houses: [house],
      npcs: [fenrir, sigrid]
    };
  }

  function makeLavaPuddles(area, count) {
    const puddles = [];
    let attempts = 0;
    while (puddles.length < count && attempts < count * 24) {
      attempts += 1;
      const puddle = {
        kind: "lava",
        terrain: "lava",
        areaName: area.name,
        x: randomBetween(area.center.x - area.width * 0.42, area.center.x + area.width * 0.42),
        y: randomBetween(area.center.y - area.height * 0.42, area.center.y + area.height * 0.42),
        rx: randomBetween(48, 170),
        ry: randomBetween(28, 105),
        wobble: Array.from({ length: 24 }, () => randomBetween(0.82, 1.18))
      };
      if (!isPointInBoundary(puddle.x, puddle.y, area.boundary)) continue;
      if (puddles.some(existing => Math.hypot(existing.x - puddle.x, existing.y - puddle.y) < existing.rx + puddle.rx + 42)) continue;
      puddles.push(puddle);
    }
    return puddles;
  }
  
  function makePassage(x1, y1, x2, y2, width, areaName = AREA_NAME, surface = null) {
    return { x1, y1, x2, y2, width, areaName, surface };
  }
  
  function isPointInBoundary(x, y, boundary) {
    if (!boundary) return true;
    let inside = false;
    for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i, i += 1) {
      const xi = boundary[i].x;
      const yi = boundary[i].y;
      const xj = boundary[j].x;
      const yj = boundary[j].y;
      const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }
  
  function distanceToSegment(px, py, passage) {
    const vx = passage.x2 - passage.x1;
    const vy = passage.y2 - passage.y1;
    const wx = px - passage.x1;
    const wy = py - passage.y1;
    const c1 = vx * wx + vy * wy;
    const c2 = vx * vx + vy * vy;
    const t = Math.max(0, Math.min(1, c1 / c2));
    const x = passage.x1 + t * vx;
    const y = passage.y1 + t * vy;
    return Math.hypot(px - x, py - y);
  }
  
  function pointInPassage(x, y, passage, radius = 0) {
    if (!passage) return false;
    return distanceToSegment(x, y, passage) <= passage.width / 2 - radius;
  }
  
  function pointInAnyPassage(x, y, passages = game.map?.passages || [], radius = 0) {
    return passages.some(passage => pointInPassage(x, y, passage, radius));
  }
  
  function boundsForPoints(points) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const point of points) {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    }
    return { minX, minY, maxX, maxY };
  }
  
  function obstacleBounds(obstacle) {
    if (obstacle.kind === "city-building" || obstacle.kind === "ruins-wall") {
      return {
        minX: obstacle.x - obstacle.w / 2,
        minY: obstacle.y - obstacle.h / 2,
        maxX: obstacle.x + obstacle.w / 2,
        maxY: obstacle.y + obstacle.h / 2
      };
    }
    if (obstacle.kind === "whisperspring-entrance") {
      const rects = obstacle.blockRects || [];
      if (!rects.length) {
        const size = obstacle.size || 120;
        return { minX: obstacle.x - size / 2, minY: obstacle.y - size / 2, maxX: obstacle.x + size / 2, maxY: obstacle.y + size / 2 };
      }
      return rects.reduce((bounds, rect) => ({
        minX: Math.min(bounds.minX, obstacle.x + rect.x),
        minY: Math.min(bounds.minY, obstacle.y + rect.y),
        maxX: Math.max(bounds.maxX, obstacle.x + rect.x + rect.w),
        maxY: Math.max(bounds.maxY, obstacle.y + rect.y + rect.h)
      }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
    }
    const radius = obstacle.radius || Math.max(obstacle.w || 0, obstacle.h || 0, obstacle.size || 0) / 2 || 24;
    return {
      minX: obstacle.x - radius,
      minY: obstacle.y - radius,
      maxX: obstacle.x + radius,
      maxY: obstacle.y + radius
    };
  }
  
  function gridKey(cx, cy) {
    return `${cx},${cy}`;
  }
  
  function addObstacleToGrid(grid, obstacle) {
    const bounds = obstacleBounds(obstacle);
    const minCellX = Math.floor(bounds.minX / COLLISION_CELL_SIZE);
    const maxCellX = Math.floor(bounds.maxX / COLLISION_CELL_SIZE);
    const minCellY = Math.floor(bounds.minY / COLLISION_CELL_SIZE);
    const maxCellY = Math.floor(bounds.maxY / COLLISION_CELL_SIZE);
    for (let cx = minCellX; cx <= maxCellX; cx += 1) {
      for (let cy = minCellY; cy <= maxCellY; cy += 1) {
        const key = gridKey(cx, cy);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(obstacle);
      }
    }
  }

  function puddleBounds(puddle) {
    if (puddle.kind === "river" && puddle.bounds) {
      return puddle.bounds;
    }
    if ((puddle.kind === "polygon-water" || puddle.kind === "polygon-lava") && puddle.bounds) {
      return puddle.bounds;
    }
    if (puddle.kind === "rect-water" || puddle.kind === "rect-lava") {
      return {
        minX: puddle.x,
        minY: puddle.y,
        maxX: puddle.x + puddle.w,
        maxY: puddle.y + puddle.h
      };
    }
    const rx = puddle.rx || 0;
    const ry = puddle.ry || 0;
    return {
      minX: puddle.x - rx,
      minY: puddle.y - ry,
      maxX: puddle.x + rx,
      maxY: puddle.y + ry
    };
  }

  function addPuddleToGrid(grid, puddle) {
    const bounds = puddleBounds(puddle);
    const minCellX = Math.floor(bounds.minX / COLLISION_CELL_SIZE);
    const maxCellX = Math.floor(bounds.maxX / COLLISION_CELL_SIZE);
    const minCellY = Math.floor(bounds.minY / COLLISION_CELL_SIZE);
    const maxCellY = Math.floor(bounds.maxY / COLLISION_CELL_SIZE);
    for (let cx = minCellX; cx <= maxCellX; cx += 1) {
      for (let cy = minCellY; cy <= maxCellY; cy += 1) {
        const key = gridKey(cx, cy);
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(puddle);
      }
    }
  }
  
  function prepareMapCaches(map) {
    if (!map) return map;
    for (const area of map.areas || []) {
      area.bounds = boundsForPoints(area.boundary);
      area._path = null;
    }
    for (const passage of map.passages || []) {
      const pad = passage.width / 2;
      passage.bounds = {
        minX: Math.min(passage.x1, passage.x2) - pad,
        minY: Math.min(passage.y1, passage.y2) - pad,
        maxX: Math.max(passage.x1, passage.x2) + pad,
        maxY: Math.max(passage.y1, passage.y2) + pad
      };
    }
    for (const house of map.houses || []) {
      const bounds = houseCollisionBounds(house);
      house._bounds = {
        minX: bounds.x,
        minY: bounds.y,
        maxX: bounds.x + bounds.w,
        maxY: bounds.y + bounds.h
      };
    }
    const grid = new Map();
    for (const obstacle of map.obstacles || []) addObstacleToGrid(grid, obstacle);
    map._obstacleGrid = grid;
    const puddleGrid = new Map();
    for (const puddle of map.puddles || []) addPuddleToGrid(puddleGrid, puddle);
    map._puddleGrid = puddleGrid;
    map._playablePath = null;
    return map;
  }

  function mapPlacementCollides(map, x, y, radius = 0) {
    for (const house of map.houses || []) {
      if ((house.blocks || []).some(block => rectCollidesCircle(block, x, y, radius))) return true;
    }
    for (const obstacle of map.obstacles || []) {
      if (obstacle.kind === "city-building" || obstacle.kind === "ruins-wall") {
        const dx = Math.max(Math.abs(x - obstacle.x) - obstacle.w / 2, 0);
        const dy = Math.max(Math.abs(y - obstacle.y) - obstacle.h / 2, 0);
        if (Math.hypot(dx, dy) <= radius) return true;
        continue;
      }
      if (obstacle.kind === "whisperspring-entrance") {
        if ((obstacle.blockRects || []).some(rect => {
          const rectCenterX = obstacle.x + rect.x + rect.w / 2;
          const rectCenterY = obstacle.y + rect.y + rect.h / 2;
          const dx = Math.max(Math.abs(x - rectCenterX) - rect.w / 2, 0);
          const dy = Math.max(Math.abs(y - rectCenterY) - rect.h / 2, 0);
          return Math.hypot(dx, dy) <= radius;
        })) return true;
        continue;
      }
      if (Math.hypot(x - obstacle.x, y - obstacle.y) < (obstacle.radius || 0) + radius) return true;
    }
    return false;
  }

  function mapPlacementWalkable(map, x, y, radius = 0, preferredAreaName = null) {
    const area = areaAt(x, y, map);
    return Boolean(area)
      && (!preferredAreaName || area.name === preferredAreaName)
      && !mapPlacementCollides(map, x, y, radius);
  }

  function nearestMapWalkablePoint(map, x, y, radius = 16, preferredAreaName = null) {
    if (mapPlacementWalkable(map, x, y, radius, preferredAreaName)) return { x, y };
    const fallbackPreferredArea = areaAt(x, y, map)?.name || preferredAreaName || null;
    for (let ring = 1; ring <= 18; ring += 1) {
      const dist = ring * 42;
      const samples = Math.max(12, ring * 8);
      for (let index = 0; index < samples; index += 1) {
        const angle = (index / samples) * Math.PI * 2;
        const tryX = x + Math.cos(angle) * dist;
        const tryY = y + Math.sin(angle) * dist;
        if (mapPlacementWalkable(map, tryX, tryY, radius, fallbackPreferredArea)) return { x: tryX, y: tryY };
      }
    }
    for (let ring = 1; ring <= 24; ring += 1) {
      const dist = ring * 56;
      const samples = Math.max(14, ring * 8);
      for (let index = 0; index < samples; index += 1) {
        const angle = (index / samples) * Math.PI * 2;
        const tryX = x + Math.cos(angle) * dist;
        const tryY = y + Math.sin(angle) * dist;
        if (mapPlacementWalkable(map, tryX, tryY, radius)) return { x: tryX, y: tryY };
      }
    }
    return { x, y };
  }

  function enforceSafeMapPlacements(map) {
    const safeEntity = (entity, radius = null) => {
      if (!entity || !Number.isFinite(entity.x) || !Number.isFinite(entity.y)) return;
      const placementRadius = Math.max(10, Number(radius ?? entity.radius ?? 16));
      const preferredAreaName = entity.area || entity.metadata?.area || areaAt(entity.x, entity.y, map)?.name || null;
      const point = nearestMapWalkablePoint(map, entity.x, entity.y, placementRadius, preferredAreaName);
      if (point.x === entity.x && point.y === entity.y) return;
      const dx = point.x - entity.x;
      const dy = point.y - entity.y;
      entity.x = point.x;
      entity.y = point.y;
      if (Number.isFinite(entity.homeX)) entity.homeX += dx;
      if (Number.isFinite(entity.homeY)) entity.homeY += dy;
      if (Number.isFinite(entity.leashX)) entity.leashX += dx;
      if (Number.isFinite(entity.leashY)) entity.leashY += dy;
    };
    [
      map.shopkeeper,
      map.pleezix,
      map.trainer,
      map.gladeTrainer,
      map.gvada,
      map.huntsmanRobb,
      map.blacksmithFredward,
      map.tailorAntonia,
      map.barbarianessSkjoldma,
      map.chaplainSonsam,
      map.highPriestessSierra,
      map.alchemistClaristra,
      map.magisterMaimon,
      map.juanTabo,
      map.lordYantos,
      map.hereticOswaldo,
      map.hereticSlayleigh,
      map.theodora,
      map.sharlene,
      map.mordren,
      map.cecil
    ].forEach(npc => safeEntity(npc));
    for (const npc of map.configuredNpcs || []) safeEntity(npc);
    for (const npc of map.bumsforkNpcs || []) safeEntity(npc);
    for (const spawn of map.eliteSpawns || []) safeEntity(spawn, Number(spawn.radius) || 22);
    for (const spawn of map.fixedSpawns || []) safeEntity(spawn, Number(spawn.radius) || 20);
  }
  
  function scaleNpcRadius(npc) {
    if (!npc || npc.radiusScaled) return;
    npc.radius *= UNIT_SIZE_SCALE;
    npc.radiusScaled = true;
  }
  
  function scaleMapNpcRadii(map) {
    if (!map) return map;
    [
      map.shopkeeper,
      map.pleezix,
      map.trainer,
      map.gladeTrainer,
      map.gvada,
      map.huntsmanRobb,
      map.blacksmithFredward,
      map.tailorAntonia,
      map.barbarianessSkjoldma,
      map.chaplainSonsam,
      map.highPriestessSierra,
      map.alchemistClaristra,
      map.magisterMaimon,
      map.juanTabo,
      map.lordYantos,
      map.hereticOswaldo,
      map.hereticSlayleigh,
      map.theodora,
      map.sharlene,
      map.mordren,
      map.cecil
    ].forEach(scaleNpcRadius);
    for (const npc of map.configuredNpcs || []) scaleNpcRadius(npc);
    for (const npc of map.bumsforkNpcs || []) scaleNpcRadius(npc);
    return map;
  }
  
  function nearbyObstacles(x, y, radius = 0) {
    const grid = game.map?._obstacleGrid;
    if (!grid) return game.map?.obstacles || [];
    const minCellX = Math.floor((x - radius - COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const maxCellX = Math.floor((x + radius + COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const minCellY = Math.floor((y - radius - COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const maxCellY = Math.floor((y + radius + COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const found = [];
    const seen = new Set();
    for (let cx = minCellX; cx <= maxCellX; cx += 1) {
      for (let cy = minCellY; cy <= maxCellY; cy += 1) {
        for (const obstacle of grid.get(gridKey(cx, cy)) || []) {
          if (seen.has(obstacle)) continue;
          seen.add(obstacle);
          found.push(obstacle);
        }
      }
    }
    return found;
  }
  
  function pointInPuddle(x, y, puddle, radius = 0) {
    if (puddle.kind === "river") {
      const points = puddle.points || [];
      const halfWidth = (puddle.width || 0) / 2 + radius;
      if (points.length === 1) return Math.hypot(x - points[0].x, y - points[0].y) <= halfWidth;
      for (let i = 0; i < points.length - 1; i += 1) {
        if (distanceToLineSegment(x, y, points[i], points[i + 1]) <= halfWidth) return true;
      }
      return false;
    }
    if (puddle.kind === "rect-water" || puddle.kind === "rect-lava") {
      return x >= puddle.x - radius
        && x <= puddle.x + puddle.w + radius
        && y >= puddle.y - radius
        && y <= puddle.y + puddle.h + radius;
    }
    if (puddle.kind === "polygon-water" || puddle.kind === "polygon-lava") {
      const boundary = puddle.boundary || [];
      if (!boundary.length) return false;
      const bounds = puddle.bounds || boundsForPoints(boundary);
      if (x < bounds.minX - radius || x > bounds.maxX + radius || y < bounds.minY - radius || y > bounds.maxY + radius) return false;
      return pointInPolygon(x, y, boundary)
        || boundary.some((point, index) => distanceToLineSegment(x, y, point, boundary[(index + 1) % boundary.length]) <= radius);
    }
    const rx = puddle.rx + radius;
    const ry = puddle.ry + radius;
    return ((x - puddle.x) ** 2) / (rx ** 2) + ((y - puddle.y) ** 2) / (ry ** 2) <= 1;
  }

  function isLavaFeature(puddle) {
    return puddle?.terrain === "lava" || String(puddle?.kind || "").includes("lava");
  }

  function pointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;
      const intersects = ((yi > y) !== (yj > y))
        && x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1) + xi;
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function distanceToLineSegment(x, y, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lengthSq = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / lengthSq));
    return Math.hypot(x - (a.x + dx * t), y - (a.y + dy * t));
  }

  function nearbyPuddles(x, y, radius = 0) {
    const grid = game.map?._puddleGrid;
    if (!grid) return game.map?.puddles || [];
    const minCellX = Math.floor((x - radius - COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const maxCellX = Math.floor((x + radius + COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const minCellY = Math.floor((y - radius - COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const maxCellY = Math.floor((y + radius + COLLISION_CELL_SIZE) / COLLISION_CELL_SIZE);
    const found = [];
    const seen = new Set();
    for (let cx = minCellX; cx <= maxCellX; cx += 1) {
      for (let cy = minCellY; cy <= maxCellY; cy += 1) {
        for (const puddle of grid.get(gridKey(cx, cy)) || []) {
          if (seen.has(puddle)) continue;
          seen.add(puddle);
          found.push(puddle);
        }
      }
    }
    return found;
  }
  
  function unitInPuddle(unit) {
    if (unitFlying(unit)) return false;
    const radius = unit.radius * 0.35;
    return nearbyPuddles(unit.x, unit.y, radius).some(puddle => !isLavaFeature(puddle) && pointInPuddle(unit.x, unit.y, puddle, radius));
  }
  
  function unitInDungeon(unit) {
    return Boolean(areaAt(unit.x, unit.y)?.dungeon);
  }
  
  function areaAt(x, y, map = game.map) {
    if (!map) return null;
    for (let i = (map.areas || []).length - 1; i >= 0; i -= 1) {
      const candidate = map.areas[i];
      const bounds = candidate.bounds;
      if (bounds && (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)) continue;
      if (isPointInBoundary(x, y, candidate.boundary)) return candidate;
    }
    const passage = (map.passages || []).find(candidate => {
      const bounds = candidate.bounds;
      if (bounds && (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)) return false;
      return pointInPassage(x, y, candidate);
    });
    if (!passage) return null;
    return map.areas.find(candidate => candidate.name === passage.areaName) || map.areas[0];
  }
  
  function collidingObstacle(x, y, radius = 0) {
    for (const house of game.map?.houses || []) {
      if ((house.blocks || []).some(block => rectCollidesCircle(block, x, y, radius))) return house;
    }
    return nearbyObstacles(x, y, radius).find(obstacle => {
      if (obstacle.kind === "city-building" || obstacle.kind === "ruins-wall") {
        const dx = Math.max(Math.abs(x - obstacle.x) - obstacle.w / 2, 0);
        const dy = Math.max(Math.abs(y - obstacle.y) - obstacle.h / 2, 0);
        return Math.hypot(dx, dy) <= radius;
      }
      if (obstacle.kind === "whisperspring-entrance") {
        return (obstacle.blockRects || []).some(rect => {
          const rectCenterX = obstacle.x + rect.x + rect.w / 2;
          const rectCenterY = obstacle.y + rect.y + rect.h / 2;
          const dx = Math.max(Math.abs(x - rectCenterX) - rect.w / 2, 0);
          const dy = Math.max(Math.abs(y - rectCenterY) - rect.h / 2, 0);
          return Math.hypot(dx, dy) <= radius;
        });
      }
      return Math.hypot(x - obstacle.x, y - obstacle.y) < obstacle.radius + radius;
    });
  }
  
  function pointInsideRect(rect, x, y, padding = 0) {
    return x >= rect.x - padding
      && x <= rect.x + rect.w + padding
      && y >= rect.y - padding
      && y <= rect.y + rect.h + padding;
  }
  
  function segmentIntersectsRect(x1, y1, x2, y2, rect, padding = 0) {
    const left = rect.x - padding;
    const right = rect.x + rect.w + padding;
    const top = rect.y - padding;
    const bottom = rect.y + rect.h + padding;
    if ((x1 >= left && x1 <= right && y1 >= top && y1 <= bottom)
      || (x2 >= left && x2 <= right && y2 >= top && y2 <= bottom)) return true;
    let t0 = 0;
    let t1 = 1;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const clip = (p, q) => {
      if (p === 0) return q >= 0;
      const r = q / p;
      if (p < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
      return true;
    };
    return clip(-dx, x1 - left)
      && clip(dx, right - x1)
      && clip(-dy, y1 - top)
      && clip(dy, bottom - y1)
      && t0 <= t1;
  }
  
  function distancePointToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;
    if (lengthSq <= 0) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
    return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
  }
  
  function segmentIntersectsObstacle(x1, y1, x2, y2, obstacle, padding = 0) {
    if (obstacle.kind === "city-building" || obstacle.kind === "ruins-wall") {
      return segmentIntersectsRect(x1, y1, x2, y2, {
        x: obstacle.x - obstacle.w / 2,
        y: obstacle.y - obstacle.h / 2,
        w: obstacle.w,
        h: obstacle.h
      }, padding);
    }
    if (obstacle.kind === "whisperspring-entrance") {
      return (obstacle.blockRects || []).some(rect => segmentIntersectsRect(x1, y1, x2, y2, {
        x: obstacle.x + rect.x,
        y: obstacle.y + rect.y,
        w: rect.w,
        h: rect.h
      }, padding));
    }
    return distancePointToSegment(obstacle.x, obstacle.y, x1, y1, x2, y2) <= (obstacle.radius || 0) + padding;
  }
  
  function lineOfSightBlocked(x1, y1, x2, y2, padding = 2) {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    for (const house of game.map?.houses || []) {
      const bounds = house._bounds;
      if (bounds && (bounds.maxX + padding < minX || bounds.minX - padding > maxX || bounds.maxY + padding < minY || bounds.minY - padding > maxY)) continue;
      for (const block of house.blocks || []) {
        if (segmentIntersectsRect(x1, y1, x2, y2, block, padding)) return true;
      }
    }
    const lineRadius = Math.hypot(maxX - minX, maxY - minY) / 2 + padding;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    for (const obstacle of nearbyObstacles(centerX, centerY, lineRadius)) {
      const bounds = obstacleBounds(obstacle);
      if (bounds.maxX + padding < minX || bounds.minX - padding > maxX || bounds.maxY + padding < minY || bounds.minY - padding > maxY) continue;
      if (segmentIntersectsObstacle(x1, y1, x2, y2, obstacle, padding)) return true;
    }
    return false;
  }
  
  function hasLineOfSight(source, target, padding = 2) {
    if (!source || !target) return false;
    if (source === target) return true;
    return !lineOfSightBlocked(source.x, source.y, target.x, target.y, padding);
  }
  
  function isWalkable(x, y, radius = 0) {
    return Boolean(areaAt(x, y))
      && !collidingObstacle(x, y, radius);
  }

  window.SoulreaperMapGeneration = {
    applyDevAreaConfigs,
    generateMap,
    rectangleBoundary,
    rectContainsPoint,
    rectCollidesCircle,
    pointInsideHouse,
    pointCollidesHouseWalls,
    houseCollisionBounds,
    makeArea,
    smoothBoundary,
    areaBoundsOverlap,
    areaRadiusAt,
    boundaryRadiusAt,
    makeWindingArea,
    makeGladePuddles,
    makePassage,
    isPointInBoundary,
    pointInPassage,
    pointInAnyPassage,
    boundsForPoints,
    obstacleBounds,
    prepareMapCaches,
    scaleMapNpcRadii,
    nearbyObstacles,
    nearbyPuddles,
    pointInPuddle,
    unitInPuddle,
    unitInDungeon,
    areaAt,
    collidingObstacle,
    pointInsideRect,
    segmentIntersectsRect,
    distancePointToSegment,
    segmentIntersectsObstacle,
    lineOfSightBlocked,
    hasLineOfSight,
    isWalkable
  };
})();
