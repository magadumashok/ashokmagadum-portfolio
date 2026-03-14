# Ashok Magadum — Portfolio Website

**Live site:** [ashokmagadum.com](https://ashokmagadum.com)

Senior AI Product Leader portfolio built with Next.js 14 (App Router) + Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion + CSS Keyframes |
| Icons | Lucide React |
| Language | TypeScript |
| Deployment | Ubuntu 22.04 EC2 + PM2 + Nginx |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies

```bash
cd /Users/ashokmagadum/Documents/Land\ PM\ Job/portfolio
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Global styles + animations
│   └── products/
│       └── [slug]/
│           └── page.tsx    # Dynamic product detail pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with smooth scroll
│   │   └── Footer.tsx      # Footer with links
│   ├── sections/
│   │   ├── Hero.tsx        # Full-screen hero with typewriter
│   │   ├── About.tsx       # Bio + differentiators
│   │   ├── Portfolio.tsx   # Product grid with filters
│   │   ├── Skills.tsx      # Skill categories
│   │   ├── Experience.tsx  # Accordion timeline
│   │   └── Contact.tsx     # Contact form
│   └── ui/
│       ├── ProductCard.tsx     # Portfolio card component
│       └── AnimatedCounter.tsx # Scroll-triggered counter
└── data/
    ├── products.ts         # 6 AI product case studies
    └── experience.ts       # Career history data
```

---

## Customization

### Adding your resume
Place your resume PDF at `public/resume.pdf`. The "Download Resume" button in the Navbar links to this path.

### Adding your photo
Replace the "AM" monogram in `Hero.tsx` and `About.tsx` with a Next.js `<Image>` component pointing to `public/photo.jpg`.

### Updating contact form
The contact form in `Contact.tsx` currently simulates a send. To make it functional:

1. **Resend** (recommended): Sign up at [resend.com](https://resend.com), create an API route at `src/app/api/contact/route.ts`, and call it from the form.
2. **Formspree**: Replace the form action with your Formspree endpoint.

### Updating content
All content is centralized in:
- `src/data/products.ts` — Portfolio case studies
- `src/data/experience.ts` — Work history
- Individual section files for bio text, skills, etc.

---

## Deployment

### Local production test

```bash
npm run build && npm start
```

### Deploy to Ubuntu 22.04 EC2

```bash
# 1. SSH into your server
ssh ubuntu@your-server-ip

# 2. Clone or copy files to the server

# 3. Run the setup script
sudo bash deploy/setup.sh
```

See `deploy/setup.sh` for the complete automated setup. It handles:
- Node.js 18 via nvm
- PM2 process manager
- Nginx reverse proxy
- SSL via Let's Encrypt (Certbot)
- UFW firewall

### PM2 Commands

```bash
pm2 logs ashok-portfolio       # Stream logs
pm2 monit                      # Live dashboard
pm2 reload ashok-portfolio     # Zero-downtime restart
pm2 stop ashok-portfolio       # Stop
pm2 restart ashok-portfolio    # Hard restart
```

---

## Public Directory

The `public/` directory is intentionally empty in this repository. Add the following files before deploying:

| File | Purpose |
|---|---|
| `public/resume.pdf` | Downloadable resume (linked from Navbar) |
| `public/favicon.ico` | Browser tab icon |
| `public/photo.jpg` | (Optional) Professional headshot |
| `public/og-image.png` | (Optional) Open Graph social share image |

---

## Performance

- Next.js static generation for product detail pages (`generateStaticParams`)
- Image optimization via `next/image`
- Font optimization via Google Fonts with `display=swap`
- Gzip compression in Nginx
- Static asset caching (`Cache-Control: immutable, max-age=31536000`)
- CSS animations hardware-accelerated via `transform` and `opacity`

---

## License

Copyright 2024 Ashok Magadum. All rights reserved.
