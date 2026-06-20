---
version: alpha
name: Bordered Developer Journal
description: Text-first, thumbnail-free developer blog system using bold rules, generous gutters, and editorial minimalism.
colors:
  primary: "#111111"
  secondary: "#5F5F5F"
  tertiary: "#245BFF"
  neutral: "#F7F4EE"
  surface: "#FFFDF8"
  surface-muted: "#EFEAE2"
  border: "#111111"
  border-muted: "#D8D2C6"
  code-bg: "#1F1F1F"
  code-fg: "#F4F0E8"
  accent-soft: "#E8EEFF"
  on-primary: "#FFFDF8"
typography:
  display:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.035em
  headline-md:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.18
    letterSpacing: -0.03em
  headline-sm:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 750
    lineHeight: 1.28
    letterSpacing: -0.025em
  body-lg:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: -0.005em
  body-md:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: -0.005em
  body-sm:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  label:
    fontFamily: "Pretendard, Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
  code:
    fontFamily: "JetBrains Mono, SFMono-Regular, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  none: 0px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  xxxl: 64px
  huge: 96px
  gutter-sm: 20px
  gutter-md: 32px
  gutter-lg: 72px
  content-width: 720px
  code-width: 860px
  wide-width: 1040px
  border-hairline: 1px
  border-section: 2px
  border-emphasis: 3px
  border-heavy: 4px
borders:
  hairline: 1px
  section: 2px
  emphasis: 3px
  heavy: 4px
shadows:
  none: "none"
  hard: "4px 4px 0 #111111"
motion:
  feedback: 120ms
  content: 180ms
  easing: "cubic-bezier(0.2, 0, 0, 1)"
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    padding: "{spacing.gutter-md}"
  article:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-lg}"
    width: "{spacing.content-width}"
    padding: "{spacing.xxxl}"
    rounded: "{rounded.none}"
  article-wide:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    width: "{spacing.code-width}"
    padding: "{spacing.xxxl}"
    rounded: "{rounded.none}"
  post-list-item:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    padding: "{spacing.xl}"
    rounded: "{rounded.none}"
  post-meta:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  divider-strong:
    backgroundColor: "{colors.border}"
    height: "{spacing.border-section}"
  divider-muted:
    backgroundColor: "{colors.border-muted}"
    height: "{spacing.border-hairline}"
  link:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.tertiary}"
    typography: "{typography.body-md}"
  inline-code:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.code}"
    rounded: "{rounded.xs}"
    padding: "{spacing.xs}"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-fg}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  callout:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  chip-accent:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
---

# Bordered Developer Journal

## Overview

This design system describes a personal developer blog for retrospectives, operational notes, implementation records, and practical knowledge sharing. The visual direction is **bordered editorial minimalism**: text first, generous gutters, bold structural rules, and no decorative thumbnail dependency.

The blog should feel like a well-kept engineering notebook rather than a media site. It is calm, precise, slightly austere, and intentionally unglamorous. The reader should sense that every line, margin, and heading exists to make the writing easier to scan, remember, and revisit.

The primary reference is a printed technical journal adapted to the web: warm paper, dense ink, strong rules, clear typographic hierarchy, and a restrained single accent. It borrows the confidence of soft neo-brutalism through visible borders, but avoids the loud, playful, poster-like side of neo-brutalism.

Images are not part of the default rhythm. A post list should work through title, date, category, tags, excerpt, and horizontal separation. Use an image only when the content itself requires a diagram, screenshot, or figure.

## Colors

The palette is a single-ink-plus-paper system with one restrained interactive accent.

- **Primary / Ink (`#111111`)** carries body copy, headlines, borders, and structural marks. It should feel definite, not glossy.
- **Secondary (`#5F5F5F`)** is used for metadata, dates, reading time, captions, and less important navigation.
- **Neutral / Paper (`#F7F4EE`)** is the page substrate. Prefer this over pure white to create a reading environment that feels like paper.
- **Surface (`#FFFDF8`)** is reserved for small raised content areas, code explanations, or table containers. It should not become a card-heavy layout.
- **Surface muted (`#EFEAE2`)** supports callouts, inline code, and subtle blocks.
- **Border (`#111111`)** is the main visual structure. Use it for major section divisions, post list separators, and page frames.
- **Border muted (`#D8D2C6`)** is used for internal table lines, footnote rules, and low-priority dividers.
- **Tertiary / Accent (`#245BFF`)** is used sparingly for links, active filters, focus rings, and one primary action per view.
- **Code background (`#1F1F1F`)** and **code foreground (`#F4F0E8`)** give code blocks a clear, utilitarian contrast without making the whole page dark.

Avoid gradients, glass tints, neon effects, and large color surfaces. The design should be mostly paper, ink, rule lines, and text.

## Typography

Use **Pretendard** as the primary Korean-first interface and reading typeface, with **Inter** and system fonts as fallback. Use **JetBrains Mono** for code and technical identifiers.

Headlines are bold and compact. They should act like section labels in a technical journal, not like marketing hero copy. Body text is slightly larger than a default UI paragraph and has generous line-height for long-form Korean and English mixed writing.

Recommended hierarchy:

- **Display** is only for the home page title or one major index heading.
- **Headline large** is for article titles.
- **Headline medium** is for page-level section titles.
- **Headline small** is for article subsections and post list titles.
- **Body large** is the default long-form article body.
- **Body medium** is for list excerpts, navigation, and supporting copy.
- **Body small** is for metadata and captions.
- **Label** is for tags, category chips, and compact technical labels. Use uppercase only for short English labels; do not force Korean text into uppercase-like styling.
- **Code** is used for code blocks, inline code, filenames, package names, commands, and machine-like metadata.

