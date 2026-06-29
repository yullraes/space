# Apps

Apps are deployable runtime shells and terminal nodes of the blog system.

Current app source code is placeholder scaffolding only. Do not infer the target
architecture from sample routes, mock responses, or temporary UI screens.

## Intended Role

- Start runtimes and expose user-facing surfaces.
- Read runtime config and environment settings.
- Create framework roots such as Hono apps, Astro builds, and React roots.
- Compose internal packages and concrete implementations.
- Mount package-provided adapters for routing, rendering, admin commands, and
  deployment startup.
- Own process-level concerns such as health checks and graceful shutdown.

Apps should stay thin and deliberately ignorant. Domain rules, content rules,
workflow policy, contract DTOs, git behavior, deployment details, and other
product behavior should live in `packages`, even when the first consumer is only
one app.

## Boundaries

- [Blog App](./blog/README.md): owns the public rendering runtime and static
  blog output shell.
- `apps/admin`: owns the editor and operations UI runtime.
- [API App](./api/README.md): owns the HTTP runtime and server-side composition
  for package-provided command adapters.

Apps can depend on internal packages, but packages should not depend on apps. An
app may decide which package implementations to use, but it should not own the
implementation logic itself.
