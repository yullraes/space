# My Blog

Git-based MDX publishing system for a personal blog.

This repository is organized around a small publishing workflow:

- write posts as MDX files in git
- edit and operate the blog through an admin UI
- execute admin actions through command-shaped API calls
- build the public blog as static output
- deploy the generated output to a home server

Current source code is placeholder scaffolding only. Use the README files as the
architecture guide while the implementation is still being shaped.

## Project Map

- [Apps](./apps/README.md): executable orchestrators and composition roots.
- `packages`: internal modules composed by apps; real behavior lives here.
- `docs`: local planning notes and technical decision records.

## Boundaries

- `apps/blog` orchestrates the public Astro/MDX blog renderer.
- `apps/admin` orchestrates the editor and operations UI.
- `apps/api` receives admin commands and composes server-side behavior.
- `packages` own application logic, domain rules, policies, ports, and concrete
  implementations.

Apps should not become the place where product behavior is implemented. They
wire runtime config, framework entry points, and package implementations, then
delegate the actual work to packages.

The public blog should not be rendered by the API. The API should not become a
RESTful public resource server. It is closer to an RPC command gateway for
editor and operations workflows.

## Content Model

Posts are git-based MDX bundles. A post is expected to live as a directory that
contains an `index.mdx` file plus any static files used by that post.

The public blog consumes publishable content and builds static output. Editing,
workflow commands, git operations, and deployment orchestration happen outside
the public renderer.

## Commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev:blog
pnpm dev:admin
pnpm dev:api
```
