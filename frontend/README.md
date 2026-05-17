# Prelegal Frontend

Prototype Next.js application for [PL-3: Mutual NDA creator](https://ahmadabusaif.atlassian.net/browse/PL-3).

The user fills in cover-page information, sees a live preview of the Common Paper Mutual NDA, and downloads it as a PDF.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- `@react-pdf/renderer` for PDF export

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run typecheck` — TypeScript check

## Notes

The Mutual NDA Standard Terms are currently hard-coded in
`src/lib/nda-template.ts`. The canonical source is the markdown at
`../templates/Mutual-NDA.md` (Common Paper). Keep them in sync until a
build-time generator is in place.
