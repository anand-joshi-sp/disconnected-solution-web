# Deploy on Render (same pattern as user-admin-demo)

Repo layout: `index.html`, `css/`, `js/` at the **repository root** (not in a subfolder).

## Option A — Blueprint (uses `render.yaml`)

1. **New +** → **Blueprint**.
2. Connect your Disconnected Solutions repo (same static layout as `user-admin-demo`).
3. Apply the blueprint. Render reads `render.yaml`:
   - `runtime: static`
   - `buildCommand: ""` (no npm/gradle — empty is correct)
   - `staticPublishPath: .`
   - rewrite `/*` → `/index.html` for deep links

## Option B — Static Site (dashboard only; `render.yaml` is ignored)

1. **New +** → **Static Site** → **Git Provider** → select the repo.
2. Set:

| Setting | Value |
|---------|--------|
| Branch | `main` |
| Root Directory | `.` (blank if files are at repo root) |
| Build Command | *(leave empty)* |
| Publish Directory | `.` |

3. **Redirects/Rewrites** (Settings): add `/*` → `/index.html` (200) if routes fail on refresh.

## Do not use

- `npm install` / `yarn build` — there is no `package.json`; the build will fail.
- Publish directory `build` or `dist` — nothing generates those folders.

## Demo login

- User: `admin`
- Password: `admin123`

The demo seeds 1,000 users. The storage version is updated with the seed, so existing browsers receive
the complete dataset automatically after deployment.
