# aievalsguy.xyz

Personal site for Sourav Sarkar — AI evaluation, AI product management, and strategy.

The site is a single page built as a desk: an identity panel and a folder index on the left, and a stage on the right. The stage opens on an overview aimed at hiring managers and product leaders; picking a folder replaces it with a note window. Folders open as tabs; on desktop the window can be dragged and resized, and on mobile it becomes a bottom sheet.

Three folders hold everything: **work** (roles, selected deployments, evaluation practice, capabilities), **writing** (published posts), and **proof of work** (the award and written feedback, shown as original screenshots).

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed in the terminal.

## Editing content

All content lives in `src/content/site.ts` as typed data — nothing is hard-coded in markup. Each folder holds entries, and each entry is a list of blocks:

| Block | Use |
| --- | --- |
| `p` | A paragraph |
| `list` | Bulleted points |
| `stats` | Big-number metrics with captions |
| `quote` | Pulled quotes |
| `image` | Certificates and screenshots from `public/` |
| `links` | External links, rendered with an arrow |

To add a folder, append to the `folders` array. Counts in the sidebar, the search index, and the no-JavaScript fallback all derive from that data automatically.

The landing overview is a separate `overview` object in the same file: headline, positioning copy, the three top numbers, the outcome list, writing topics, and the proof summary. Its buttons open folders by id, so renaming a folder id means updating those calls in `src/components/Desk.tsx`.

## How it is built

- `src/app/layout.tsx` — metadata, Person schema, and the inline script that applies the saved theme before first paint.
- `src/app/page.tsx` — renders the desk plus a full `<noscript>` copy of every note, so the site is readable and indexable without JavaScript.
- `src/components/Desk.tsx` — the interactive surface: tabs, reader, dragging, resizing, the mobile sheet, and search.
- `src/app/globals.css` — design tokens and all styling. The two-pane split inside the note window is a container query on `.note`, so the window reflows when resized rather than tracking the viewport.

Keyboard: `⌘K` / `Ctrl+K` opens search, typing any letter opens it too, and `Escape` steps back out of the reader, then the window.

## Deploy

Deploy with Vercel, then add `aievalsguy.xyz` under the project's Domains settings and create the DNS records Vercel provides at the registrar.
