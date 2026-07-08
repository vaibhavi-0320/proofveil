import type {
  DAppConnectorAPI,
  DAppConnectorWalletAPI,
  DAppConnectorWalletState,
  ServiceUriConfig,
} from '@midnight-ntwrk/dapp-connector-api';

// The key Midnight's Lace wallet extension registers itself under on
// `window.midnight`. This is Midnight's own dApp connector API - not
// Cardano's `window.cardano` CIP-30 API, which is a different wallet/chain.
const WALLET_KEY = 'mnLace';

export class WalletNotFoundError extends Error {
  constructor() {
    super('Midnight Lace wallet extension not found');
    this.name = 'WalletNotFoundError';
  }
}

export class WalletConnectionRejectedError extends Error {
  constructor(cause?: string) {
    super(cause || 'Connection request was rejected');
    this.name = 'WalletConnectionRejectedError';
  }
}

export interface ConnectedWallet {
  api: DAppConnectorWalletAPI;
  state: DAppConnectorWalletState;
  serviceUriConfig: ServiceUriConfig;
}

export function getInjectedWallet(): DAppConnectorAPI | undefined {
  return typeof window !== 'undefined' ? window.midnight?.[WALLET_KEY] : undefined;
}

export async function connectWallet(): Promise<ConnectedWallet> {
  const injected = getInjectedWallet();
  if (!injected) {
    throw new WalletNotFoundError();
  }

  let api: DAppConnectorWalletAPI;
  try {
    api = await injected.enable();
  } catch (error) {
    throw new WalletConnectionRejectedError(error instanceof Error ? error.message : undefined);
  }

  const [state, serviceUriConfig] = await Promise.all([api.state(), injected.serviceUriConfig()]);

  return { api, state, serviceUriConfig };
}
