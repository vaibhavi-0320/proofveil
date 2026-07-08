import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // wasm/topLevelAwait: @midnight-ntwrk/ledger-v7 ships a WASM module using
  // the ESM Wasm integration proposal, which Rollup can't handle natively.
  // nodePolyfills: several @midnight-ntwrk/midnight-js-* packages (e.g. the
  // level private-state provider's storage encryption) import Node's
  // crypto/buffer/stream directly, even though they're used from the browser.
  plugins: [react(), wasm(), topLevelAwait(), nodePolyfills({ globals: { Buffer: true, global: true, process: true } })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Some @midnight-ntwrk packages are resolved from the repo root's
      // node_modules (a Midnight-SDK Node project one level up) rather than
      // frontend's own, which vite-plugin-node-polyfills' import-rewriting
      // doesn't always reach - pin these explicitly so they always resolve.
      buffer: path.resolve(__dirname, "node_modules/buffer"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
});
