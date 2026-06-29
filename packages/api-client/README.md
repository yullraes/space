---
contract_scope: boundary
name: api-client
---

# API Client Package

This package owns browser-side client code for calling the blog admin API.

## Intended Role

- Provide typed client methods for admin/editor workflows.
- Translate UI calls into command-shaped HTTP requests.
- Depend on explicit blog contracts from `@my-blog/blog-contract`.

The API client should not own React UI state, server command handling, content
rules, git behavior, deployment orchestration, public blog rendering, or generic
shared DTO definitions.

## Boundary

This package is a client adapter for the blog admin boundary. It should follow
the blog contract package and should not become a cross-product common client.

## Public Surface

Consumers should import from `@my-blog/api-client`.

The package entry point is `src/index.ts`; package exports are controlled by
`package.json`.