Keep line length near **68–76 characters** for prose. Do not stretch article text across the full viewport.

## Layout

The layout is governed by horizontal breathing room and a fixed reading measure.

- Default article width is `{spacing.content-width}`.
- Wider technical content, such as code-heavy articles or diagrams, may use `{spacing.code-width}`.
- The outer page shell may extend to `{spacing.wide-width}`, but long-form text should return to the article width.
- On small screens, use a fluid gutter equivalent to `clamp(20px, 5vw, 72px)`, derived from `{spacing.gutter-sm}`, `{spacing.gutter-md}`, and `{spacing.gutter-lg}`.
- Use the spacing scale for all vertical rhythm. Prefer `{spacing.xl}` and `{spacing.xxl}` for section separation; avoid arbitrary one-off margins.

The home page and archive pages should be list-first. A post list item should consist of metadata, title, excerpt, and tags. Separate items with a strong horizontal rule rather than cards with thumbnails.

A good default post list rhythm:

1. top border for the whole list,
2. each item padded vertically by `{spacing.xl}`,
3. item bottom border using `{borders.section}` and `{colors.border}`,
4. title first or metadata first depending on density,
5. excerpt max width around 60ch.

Article pages should have a quiet top area: title, date, tags, short description, then a strong rule before the body. Do not use a large image hero.

## Elevation & Depth

Depth is almost entirely flat. Visual hierarchy comes from **borders, spacing, typography, and contrast**, not blur or shadow.

Default shadow is `{shadows.none}`. A hard offset shadow `{shadows.hard}` may appear only on rare interactive or editorial emphasis elements, such as a featured note, but should not be used for every post item or card. Overusing hard shadow will push the design into playful neo-brutalism, which is not the goal.

Use borders as structure:

- `{borders.hairline}` for internal dividers, table rows, and footnote rules.
- `{borders.section}` for post list items, article header separators, and major sections.
- `{borders.emphasis}` for page frames or important callouts.
- `{borders.heavy}` only for rare editorial emphasis.

Do not simulate depth with glassmorphism, translucent panels, background blur, soft drop shadows, or floating card stacks.

## Shapes

Shapes are mostly square. The system should feel engineered and editorial, not rounded and app-like.

- Use `{rounded.none}` for article containers, list items, and section boxes.
- Use `{rounded.xs}` or `{rounded.sm}` for inline code, buttons, controls, and code blocks when a small amount of softness improves usability.
- Use `{rounded.full}` only for compact tags or chips.
- Avoid large rounded cards, pill-shaped navigation bars, and overly soft containers.

Sharpness is part of the identity. When in doubt, reduce the radius.

## Components

**Page shell**  
Use `{colors.neutral}` as the base, `{colors.primary}` for text, and generous responsive gutters. The shell should feel like a page on a desk, not an app canvas.

**Header**  
The header should be compact and rule-based. Use text navigation, a strong bottom border, and minimal active states. Avoid large logos, avatar imagery, or decorative mastheads.

**Post list item**  
Post items are text-only by default. Use title, date, category, tags, and a short excerpt. Separate entries with a strong border. Do not reserve space for thumbnails.

**Article header**  
The article header should include title, metadata, tags, and optional summary. End it with a strong horizontal rule before the article body.

**Article body**  
Use `{typography.body-lg}` and keep paragraphs spacious. Headings should be bold, clear, and close to the content they introduce. Long technical explanations should breathe; do not overcompress vertical spacing.

**Links**  
Use `{colors.tertiary}` for inline links. Prefer underline on hover/focus. Links should be visible but not visually louder than headings.

**Tags / chips**  
Tags are compact metadata, not decorative badges. Use neutral chips by default and accent chips only for active filters.

**Code block**  
Code blocks use `{colors.code-bg}` and `{colors.code-fg}`. They may extend wider than prose on desktop, but should remain aligned with the article rhythm. Provide comfortable padding and preserve line wrapping or horizontal scroll intentionally.

**Inline code**  
Use `{colors.surface-muted}`, small padding, and a tiny radius. Inline code should be readable inside Korean sentences without disrupting line height too much.

**Callout**  
Callouts use muted paper, strong left border or full border, and body typography. They should look like notes in the margin of a technical document, not colored alert banners.

**Tables**  
Tables should use strong outer borders and hairline internal dividers. Avoid zebra stripes unless the table is dense enough to require them.

**Buttons**  
Buttons are rare. This is a reading product, not a conversion product. Use a black primary button for unavoidable primary actions and a text-link style for secondary actions.

## Do's and Don'ts

- **Do** make the writing the dominant visual element.
- **Do** use strong horizontal rules to separate sections, posts, and article headers.
- **Do** keep article measure narrow enough for reading, usually around `{spacing.content-width}`.
- **Do** let archives and lists be text-first and thumbnail-free.
- **Do** use one accent color sparingly for links, focus states, and active filters.
- **Do** use warm paper backgrounds instead of pure white when possible.
- **Do** make code blocks utilitarian, high-contrast, and comfortable to scan.
- **Do** preserve generous left and right gutters on large screens.
- **Don't** add thumbnail image slots to post lists by default.
- **Don't** use glassmorphism, translucent blur, glossy gradients, or glow effects.
- **Don't** turn every piece of content into a rounded card.
- **Don't** use soft drop shadows for hierarchy; use borders and spacing.
- **Don't** overuse hard neo-brutalist shadows. One or two editorial emphasis moments are enough.
- **Don't** create a large marketing-style hero for the blog home page.
- **Don't** make metadata louder than the title or body.
- **Don't** introduce more than one accent color without a strong editorial reason.
- **Don't** use images as decoration. Use them only when they explain something.
