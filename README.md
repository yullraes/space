# My Blog

Small publishing system split into three responsibilities:

- `apps/blog`: public Astro site and build-time publishing outputs.
- `apps/admin`: small Vue/Vite operations console.
- `apps/api`: Hono HTTP control plane for auth, workflow commands, analytics, and deployment status.
- `packages/schema`: shared post metadata contract.
- `packages/api-client`: typed client helpers for the admin app.

The backend should not render the public blog. It only owns operational commands and state.

## Commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev:blog
pnpm dev:admin
pnpm dev:api
```

## Boundary

Public blog:

- `/`
- `/<slug>`
- `/<slug>.md`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`

Backend API:

- auth and authorization
- post workflow commands
- audit log
- deployment control and status
- analytics query endpoints
- provider webhooks
