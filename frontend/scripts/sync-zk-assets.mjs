// Copies the compiled contract's prover/verifier keys and zkir out of
// contracts/managed/hello-world (produced by `npm run compile` at the repo
// root) into frontend/public/zk/hello-world, so the browser's
// FetchZkConfigProvider can load them over HTTP at runtime. Run after every
// recompile - `npm run dev`/`npm run build` do this automatically via the
// pre-scripts below.
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, '..', '..', 'contracts', 'managed', 'hello-world');
const dest = path.resolve(__dirname, '..', 'public', 'zk', 'hello-world');

if (!existsSync(source)) {
  console.warn(
    '\n[sync-zk-assets] contracts/managed/hello-world not found - run `npm run compile` at the repo root first.\n' +
      '[sync-zk-assets] Skipping for now; the app will fail to generate proofs until this is done.\n',
  );
  process.exit(0);
}

mkdirSync(dest, { recursive: true });
cpSync(path.join(source, 'keys'), path.join(dest, 'keys'), { recursive: true });
cpSync(path.join(source, 'zkir'), path.join(dest, 'zkir'), { recursive: true });

console.log(`[sync-zk-assets] Copied ZK assets to ${dest}`);
