# saeeedhany — ysm.dev blog

Minimal Astro blog. Terminal × classical aesthetic.

## Setup

```bash
npm install
npm run dev
```

## Assets to add to `public/`

- **`public/hero.png`** — The hero image (already included)
- **`public/avatar.jpg`** — Your profile photo

## File structure

```
src/
  content/
    posts/
      en/          ← English posts (.md / .mdx)
      ar/          ← Arabic posts (.md / .mdx)
  layouts/
    Base.astro     ← nav + footer
    Post.astro     ← post layout with side TOC
  pages/
    index.astro    ← homepage
    posts/
      index.astro  ← writing page (lang tabs + tag filter)
      en/[slug].astro
      ar/[slug].astro
  styles/
    global.css
public/
  hero.png
  avatar.jpg       ← ADD THIS
```

## Writing posts

### English — `src/content/posts/en/my-post.md`

```yaml
---
title: "Your post title"
date: 2025-01-15
tags: [systems, C, CLI]
description: "Optional short description"
cover: /images/cover.jpg   # optional
draft: false
---
```

URL will be: `/posts/en/my-post`

### Arabic — `src/content/posts/ar/my-post.md`

```yaml
---
title: "عنوان المقالة"
date: 2025-01-15
tags: [أنظمة, معمارية]
description: "وصف اختياري"
---
```

URL will be: `/posts/ar/my-post`

Direction, fonts, and date formatting are automatic.

## Palette

| Name       | Hex       |
|------------|-----------|
| background | `#0f0e0d` |
| phosphor   | `#4a9e5c` |
| amber      | `#c8a94a` |
| cream      | `#d4c9a8` |
| blue       | `#3a8fc4` |
| orange     | `#d4622a` |
