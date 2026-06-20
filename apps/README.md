# Apps

Apps are the executable orchestrators of the blog system.

Current app source code is placeholder scaffolding only. Do not infer the target
architecture from sample routes, mock responses, or temporary UI screens.

## Intended Role

- Start runtimes and expose user-facing surfaces.
- Read runtime config and environment settings.
- Compose internal packages and concrete implementations.
- Keep framework entry points such as routing, rendering, command dispatch, and
  deployment startup close to the executable app that owns them.

Apps should stay thin. Domain rules, content rules, workflow policy, git
behavior, deployment details, and other product behavior should live in
`packages`, even when the first consumer is only one app.

## Boundaries

- [Blog App](./blog/README.md): owns public rendering and static blog output.
- `apps/admin`: owns the editor and operations UI.
- [API App](./api/README.md): owns command handling and server-side
  composition.

Apps can depend on internal packages, but packages should not depend on apps.
An app may decide which package implementations to use, but it should not own
the implementation logic itself.
