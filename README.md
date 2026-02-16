# SpendIQ — Customer Spending Insights Dashboard

A production-grade, responsive financial analytics dashboard built with React 18 that displays customer spending data through interactive charts, filterable transactions, and budget tracking.

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite (SWC) |
| Routing | TanStack Router |
| Server State | TanStack Query |
| Client State | Zustand |
| Validation | Zod |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Date Utilities | date-fns |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |
| Linting | ESLint + Prettier |

## Features

- **Summary KPI Cards** — Total spent, transaction count, average transaction, top category with period-over-period comparison
- **Category Breakdown** — Interactive donut chart with detailed category list
- **Monthly Trends** — Area chart showing 12-month spending history
- **Budget Goals** — Progress bars tracking monthly spending limits by category
- **Transactions Table** — Sortable, filterable, paginated transaction list with category and sort controls
- **Period Selector** — Quick presets (7d/30d/90d/1y) and custom date range inputs
- **Dark Mode** — System-aware theme toggle with ThemeProvider
- **Responsive Layout** — Mobile-first design with collapsible sidebar navigation
- **4 Routes** — Dashboard, Transactions, Analytics, Goals

## Architecture

```
src/
├── api/          # Mock API layer (swap-ready for real API)
├── components/   # UI primitives + dashboard features + layout
├── hooks/        # TanStack Query hooks for data fetching
├── lib/          # Utility functions (currency, dates, etc.)
├── routes/       # TanStack Router route definitions
├── schemas/      # Zod validation schemas
├── stores/       # Zustand state management
├── test/         # Test setup and utilities
└── types/        # Global TypeScript type definitions
```

**Mock → Real API**: The `api/client.ts` module checks for `VITE_API_BASE_URL`. When unset, it serves mock data with simulated latency. Set the env var to point at a real API — the interface stays identical.

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Install & Run

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
yarn build
yarn preview
```

### Run Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

### Lint & Type Check

```bash
yarn lint
yarn types
```

## Docker

### Build & Run

```bash
# Build the image
docker build -t spendiq .

# Run the container (PORT defaults to 8000 in the nginx config)
docker run -p 8080:8000 spendiq
```

The app will be available at `http://localhost:8080`.

### What the Dockerfile Does

1. **Build stage** — Installs deps, compiles TypeScript, bundles with Vite
2. **Serve stage** — Copies the static build into an Nginx Alpine container with SPA routing support and dynamic `PORT` substitution via `envsubst` (Render-compatible)

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the real API (omit to use mock data) | `""` (mock mode) |
| `PORT` | Port for the Nginx container (used by Render/Docker) | `8000` |

## Testing Strategy

- **Unit tests** — Utility functions (`formatCurrency`, `formatDate`, `cn`)
- **Schema tests** — Zod schemas validate all mock data matches the API contract
- **Component tests** — UI primitives (Card, ProgressBar) render correctly
- **Store tests** — Zustand store state transitions and resets

## License

MIT
