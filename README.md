# Proofveil 🛡️
> *Truth you can prove. Privacy you can trust.*

## 🌐 Live Demo
**https://proofveil.vercel.app**

## 📄 Smart Contract
| Field | Value |
|-------|-------|
| **Contract Address** | `9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4` |
| **Network** | Midnight Preview |
| **Deployed** | 2026-04-10 |
| **Language** | Compact (Midnight) |
| **Explorer** | [View on NightScan](https://explorer.preprod.midnight.network/contracts/9308246b6d4c9747efed80cd42792491e57d5881ff23d3fc28ba1ebefce865a4) |

## 💡 What is Proofveil?
The first decentralized platform for **anonymous, verifiable data reporting** powered by Midnight's zero-knowledge protocol.

Users submit sensitive records → get a **SHA-256 cryptographic hash** → hash is verifiable forever — without revealing content.

## ✨ Features
- 🔐 Real SHA-256 file hashing via Web Crypto API
- 🌙 Deployed Midnight smart contract (Compact language)
- 👁️ Zero-knowledge proof via PLONK ZK-SNARK
- 💼 Lace wallet connection
- 📊 Dashboard showing all secured records
- ✅ Audit Integrity hash verification
- 🔒 Wallet-gated pages

## 🛠 Tech Stack
- React + Vite + TailwindCSS
- Midnight Network (Preview)
- Compact smart contract
- Vercel deployment

## 🚀 Run Locally
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure
proofveil/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── pages/     # Dashboard, Submit, Verify
│   │   ├── components/# Navbar, Footer, Sidebar
│   │   └── hooks/     # useWalletGate
├── contracts/         # Midnight smart contract
│   └── hello-world.compact
└── deployment.json    # Contract deployment info
