---
contract_scope: boundary
name: api
---

# API App

This app is the HTTP runtime shell for the blog admin command gateway.

Current source code is intentionally minimal scaffolding. Do not add sample
`GET` routes or mock responses as API design placeholders.

## Intended Role

- Start the HTTP server.
- Read runtime config.
- Create the Hono app and install global middleware.
- Build the API DI container or call `createXXX` factories.
- Choose concrete package implementations for content storage, workflow policy,
  git, and home-server deployment.
- Mount package-provided Hono adapters for admin command surfaces.
- Expose runtime-only routes such as health checks.
- Handle graceful shutdown.

`apps/api` should stay thin and deliberately ignorant. It is a composition root,
not the place for command DTO validation, content rules, publishing policy, MDX
parsing, git behavior, deployment logic, or command execution.

## Composition

The HTTP server is implemented with Hono, but Hono is only the transport layer.
Product-specific route handlers should live in package-owned Hono adapters, for
example `packages/blog-admin-api-hono`.

A Hono adapter package may parse HTTP requests, validate contract DTOs, call
package-owned application services or command handlers, and map results back to
HTTP. The API app mounts that adapter and supplies concrete dependencies.

Example shape:

```ts
const app = createBaseHonoApp();

installBaseMiddlewares(app);
installErrorHandler(app);

app.route("/admin", createBlogAdminApi({ contentStore, publisher, deployer }));

serve({ fetch: app.fetch, port });
```

Object creation should be centralized for the API runtime. Use a DI container
and/or explicit `createXXX` factory functions so dependencies are assembled at
the API composition root instead of being constructed inside package handlers.
The composition root may choose concrete package implementations, but the actual
behavior must remain in `packages`.

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
content-serving surface. Its job is to start the HTTP runtime, compose package
implementations, and mount package-owned command adapters.

## Entry Point

This section will collect links to the internal package documents that this app
depends on. Keep it as the first stop for understanding which packages are
composed by the API app.
