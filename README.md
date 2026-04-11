<p align="center">
  <img src="./frontend/public/proofveil-badge.png" alt="Proofveil badge" width="128" height="128" />
</p>

# Proofveil 🌑

> **Truth you can prove. Privacy you can trust.**

Proofveil is a decentralized anonymous reporting platform built on [Midnight Network](https://midnight.network) — the first blockchain with native zero-knowledge privacy.

## What it does

Users can submit reports/messages that are **publicly stored on the Midnight blockchain** while their **identity remains completely hidden**. No wallet address, no name, no IP — just verifiable, immutable truth.

## How it works

1. User types a message in the Proofveil UI
2. The `storeMessage()` Compact circuit generates a ZK proof locally
3. Only the proof + message is broadcast to Midnight — never the user's identity
4. The message is permanently stored in the `ledger message` state on-chain
5. Anyone can read the message; no one can know who wrote it

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Compact (Midnight's ZK language) |
| Blockchain | Midnight Network (Preprod) |
| Privacy | Zero-Knowledge Proofs (ZK-SNARKs) |
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |

## Deployed Contract

- **Address:** `9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4`
- **Network:** Midnight Preview
- **Deployed:** April 10, 2026

## Run Locally

```bash
# Backend (requires Docker + Node 20)
cd my-fresh-app
npm install
docker run -p 6300:6300 midnightntwrk/proof-server:7.0.0
npx tsx src/deploy.ts

# Frontend
cd frontend
npm install
npm run dev
```

## Live Demo

[proofveil.vercel.app](https://proofveil.vercel.app)

---

Built for Midnight Network Hackathon 2026
