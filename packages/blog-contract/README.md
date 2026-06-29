---
contract_scope: boundary
name: blog-contract
---

# Blog Contract Package

This package owns explicit, versionable contracts for the blog product boundary.

It is not a generic schema package and it is not a common DTO bucket. Consumers
should depend on this package only when they participate in the blog content or
blog admin boundary.

## Intended Role

- Define runtime schemas for blog post metadata and publishable content shapes.
- Define request, response, event, and error DTOs for blog admin workflows when
  those contracts cross package, app, or client boundaries.
- Export TypeScript types derived from those schemas.
- Keep blog contracts stable and framework-independent.

This package should not own UI rendering, HTTP transport, Hono handlers,
persistence, git behavior, deployment orchestration, workflow execution, or app
composition.

## Boundary

The contract belongs to the blog product cell. A new product or pivot should get
its own contract package instead of importing blog domain DTOs directly.

If another product needs blog data, translate from this contract at the boundary
rather than sharing internal blog models.

## Public Surface

Consumers should import from `@my-blog/blog-contract`.

The package entry point is `src/index.ts`; package exports are controlled by
`package.json`.
