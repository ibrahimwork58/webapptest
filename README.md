# Mobile-Optimized SvelteKit PWA

A smooth, native-like mobile progressive web app built with SvelteKit, Tailwind CSS, and Motion One.

## Features

✅ **Native-like Experience**
- Bottom navigation with smooth animations
- Momentum scrolling
- Full-screen standalone mode
- Touch-optimized UI

✅ **Performance**
- Code-splitting and lazy loading
- GPU-accelerated animations
- Optimized images
- Lighthouse score >= 95

✅ **PWA Features**
- Offline support with service worker
- Add-to-home-screen capability
- Manifest configuration
- Runtime caching

✅ **Theme Support**
- System auto-detection
- Light/Dark modes
- Smooth transitions

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS (mobile-first)
- **Animations**: Motion One (GPU-accelerated)
- **Deployment**: Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create App Icons

You need to create three icon files in the `static/icons/` directory:

- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)
- `icon-maskable.png` (512x512px with safe zone)

You can use tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- Or create them manually with your design tool

**Quick command to generate icons from a source image:**
```bash
npx pwa-asset-generator source-icon.png static/icons --icon-only --type png
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
npm run preview
```

## Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect SvelteKit and deploy

### Option 3: Manual Deploy

```bash
# Build the project
npm run build

# Deploy the .svelte-kit directory
vercel --prod
```

## Project Structure

```
webapp/
├── static/
│   ├── manifest.json          # PWA manifest
│   ├── service-worker.js      # Service worker for offline support
│   └── icons/                 # App icons (you need to create these)
├── src/
│   ├── routes/
│   │   ├── +layout.svelte     # Root layout with navigation
│   │   ├── +page.svelte       # Home page
│   │   ├── gallery/
│   │   │   └── +page.svelte   # Gallery page
│   │   └── settings/
│   │       └── +page.svelte   # Settings page
│   ├── lib/
│   │   ├── components/
│   │   │   └── BottomNav.svelte
│   │   ├── stores/
│   │   │   └── theme.ts       # Theme management
│   │   └── utils/
│   │       └── animations.ts  # Animation presets
│   └── app.css                # Global styles
├── svelte.config.js           # SvelteKit config
├── tailwind.config.js         # Tailwind config
├── vite.config.ts             # Vite config
└── vercel.json                # Vercel deployment config
```

## Pages

### Home (`/`)
- Scrollable list with smooth transitions
- Staggered animations on load
- Momentum scrolling

### Gallery (`/gallery`)
- Responsive image grid (2-3 columns)
- Lazy loading with Intersection Observer
- Smooth scale animations

### Settings (`/settings`)
- Theme toggle (System Auto / Light / Dark)
- PWA installation prompt
- App information
- Feature list

## Performance Optimizations

1. **Code-Splitting**: Automatic route-based splitting by SvelteKit
2. **Lazy Loading**: Images load only when visible
3. **GPU Acceleration**: `transform: translateZ(0)` and `will-change` on animated elements
4. **Momentum Scrolling**: `-webkit-overflow-scrolling: touch`
5. **Service Worker**: Cache-first for assets, network-first for pages

## Testing PWA Features

### Test Offline Mode
1. Open DevTools → Application → Service Workers
2. Check "Offline" checkbox
3. Reload the page - it should still work

### Test Add to Home Screen
1. Open in Chrome on mobile or use DevTools mobile emulation
2. Go to Settings page
3. Click "Install Now" button (if available)
4. Or use browser menu → "Add to Home Screen"

### Run Lighthouse Audit
1. Open DevTools → Lighthouse
2. Select "Mobile" and "Progressive Web App"
3. Click "Generate report"
4. Verify scores >= 95 for Performance and PWA

## Customization

### Change Theme Colors
Edit `tailwind.config.js` and `static/manifest.json`:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Update App Name
Edit `static/manifest.json`:

```json
{
  "name": "Your App Name",
  "short_name": "App"
}
```

### Add More Pages
Create new directories in `src/routes/`:

```bash
mkdir src/routes/newpage
# Create +page.svelte inside
```

Update `BottomNav.svelte` to include the new route.

## Browser Support

- Chrome/Edge (latest)
- Safari (iOS 11.3+)
- Firefox (latest)
- Samsung Internet

## License

MIT

## Notes

- Icons are placeholders - replace with your own designs
- Images in gallery use picsum.photos - replace with your own images
- Service worker caches are versioned - update `CACHE_NAME` when deploying updates
# webapptest
