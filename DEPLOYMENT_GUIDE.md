
# House of Beauty - Deployment Guide

This guide will help you deploy your House of Beauty website to various hosting platforms.

## Quick Start

1. **Download the complete project**
2. **Install dependencies**: `npm install`
3. **Configure environment**: Copy `.env.example` to `.env` and fill in your details
4. **Build the project**: `npm run build`
5. **Deploy the `dist/` folder** to your hosting provider

## Environment Setup

### Required Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME="House of Beauty"
VITE_APP_URL=https://yourdomain.com
```

## Hosting Options

### 1. Netlify (Recommended for beginners)

**Steps:**
1. Build your project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Configure environment variables in Netlify dashboard
4. Set up custom domain (optional)

**Netlify Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### 2. Vercel

**Steps:**
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables in Vercel dashboard

### 3. Traditional Web Hosting (cPanel, etc.)

**Steps:**
1. Build your project locally: `npm run build`
2. Upload contents of `dist/` folder to your web root
3. Configure your web server for SPA routing:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 4. GitHub Pages

**Steps:**
1. Build your project: `npm run build`
2. Create a `gh-pages` branch
3. Push the contents of `dist/` to the `gh-pages` branch
4. Enable GitHub Pages in repository settings

## Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key

### 2. Set up Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category_id UUID REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Configure Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can read videos" ON videos FOR SELECT USING (true);

-- Admin access (you'll need to set up authentication)
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage videos" ON videos FOR ALL USING (auth.role() = 'authenticated');
```

## Performance Optimization

### 1. Image Optimization
- Use WebP format when possible
- Compress images before uploading
- Use appropriate image sizes (don't upload 4K images for thumbnails)

### 2. Caching
Configure your hosting provider to cache static assets:
- CSS/JS files: 1 year
- Images: 6 months
- HTML: 1 hour

### 3. CDN Setup
Consider using a CDN like Cloudflare for better global performance.

## SSL/HTTPS Setup

Most modern hosting providers (Netlify, Vercel, etc.) provide automatic SSL certificates. For traditional hosting:

1. Obtain an SSL certificate (Let's Encrypt is free)
2. Configure your web server to use HTTPS
3. Update your environment variables to use HTTPS URLs

## Custom Domain Setup

### DNS Configuration
Point your domain to your hosting provider:

**For Netlify:**
- Type: CNAME
- Name: www (or @)
- Value: your-site.netlify.app

**For Vercel:**
- Type: CNAME  
- Name: www (or @)
- Value: cname.vercel-dns.com

## Monitoring and Analytics

### Google Analytics (Optional)
1. Create a Google Analytics property
2. Add your tracking ID to `.env`:
```env
VITE_GA_TRACKING_ID=GA-XXXXXXXXX
```

### Error Monitoring (Optional)
1. Set up Sentry for error tracking
2. Add your DSN to `.env`:
```env
VITE_SENTRY_DSN=https://your-sentry-dsn
```

## Backup Strategy

### 1. Code Backup
- Use Git for version control
- Push to GitHub/GitLab regularly
- Tag important releases

### 2. Database Backup
- Supabase provides automatic backups
- Consider exporting data regularly for extra safety

## Troubleshooting

### Common Issues

**1. White screen after deployment**
- Check browser console for errors
- Verify all environment variables are set
- Ensure routing is configured correctly

**2. Images not loading**
- Check image paths (use relative paths)
- Verify image files are in the build output
- Check CORS settings if using external image sources

**3. API connection issues**
- Verify Supabase credentials
- Check network connectivity
- Review browser console for specific errors

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are correct
3. Ensure your Supabase project is properly configured
4. Test locally first with `npm run dev`

## Maintenance

### Regular Tasks
- Monitor site performance
- Update dependencies monthly
- Backup database regularly  
- Review and approve testimonials
- Update product catalog as needed

### Security Updates
- Keep dependencies updated
- Monitor for security advisories
- Review and update RLS policies as needed
