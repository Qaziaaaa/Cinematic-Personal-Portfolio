# 🎬 Cinematic Personal Portfolio

A high-end, immersive personal portfolio built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. Featuring a scroll-driven WebP frame sequence animation for a truly cinematic user experience.

## ✨ Features

- **🎥 Cinematic Parallax Hero**: Smooth, high-performance frame-by-sequence animation that reacts to user scroll.
- **📱 Fully Responsive**: Optimized for all devices, with a dedicated mobile experience.
- **🎨 Premium Aesthetics**: Modern design language with glassmorphism, subtle micro-animations, and curated typography.
- **⚡ Next.js 15 Optimized**: Leveraging the latest features of Next.js for speed and SEO.
- **🔧 Easy Configuration**: Managed via a central config file for quick personalization.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS-driven parallax & Scroll interactions
- **Assets**: Optimized WebP sequences

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cinematic-portfolio.git
cd cinematic-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📸 Frame Sequence Setup

This portfolio uses a local WebP frame sequence located in `public/frames/`. To update the animation:
1. Place your frames in `public/frames/`.
2. Update the `AVAILABLE_FRAMES` array in `src/components/ParallaxHero.tsx`.

## 📄 License

MIT License. Feel free to use this as a base for your own portfolio.
