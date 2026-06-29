---
contract_scope: boundary
name: admin
---

# Admin App

This app owns the editor and operations UI runtime for the blog system.

Current source code is placeholder scaffolding only. Do not infer the target
workflow model, API shape, or operations policy from temporary UI screens.

## Intended Role

- Render the admin/editor user interface.
- Call the admin API through package-owned client code.
- Keep browser-only UI state, interaction flows, styling, and view composition
  close to the React app.
- Delegate content rules, workflow policy, git operations, deployment behavior,
  and API DTO contracts to product contract and workflow packages.

`apps/admin` should stay focused on user interaction. It should not own server
commands, content storage, publish policy, git behavior, deployment logic, or API
contract definitions.

## Boundary

The admin app consumes package-provided client contracts and presents workflows
for editing and operating the blog.

It does not render the public blog and does not execute server-side admin
commands directly.

## Entry Point

This section will collect links to the internal package documents that this app
depends on. Keep it as the first stop for understanding which packages feed the
admin UI.
