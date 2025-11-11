# DailyGoldRate

A modern, responsive gold price tracking website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Real-time Gold Rates**: Display current prices for 24K, 22K, and 18K gold, plus silver
- **Price Trends**: Interactive charts showing historical price movements
- **Gold Calculator**: Calculate gold value based on weight (grams/tola) and purity
- **Blog System**: News and insights about the gold market
- **Admin Dashboard**: Secure interface to update rates
- **Dark/Light Mode**: Full theme support
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations throughout

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (database is already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Admin Access

Access the admin dashboard at `/admin`

**Demo Credentials:**
- Email: `admin@dailygoldrate.com`
- Password: `admin123`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── GoldCalculator.tsx
│   ├── PriceChart.tsx
│   ├── BlogPreview.tsx
│   └── Newsletter.tsx
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── BlogPage.tsx
│   ├── BlogDetailPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── AdminPage.tsx
├── contexts/          # React contexts
│   ├── GoldRateContext.tsx
│   └── ThemeContext.tsx
├── lib/              # Utilities
│   ├── supabase.ts
│   └── utils.ts
└── components/ui/    # shadcn/ui components
```

## Database Schema

### Tables

1. **gold_rates**
   - Stores historical gold and silver rates
   - Fields: gold_24k, gold_22k, gold_18k, silver, created_at, is_current

2. **blog_posts**
   - Blog articles and news
   - Fields: title, excerpt, content, image_url, slug, published, created_at

3. **admin_users**
   - Admin authentication
   - Fields: email, password_hash, created_at

## Features in Detail

### Home Page
- Hero section with current rates
- Interactive price chart
- Gold value calculator
- Blog post previews
- Newsletter subscription

### Blog
- Grid layout of articles
- Individual article pages
- Featured images from Pexels
- Publication dates

### Admin Dashboard
- Secure login
- Update gold rates (24K, 22K, 18K)
- Update silver rates
- View current published rates
- Instant updates to website

### About Page
- Company mission and values
- Team information
- Feature highlights

### Contact Page
- Contact form
- Contact information
- Social media links

## Design Details

- **Colors**: Gold (#FFD700), Navy (#0B0C10), White
- **Fonts**: Inter, System UI
- **Components**: shadcn/ui library
- **Animations**: Fade-in, slide-up effects
- **Transitions**: Smooth hover states

## Environment Variables

The project uses Supabase for data persistence. Environment variables are pre-configured in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Sample Data

The database is pre-populated with:
- Initial gold and silver rates
- 4 sample blog posts about gold market trends
- Admin user credentials

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
