# API App

This app is the command gateway for the blog system.

Current source code is intentionally minimal scaffolding. Do not add sample
`GET` routes or mock responses as API design placeholders.

## Intended Role

- Start the HTTP server.
- Read runtime config.
- Validate incoming command DTOs.
- Build the API DI container or call `createXXX` factories.
- Compose package-provided implementations for content storage, workflow
  policy, git, and home-server deployment.
- Execute application commands and return command results.

`apps/api` should stay thin. It is a composition root, not the place for content
rules, publishing policy, MDX parsing, git behavior, or deployment logic.

## Composition

The HTTP server is implemented with Hono, but Hono is only the transport layer.
Route handlers should adapt HTTP requests into command DTOs, call package-owned
application services or command handlers, and map the result back to HTTP.

Object creation should be centralized for the API. Use a DI container and/or
explicit `createXXX` factory functions so dependencies are assembled at the API
composition root instead of being constructed inside handlers. The composition
root may choose concrete package implementations, but the actual behavior must
remain in `packages`.

## API Style

The API is intentionally closer to RPC than REST.

Admin/editor clients should send command requests, not operate on public
resources through RESTful `GET/POST/PATCH/DELETE` routes.

Examples of command-shaped operations:

- `loadPostForEditing`
- `saveDraftPost`
- `publishPost`
- `archivePost`
- `uploadPostAsset`
- `triggerDeploy`
- `getDeploymentStatus`

Read-like operations can still be commands when they serve the admin workflow.
For example, `loadPostForEditing` reads content, but it is still modeled as an
admin command rather than a public resource request.

## Boundary

The public blog is rendered by `apps/blog`.

This API does not render the public blog and should not become the public
content-serving surface. Its job is to coordinate editor and operations actions.

## Entry Point

This section will collect links to the internal package documents that this app
depends on. Keep it as the first stop for understanding which packages are
composed by the API app.
