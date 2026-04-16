# signal/noise

A minimal, warm Jekyll blog for tech writing.

## Stack

- **Jekyll 4.3** — static site generator
- **Dark-first theme** with light mode toggle (persisted in `localStorage`)
- **3 pages**: Home, Posts archive, About
- **Fonts**: DM Serif Display + DM Sans + DM Mono (Google Fonts)
- **No JS frameworks** — vanilla JS only
- **Responsive** down to mobile

## Setup

### 1. Install Ruby + Bundler

```bash
# macOS (Homebrew)
brew install ruby
gem install bundler

# Ubuntu/Debian
sudo apt install ruby-full build-essential zlib1g-dev
gem install bundler
```

### 2. Install dependencies

```bash
cd blog
bundle install
```

### 3. Run locally

```bash
bundle exec jekyll serve --livereload
# Open http://localhost:4000
```

### 4. Build for production

```bash
bundle exec jekyll build
# Output is in _site/
```

## Project structure

```
blog/
├── _config.yml          # Site config (title, author, plugins)
├── _layouts/
│   ├── default.html     # Base layout (nav, footer, scripts)
│   └── post.html        # Individual post layout
├── _posts/              # Your markdown posts go here
│   └── YYYY-MM-DD-title.md
├── assets/
│   ├── css/
│   │   ├── main.css     # All styles (CSS variables, components)
│   │   └── syntax.css   # Rouge code highlighting
│   └── js/
│       └── main.js      # Theme toggle, search, scroll effects
├── index.html           # Home page (featured, pinned, recent, by topic)
├── posts.html           # Full archive with search + category filters
├── about.html           # About page
├── 404.html             # 404 page
└── feed.xml             # RSS feed
```

## Writing posts

Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-04-16
category: systems          # systems | security | ai | web | tools | thoughts
tags: [linux, kernel]
featured: false            # shows large on home page
pinned: false              # shown with pin icon on home page
read_time: 8               # minutes (optional)
excerpt: "One sentence summary shown in cards and meta."
---

Your content here. Markdown works fully — code blocks, blockquotes, headers, etc.
```

### Categories

| Key        | Label               |
|------------|---------------------|
| `systems`  | Systems             |
| `security` | Security            |
| `ai`       | Artificial Intelligence |
| `web`      | Web Dev             |
| `tools`    | Tools & Workflow    |
| `thoughts` | Thoughts            |

## Customising

### Colors

Edit CSS variables in `assets/css/main.css` under `:root` (dark) and `[data-theme="light"]`.

The three main colors are:
- `--bg` — background
- `--text-primary` — body text
- `--accent` — warm amber highlight (`#c8a97e` dark / `#a0713c` light)

### Site info

Edit `_config.yml` — update `title`, `tagline`, `description`, `author`.

### About page

Edit `about.html` directly — update the bio, experience timeline, interests, and contact links.

## Deployment

Any static host works: **GitHub Pages**, **Netlify**, **Cloudflare Pages**, **Vercel**.

### GitHub Pages

```yaml
# .github/workflows/jekyll.yml
name: Deploy Jekyll
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/jekyll-build-pages@v1
      - uses: actions/deploy-pages@v4
```

### Netlify

Connect your repo. Build command: `jekyll build`. Publish directory: `_site`.
