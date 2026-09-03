# Map Game

A kid-friendly geography learning game with flashcard and world map modes.

## Run locally

```bash
npm install
npm run dev
```

Open on iPad: connect to the same Wi-Fi and visit `http://<your-computer-ip>:5173`

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

Live at: https://ipvsean.github.io/map_game/

Pushes to `main` automatically deploy via GitHub Actions. In repo Settings → Pages, set source to **GitHub Actions**.

## Modes

- **Flashcards** — Multiple choice: "Where is Africa?"
- **World Map** — Drag region labels onto the correct spot on the map

## Adding regions

Edit `src/data/regions.ts` to add new batches of geography items.
