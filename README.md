# aievalsguy.xyz

Personal site for Sourav Sarkar — AI evaluation, AI product management, and strategy.

The site is a single page built as a desk: an identity panel and a folder index on the left, and a note window on the right that opens when a folder is picked. Folders open as tabs; on desktop the note window can be dragged and resized, and on mobile it becomes a bottom sheet.

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
| `quote` | Pulled quotes, used for feedback and the award citation |
| `image` | Certificates and screenshots from `public/` |
| `links` | External links, rendered with an arrow |

To add a folder, append to the `folders` array. Counts in the sidebar, the search index, and the no-JavaScript fallback all derive from that data automatically.

## How it is built

- `src/app/layout.tsx` — metadata, Person schema, and the inline script that applies the saved theme before first paint.
- `src/app/page.tsx` — renders the desk plus a full `<noscript>` copy of every note, so the site is readable and indexable without JavaScript.
- `src/components/Desk.tsx` — the interactive surface: tabs, reader, dragging, resizing, the mobile sheet, and search.
- `src/app/globals.css` — design tokens and all styling. The two-pane split inside the note window is a container query on `.note`, so the window reflows when resized rather than tracking the viewport.

Keyboard: `⌘K` / `Ctrl+K` opens search, typing any letter opens it too, and `Escape` steps back out of the reader, then the window.

## Deploy

Deploy with Vercel, then add `aievalsguy.xyz` under the project's Domains settings and create the DNS records Vercel provides at the registrar.
