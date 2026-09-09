# WebForge

Professional web design and full-service website management for small and medium-sized businesses. Built for cafes, barbershops, car washes, restaurants, and service providers.

## Features

- **Multilingual Support** — Full English and Bulgarian language toggle
- **Instant Quote Calculator** — Interactive multi-step form that generates a price estimate in under 60 seconds
- **Portfolio Showcase** — Visual project gallery with industry-specific examples
- **Booking Integration** — Free consultation scheduling via Google Calendar and Google Meet
- **Admin Dashboard** — Secure backend to manage incoming quote requests
- **Privacy Policy Page** — GDPR-compliant data protection page, fully translated
- **Responsive Design** — Optimized for mobile, tablet, and desktop

## Technologies

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Backend / Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/webforge.git
   cd webforge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example file and fill in your Supabase credentials:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the placeholder values with your actual Supabase project URL and anon key.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

## Deployment on Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will automatically detect the Vite framework.
4. Add the environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings under **Environment Variables**.
5. Deploy.

## Project Structure

```
├── public/
│   └── portfolio/          # Portfolio images
├── src/
│   ├── components/         # React components
│   ├── i18n/               # Translations and language context
│   ├── lib/                # Supabase client
│   ├── App.tsx             # Root component and routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── supabase/
│   └── migrations/         # Database migration files
├── .env.example            # Example environment variables
├── vercel.json             # Vercel deployment config
├── tailwind.config.js      # Tailwind configuration
└── vite.config.ts          # Vite configuration
```

## License

All rights reserved. © 2026 WebForge.
