import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { WalletProvider, MidnightProvider } from '@midnight-ntwrk/midnight-js-types';
import type { FinalizedTransaction } from '@midnight-ntwrk/ledger-v7';
import type { ConnectedWallet } from './wallet';

// Where the compiled contract's prover/verifier keys and zkir are served
// from - see frontend/scripts/sync-zk-assets.mjs, which copies them out of
// contracts/managed/hello-world into frontend/public/zk/hello-world.
const ZK_ASSETS_BASE_URL = `${window.location.origin}/zk/hello-world`;

export function buildProviders(wallet: ConnectedWallet): MidnightProviders {
  const { api, state, serviceUriConfig } = wallet;

  const walletProvider: WalletProvider = {
    getCoinPublicKey: () => state.coinPublicKeyLegacy,
    getEncryptionPublicKey: () => state.encryptionPublicKeyLegacy,
    // The Lace wallet balances AND proves a transaction in a single step.
    // The SDK's call-transaction pipeline only needs the final proved
    // transaction handed back from this hook, cast to the type it expects
    // since the wallet connector and the ledger SDK model transactions with
    // separate (structurally compatible) types.
    balanceTx: async (tx) => {
      const proved = await api.balanceAndProveTransaction(tx as never, []);
      return proved as unknown as FinalizedTransaction;
    },
  };

  const midnightProvider: MidnightProvider = {
    submitTx: (tx) => api.submitTransaction(tx as never),
  };

  const zkConfigProvider = new FetchZkConfigProvider(ZK_ASSETS_BASE_URL);

  return {
    privateStateProvider: levelPrivateStateProvider({ privateStateStoreName: 'proofveil-private-state', walletProvider }),
    publicDataProvider: indexerPublicDataProvider(serviceUriConfig.indexerUri, serviceUriConfig.indexerWsUri),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(serviceUriConfig.proverServerUri, zkConfigProvider),
    walletProvider,
    midnightProvider,
  };
}
