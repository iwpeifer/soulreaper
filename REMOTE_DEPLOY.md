# Soulreaper Remote Playtest Deploy

This repo is ready to deploy as a Render Web Service backed by a Neon Postgres database.

## 1. Create the Database

1. Create a free Neon project.
2. Copy the pooled or direct Postgres connection string.
3. Keep the full string private. It becomes Render's `DATABASE_URL`.

## 2. Push the Repo

Render needs a GitHub/GitLab/Bitbucket repo.

```sh
git add package.json package-lock.json render.yaml multiplayer-server.js
git commit -m "Add remote multiplayer persistence"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

If your branch is not `main`, replace `main` with the current branch name.

## 3. Create the Render Service

1. In Render, create a new Blueprint or Web Service from this repo.
2. Use the `render.yaml` settings when prompted.
3. Add the secret environment variable:
   - `DATABASE_URL`: paste the Neon connection string
4. Deploy.

## 4. Verify

After deploy, open:

```text
https://YOUR_RENDER_SERVICE.onrender.com/healthz
```

Expected response:

```json
{
  "ok": true,
  "server": "Soulreaper multiplayer server",
  "accountStore": "postgres"
}
```

Then open the root URL and create a test account.

## Notes

Render Free services can sleep when idle, so the first load after inactivity can be slow. Neon keeps the character/account database durable while the Render web service sleeps or redeploys.
