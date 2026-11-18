# Chao Phraya — Thai Restaurant Website

A responsive restaurant website built with Next.js 15, React 19, and Chakra UI. Website copy, menu details, and replacement photo links are read from the public [Chao Phraya DB Google Sheet](https://docs.google.com/spreadsheets/d/1itLRp1amEGWnwEktgMLzqyZxUZF1-6x-otRN-V7v1mk/edit?usp=sharing).

## Features

- Home, menu, about, and location pages
- English, Finnish, Swedish, and Thai content
- Menu categories, prices, spice levels, ingredients, and featured dishes managed in Sheets
- Website text and replacement image links managed in Sheets
- Content is server-fetched and cached for about one minute

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No CMS credentials or environment variables are needed. The spreadsheet must remain accessible to anyone with its link so the server can fetch the published tab data.

See [MENU_SETUP.md](./MENU_SETUP.md) for spreadsheet editing and image-link requirements.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Build and start production server
npm run lint       # Run ESLint
```
