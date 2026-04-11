<div align="center">
 
<br/>
 
<img src="Screenshots/Banner-ProofVeil.png" alt="ProofVeil — Truth you can prove. Privacy you can trust." width="100%"/>
 
<br/><br/>
 
*ProofVeil is a zero-knowledge proof platform built on the Midnight blockchain.*
*Submit documents. Generate SHA-256 proofs. Verify authenticity — without revealing what's inside.*
 
<br/>
 
[![Midnight](https://img.shields.io/badge/Midnight-Preview_Testnet-7c3aed?style=flat-square&logoColor=white)](https://midnight.network)
[![Compact](https://img.shields.io/badge/Compact-Smart_Contract-5b21b6?style=flat-square)](https://docs.midnight.network/compact)
[![React](https://img.shields.io/badge/React-19-a78bfa?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-7c3aed?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-5b21b6?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-a78bfa?style=flat-square&logo=vercel&logoColor=white)](https://proofveil.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-7c3aed?style=flat-square)](LICENSE)
[![Track](https://img.shields.io/badge/Track-Identity_%26_Governance-5b21b6?style=flat-square)](https://midnight.network)
 
<br/>
 
[🎬 **Watch Demo**](#demo-video) &nbsp;&nbsp;|&nbsp;&nbsp;
[🔴 **Live App**](https://proofveil.vercel.app) &nbsp;&nbsp;|&nbsp;&nbsp;
[📜 **Contract on Explorer**](https://explorer.midnight-ntwrk.preview.midnight.network/contracts/8d847cc316c8a4ac838da90f21d363aed24915cb2a9e607c1fd2741bd8d61dad) &nbsp;&nbsp;|&nbsp;&nbsp;
[📑 **Slide Deck**](#slide-deck) &nbsp;&nbsp;|&nbsp;&nbsp;
[🐙 **GitHub**](https://github.com/vaibhavi-0320/proofveil)
 
<br/>
 
</div>
 
---
 
<div align="center">
 
## What makes ProofVeil different?
 
</div>
 
> Most document verification platforms store your files on a server. You hand over your data and trust a company not to misuse it. That trust has a cost — privacy, security, and control.
>
> ProofVeil replaces that trust with **zero-knowledge cryptography deployed on Midnight**. Your document never leaves your device. Only a SHA-256 hash is anchored on-chain. Anyone can verify the proof. Nobody can see what was proved.
 
```
You upload a file  →  SHA-256 hash generated locally  →  Hash stored on Midnight  →  Anyone verifies
                                                       →  Your document stays private — always
```
 
---
 
## 🏆 Hackathon Track — Identity & Governance
 
ProofVeil is submitted under the **Identity & Governance** track of the Midnight Hackathon.
 
### Why this track?
 
Identity and governance systems have one fundamental problem: proving something is true without revealing everything. A journalist needs to prove a document is authentic without revealing the source. A whistleblower needs to prove evidence exists without exposing themselves. An organisation needs to verify credentials without storing sensitive records.
 
ProofVeil solves this with Midnight's zero-knowledge protocol:
 
| Use Case | Traditional Approach | ProofVeil Approach |
| :------- | :------------------- | :----------------- |
| Document authentication | Upload to a server, trust the company | Hash locally, anchor on-chain, verify anywhere |
| Identity credential proof | Share the full document | Prove the hash matches — never share the file |
| Whistleblower protection | Risky — files stored on servers | ZK proof — nothing sensitive ever leaves the device |
| Governance audit trail | Centralised, mutable logs | Immutable, verifiable, privacy-preserving records |
 
---
 
## 🌐 Live Application
 
**[https://proofveil.vercel.app](https://proofveil.vercel.app)**
 
Connect your Midnight Lace wallet → Submit a document → Get a SHA-256 proof hash → Verify it on-chain — all without revealing the document contents.
 
---
 
## 🎬 Demo Video
 
<div align="center">
 
**[▶ Watch the full demo walkthrough](#)**
 
</div>
 
The demo covers every part of the working application:
 
- ✅ Landing page with Connect Wallet flow
- ✅ Submitting a document and generating a real SHA-256 hash
- ✅ Transaction anchored on Midnight Preview network
- ✅ Verify page confirming proof authenticity
- ✅ Dashboard showing full proof history
- ✅ Smart contract visible on Midnight Explorer
 
---
 
## 📑 Slide Deck
 
<div align="center">
 
**[▶ View Presentation Slides](#)**
 
</div>
 
The deck covers:
- Problem statement and market opportunity
- How zero-knowledge proofs solve identity and governance challenges
- ProofVeil architecture and Midnight integration
- Live demo walkthrough
- Roadmap and future development
 
---
 
## 📜 Smart Contract
 
### Contract Address
 
```
8d847cc316c8a4ac838da90f21d363aed24915cb2a9e607c1fd2741bd8d61dad
```
 
[View on Midnight Preview Explorer →](https://explorer.midnight-ntwrk.preview.midnight.network/contracts/8d847cc316c8a4ac838da90f21d363aed24915cb2a9e607c1fd2741bd8d61dad)
 
### Network Details
 
| Property | Value |
| :-------- | :---- |
| Network | Midnight Preview Testnet |
| Language | Compact (Midnight's ZK smart contract language) |
| Contract file | `contracts/hello-world.compact` |
| Deployed at | `deployment.json` |
| Proof server | Local (port 6300 via Docker) |
| Indexer | `https://indexer.preview.midnight.network/api/v3/graphql` |
| Node RPC | `https://rpc.preview.midnight.network` |
 
### Contract Code
 
```compact
pragma language_version >= 0.16 && <= 0.30;
 
export ledger message: Opaque<"string">;
 
export circuit storeMessage(newMessage: Opaque<"string">): [] {
  message = disclose(newMessage);
}
```
 
The `storeMessage` circuit anchors a proof hash on the Midnight ledger using zero-knowledge disclosure. The hash is public. The document that produced it is not.
 
### How It Works
 
```
1. User uploads file locally in the browser
2. SHA-256 hash computed client-side (file never leaves device)
3. Hash passed to storeMessage() circuit
4. ZK proof generated by local proof server
5. Proof + hash submitted to Midnight Preview network
6. Transaction confirmed — hash is now immutably on-chain
7. Anyone with the hash can verify it on the Verify page
```
 
---
 
## ✨ Features
 
| Feature | Description |
| :------ | :---------- |
| 🔒 Zero-knowledge proofs | Document hash anchored on Midnight — contents stay private |
| 🛡️ Local hashing | SHA-256 computed in the browser — file never uploaded to any server |
| 👛 Wallet connection | Midnight Lace wallet integration with address display |
| ✅ Submit proofs | Upload any file, generate a proof, store it on-chain |
| 🔍 Verify proofs | Check any hash against on-chain records instantly |
| 📊 Dashboard | Full history of all submitted proofs with timestamps |
| 🌐 Live on Vercel | Deployed and accessible at proofveil.vercel.app |
| 🔗 Explorer link | Every contract interaction visible on Midnight Explorer |
 
---
 
## 🏗️ Architecture
 
```
┌──────────────────────────────────────────────────┐
│                  User's Browser                  │
│                                                  │
│   React 19  ·  TypeScript  ·  TailwindCSS        │
│   Vite 6  ·  React Router                        │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│           Midnight Lace Wallet                   │
│                                                  │
│   Connects wallet  ·  Signs transactions         │
│   Private key never leaves the device            │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│           Local Proof Server (Docker)            │
│                                                  │
│   midnightntwrk/proof-server:8.0.3               │
│   Generates ZK proofs  ·  Port 6300              │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│         Midnight Preview Network                 │
│                                                  │
│   Compact Smart Contract                         │
│   storeMessage() circuit — ZK disclosure         │
│   Hash anchored immutably on-chain               │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│         Midnight Preview Explorer                │
│   explorer.midnight-ntwrk.preview...             │
│   Contract transactions publicly verifiable      │
└──────────────────────────────────────────────────┘
```
 
---
 
## 📁 Project Structure
 
```text
proofveil/
│
├── contracts/
│   └── hello-world.compact         Compact ZK smart contract
│
├── src/
│   ├── deploy.ts                   Contract deployment script
│   ├── cli.ts                      CLI interaction with deployed contract
│   └── check-balance.ts            Wallet balance checker
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Landing.tsx         Home page with Connect Wallet
│       │   ├── Submit.tsx          File upload + SHA-256 hashing + proof submission
│       │   ├── Verify.tsx          Proof verification against on-chain records
│       │   └── Dashboard.tsx       Full proof history and records
│       │
│       ├── components/
│       │   ├── Navbar.tsx          Navigation + wallet connection modal
│       │   └── Footer.tsx          Links to contract, docs, GitHub
│       │
│       └── hooks/
│           └── useWalletGate.ts    Wallet authentication guard
│
├── deployment.json                 Deployed contract address + network info
├── package.json
├── tsconfig.json
└── README.md
```
 
---
 
## 🚀 Run Locally
 
### Prerequisites
 
| Tool | Version | Install |
| :--- | :------ | :------ |
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org) |
| Docker Desktop | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| Compact compiler | Latest | `curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh \| sh` |
| Lace Wallet | Latest | [Chrome Web Store](https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk) |
 
### Setup
 
```bash
# Clone the repository
git clone https://github.com/vaibhavi-0320/proofveil
cd proofveil
 
# Install dependencies
npm install
 
# Start the proof server (keep this running in a separate terminal)
docker run -p 6300:6300 midnightntwrk/proof-server:8.0.3 midnight-proof-server -v
 
# Compile the contract
npm run compile
 
# Deploy to Midnight Preview network
npm run deploy
 
# Run the frontend
cd frontend
npm install
npm run dev
# → http://localhost:5173
```
 
### Get Test Tokens
 
1. Open your **Lace wallet** → Midnight tab → copy your unshielded address
2. Visit **[https://faucet.preview.midnight.network](https://faucet.preview.midnight.network)**
3. Paste your address → Request 1000 tNIGHT
4. In Lace → click **Generate tDUST** → Confirm
5. Wait ~2 minutes — tDUST appears in your wallet
 
---
 
## 🔗 Links
 
| | Link |
| :-: | :--- |
| 🔴 Live App | [proofveil.vercel.app](https://proofveil.vercel.app) |
| 📜 Smart Contract | [Midnight Preview Explorer](https://explorer.midnight-ntwrk.preview.midnight.network/contracts/8d847cc316c8a4ac838da90f21d363aed24915cb2a9e607c1fd2741bd8d61dad) |
| 🎬 Demo Video | [Watch Demo](#) |
| 📑 Slide Deck | [View Slides](#) |
| 🐙 GitHub | [vaibhavi-0320/proofveil](https://github.com/vaibhavi-0320/proofveil) |
| 📚 Midnight Docs | [docs.midnight.network](https://docs.midnight.network) |
| 👛 Lace Wallet | [lace.io](https://www.lace.io) |
| 🌐 Midnight Network | [midnight.network](https://midnight.network) |
 
---
 
<div align="center">
 
<br/>
 
*Built for the Midnight Hackathon — Identity & Governance Track*
 
[![Midnight](https://img.shields.io/badge/Built_on-Midnight-7c3aed?style=for-the-badge&logoColor=white)](https://midnight.network)
[![ZK](https://img.shields.io/badge/Powered_by-Zero_Knowledge_Proofs-5b21b6?style=for-the-badge&logoColor=white)](https://docs.midnight.network)
 
**[⬆ Back to Top](#)**
 
<br/>
 
</div>
 
