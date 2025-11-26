# soundsfair

An educational platform about Bitcoin, fair money, economic freedom, and sound monetary principles.

## 🎯 Project Overview

soundsfair is a comprehensive educational website designed to teach people about Bitcoin from zero to advanced, emphasizing fair money principles and economic sovereignty.

### Key Features

- **Educational Path**: 9-level progressive learning system covering fiat system failures, Bitcoin fundamentals, and geopolitics
- **DCA Calculator**: Interactive tool to compare Bitcoin performance against traditional assets (S&P500, Gold, MSCI World)
- **Video Curation**: Hand-picked YouTube content with curator notes
- **Lightning Integration**: Future support for Lightning Network payments
- **Multilingual**: English content (source material in Portuguese)

## 🎨 Brand Identity

- **Colors**: Black (#000000) + Libertarian Yellow (#FFD000)
- **Style**: Cyberpunk minimalist, high contrast
- **Typography**: Geist Sans + Geist Mono
- **Tone**: Educational, fact-first, libertarian-friendly

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **APIs**: CoinGecko (prices), OpenNode (Lightning)
- **Analytics**: Plausible (privacy-friendly)

## 📂 Project Structure

```
soundsfair-app/
├── app/
│   ├── components/     # Reusable React components
│   ├── api/           # API routes
│   ├── lib/           # Utility functions
│   ├── types/         # TypeScript types
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Homepage
│   └── globals.css    # Global styles
├── public/
│   ├── images/        # Static images
│   └── fonts/         # Custom fonts
└── ...config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📋 Development Roadmap

### Phase 1: Foundation (Month 1-2)
- ✅ Project setup
- ✅ Brand identity configured
- ✅ Initial homepage
- ⏳ Learn Next.js/TypeScript
- ⏳ Legal templates setup

### Phase 2: MVP Development (Month 3-5)
- ⏳ Homepage + Design System
- ⏳ DCA Calculator (core feature)
- ⏳ 3 essential content pages
- ⏳ Mobile-responsive

### Phase 3: Content (Month 6-7)
- ⏳ Learning Path Levels 1-4
- ⏳ Video curation (20 videos)
- ⏳ Quiz system

### Phase 4: Polish & Launch (Month 8-9)
- ⏳ SEO optimization
- ⏳ Performance tuning
- ⏳ Beta testing
- ⏳ Soft launch

## 🎯 Success Metrics

- **Month 7 (Beta)**: 500 unique visitors, 100 DCA calculations
- **Month 9 (Launch)**: 1,000 visitors, 500 calculations
- **Month 12**: 5,000 visitors/month, self-sustaining
- **Month 24**: 20,000+ visitors/month

## 📝 Environment Variables

See `.env.example` for required environment variables.

## 🤝 Contributing

This is a personal educational project. Contributions are welcome once the MVP is launched.

## 📄 License

Copyright © 2024 soundsfair. All rights reserved.

## 📞 Contact

- Website: [soundsfair.com](https://soundsfair.com) (coming soon)
- Twitter: [@soundsfair](https://twitter.com/soundsfair) (coming soon)

---

**Status**: 🚧 In Development (Week 1 - Setup Phase)

Built with ⚡ and 🟡 for Bitcoin education
