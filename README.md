
# House of Beauty - E-commerce Website

A modern, responsive e-commerce website for beauty products built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 💬 Customer testimonials with photos/videos
- 📱 Responsive design
- 🎨 Customizable theme system
- 🔧 Admin panel for content management
- 💳 Payment integration ready
- 🌐 Multi-currency support

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd house-of-beauty
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME="House of Beauty"
VITE_APP_URL=https://yourdomain.com
```

## Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider
3. Set up environment variables in your hosting dashboard

### Traditional Hosting

1. Build the project: `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Configure your web server to serve `index.html` for all routes (SPA routing)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin panel components
│   └── ui/             # Base UI components (shadcn/ui)
├── config/             # Configuration files
│   ├── site.config.ts  # Site settings (contact, social, etc.)
│   └── theme.config.ts # Theme customization
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── pages/              # Page components
├── services/           # API services
└── lib/                # Utility functions
```

## Customization

### Colors and Theme
Edit `src/config/theme.config.ts` to change colors, fonts, and spacing.

### Site Information
Edit `src/config/site.config.ts` to update:
- Contact information
- Social media links
- Payment methods
- SEO settings

### Images and Assets
Place your images in the `public/` folder and update references in the config files.

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_public_supabase_key

# App Configuration
VITE_APP_NAME="House of Beauty"
VITE_APP_URL=https://yourdomain.com

# Optional Services
VITE_GA_TRACKING_ID=GA-XXXXXXXXX
VITE_SENTRY_DSN=https://your-sentry-dsn
```

## Database Setup

The project uses Supabase for the backend. You'll need to:

1. Create a Supabase project
2. Run the SQL migrations found in `supabase/migrations/`
3. Configure Row Level Security (RLS) policies
4. Add your credentials to the `.env` file

## Payment Integration

The codebase includes a payment structure ready for integration. See `src/components/PaymentStructure.tsx` for the implementation framework.

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading for pages and images
- Code splitting
- Optimized bundle size
- Responsive images

## Support

For issues and questions, please check the documentation or create an issue in the repository.

## License

This project is licensed under the MIT License.
