# Proofveil

> **Truth you can prove. Privacy you can trust.**

Proofveil is the first decentralized platform for anonymous, verifiable data reporting — powered by [Midnight's](https://midnight.network) zero-knowledge protocol.

---

## ✨ Features

- 🔐 **Zero-Knowledge Proofs** — Verify data authenticity without revealing sensitive details
- 🌐 **Decentralized Reporting** — Anonymous submissions secured by Midnight's ZK layer
- 📊 **Verifiable Data** — Cryptographic guarantees on every data point
- ⚡ **Real-time Dashboard** — Live leaderboards and institutional-grade analytics
- 🤖 **AI Assistant** — Context-aware guidance built into the platform

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:8080`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`.

---

## ☁️ Deploying to Vercel

This project is configured for zero-config deployment on [Vercel](https://vercel.com).

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

### Settings (auto-detected)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

SPA routing is handled via `vercel.json` — all paths rewrite to `index.html` so React Router works on direct URLs and page refreshes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | Radix UI + shadcn/ui |
| Routing | React Router v6 |
| State Management | TanStack Query |
| Charts | Recharts |
| ZK Protocol | Midnight Network |

---

## 📄 License

Private — All rights reserved.
