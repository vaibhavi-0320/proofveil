# Proofveil 🛡️

> **Truth you can prove. Privacy you can trust.**

Anonymous verifiable reporting platform on Midnight Network using Zero-Knowledge proofs.

## 🏆 Hackathon Submission

| Field | Value |
|---|---|
| **Network** | Midnight Preprod |
| **Contract Address** | `e0a4f4438586865881cf630942c2fff60a17dfe7dab673d34a6afd94f8958dcc` |
| **Explorer** | [View on Midnight Explorer](https://www.midnightexplorer.com/contracts/e0a4f4438586865881cf630942c2fff60a17dfe7dab673d34a6afd94f8958dcc) |
| **Smart Contract Language** | Compact (Midnight ZK-native) |
| **ZK Proof System** | ZK-SNARK via Midnight proof server |
| **Live Demo** | [proofveil.vercel.app](https://proofveil.vercel.app) |
| **Repo** | [github.com/vaibhavi-0320/proofveil](https://github.com/vaibhavi-0320/proofveil) |
| **Deployed At** | 2026-04-11 |

## What It Does
Users submit anonymous reports hashed with SHA-256. ZK proof generated locally. Only proof stored on Midnight blockchain — identity never revealed.

## Contract
```compact
pragma language_version >= 0.16;
import CompactStandardLibrary;
export ledger message: Opaque<"string">;
export circuit storeMessage(customMessage: Opaque<"string">): [] {
  message = disclose(customMessage);
}
```

## Tech Stack
React + Vite + TailwindCSS + Midnight SDK + Compact
