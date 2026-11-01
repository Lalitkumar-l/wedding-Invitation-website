# Lalit & Usha Wedding Invitation

Premium sage-green + cream wedding invitation website built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Next phase

Replace placeholder photo blocks with real wedding photos, finalize event/venue data, add music, gallery lightbox, RSVP WhatsApp number, and deployment configuration.


## Story timeline update
The Our Story section now uses a larger editorial timeline with alternating photo cards.
The first chapter is set to **2019 — First Meet** and the final chapter remains **2026 — Wedding**.
Each chapter keeps its own image slot configured in `src/data/weddingData.js`.

### Story image files
Add these files under `public/images/` (or change the matching paths in `weddingData.js`):
- `story-first-meet.jpg`
- `story-friendship.jpg`
- `story-together.jpg`
- `story-engagement.jpg`
- `story-wedding.jpg`

### Run locally
```bash
npm install
npm run dev
```

Create a production build with:
```bash
npm run build
```


## GitHub Pages preparation

- Vite is configured with `base: './'` so the site can run from a GitHub Pages project URL.
- Public image and music paths use relative URLs for project-subpath hosting.
- Do not upload `node_modules/` or `dist/`; install dependencies and build when deploying.
