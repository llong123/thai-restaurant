# Chao Phraya - Thai Restaurant Website

A modern, responsive website for Chao Phraya Thai Restaurant built with Next.js 15, Chakra UI, and Sanity CMS.

## Features

- **Modern Tech Stack**: Next.js 15, React 19, Chakra UI v3
- **Content Management**: Sanity CMS with embedded Studio
- **Internationalization**: Multi-language support (English/Thai)
- **Animations**: Smooth animations with Framer Motion
- **Responsive Design**: Mobile-first approach with Chakra UI
- **Theme Support**: Light/dark mode toggle

## Pages

- **Home**: Hero section, signature dishes carousel, about preview, location map
- **Menu**: Full menu with dish details and modals
- **About**: Restaurant story and information
- **Location**: Address, hours, contact info with embedded map
- **Studio**: `/studio` - Sanity CMS for content management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Chakra UI v3
- **CMS**: Sanity.io
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4, Emotion
- **Language**: TypeScript
- **Data Fetching**: SWR

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm or bun
- Sanity CLI (`npm install -g sanity`)

### Installation

```bash
# Install dependencies
npm install

# or
yarn install

# or
pnpm install

# or
bun install
```

### Environment Variables

Create a `.env.local` file with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Sanity Studio

Access the embedded CMS at [http://localhost:3000/studio](http://localhost:3000/studio)

To run Sanity Studio separately:

```bash
cd studio
sanity dev
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── location/           # Location page
│   │   ├── menu/               # Menu page
│   │   ├── studio/             # Sanity Studio
│   │   ├── footer.tsx          # Footer component
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── ui/                 # UI primitives
│   │   ├── DishCarouselComponent.tsx
│   │   ├── NavigationComponent.tsx
│   │   └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── AppDataContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── useThemeColors.ts
│   ├── lib/                    # Utilities and types
│   │   ├── interfaces/         # TypeScript interfaces
│   │   ├── translations.ts     # i18n utilities
│   │   └── ...
│   ├── sanity/                # Sanity configuration
│   │   ├── schemaTypes/        # Content schemas
│   │   ├── lib/                # Sanity utilities
│   │   └── env.ts              # Environment config
│   └── pages/                  # API routes
│       ├── api/
│       │   ├── about.ts
│       │   ├── dish.ts
│       │   ├── footer.ts
│       │   ├── homepage.ts
│       │   ├── location.ts
│       │   └── menu.ts
│       └── _app.tsx
├── public/                     # Static assets
├── sanity.config.ts            # Sanity Studio config
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
└── tsconfig.json               # TypeScript config
```

## Sanity Schemas

The project includes the following content schemas:

- `homepage` - Home page content (hero, signature dishes, about)
- `navigation` - Navigation menu items
- `menu` - Menu categories and dishes
- `dish` - Individual dish details
- `about` - About page content
- `location` - Location and contact information
- `footer` - Footer content

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy

### Sanity

Deploy Sanity Studio to Sanity's hosting:

```bash
sanity deploy
```

## License

Private project.
