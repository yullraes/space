---
contract_scope: boundary
name: blog
---

# Blog App

This app is the public renderer for the blog.

Current source code is placeholder scaffolding only. Do not infer the target
content model, route shape, or publishing behavior from the existing sample
pages.

## Intended Role

- Build the public blog from MDX content.
- Render published posts, index pages, RSS, sitemap, robots, and LLM-facing text
  outputs.
- Own presentation, layout, styling, SEO tags, and Astro-specific rendering.
- Support Astro MDX features, including client-side hydrated components inside
  MDX when they are part of the build.

`apps/blog` should stay focused on public rendering. It should not own editor
workflow, command handling, git operations, deployment orchestration, or content
mutation.

## Boundary

The source of truth for posts is git-based MDX content.

The blog app consumes publishable content and produces static public output. It
does not serve as the admin API, editor backend, or canonical content store.

Draft editing and operational commands belong to `apps/admin` and `apps/api`.

## Entry Point

This section will collect links to the internal package documents that this app
depends on. Keep it as the first stop for understanding which packages feed the
public blog build.
