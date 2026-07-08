import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
// The compiled contract only exists after `npm run compile` runs at the repo
// root (see contracts/hello-world.compact) - it is not checked in.
// @ts-expect-error - generated file, not present until the contract is compiled
import * as ConfidentialCredentials from '../../../contracts/managed/hello-world/contract/index.js';
import { buildProviders } from './providers';
import type { ConnectedWallet } from './wallet';

setNetworkId('preprod');

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const compiledContract = CompiledContract.make('hello-world', ConfidentialCredentials.Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets('hello-world'),
);

export interface TxResult {
  txId: string;
  blockHeight: number;
}

export interface ProofVeilContract {
  submitCredential(document: Uint8Array, salt: Uint8Array): Promise<TxResult>;
  verifyCredential(document: Uint8Array, salt: Uint8Array): Promise<TxResult>;
  getVerifiedCount(): Promise<bigint>;
}

export async function connectContract(wallet: ConnectedWallet): Promise<ProofVeilContract> {
  if (!CONTRACT_ADDRESS) {
    throw new Error(
      'VITE_CONTRACT_ADDRESS is not set. Deploy the contract (npm run deploy at the repo root) and set the ' +
        'resulting address in frontend/.env - see frontend/.env.example.',
    );
  }

  const providers = buildProviders(wallet);

  const deployed = await findDeployedContract(providers, {
    compiledContract,
    contractAddress: CONTRACT_ADDRESS,
    privateStateId: 'proofveil-credentials-state',
    initialPrivateState: {},
  });

  return {
    async submitCredential(document, salt) {
      const tx = await deployed.callTx.submitCredential(document, salt);
      return { txId: tx.public.txId, blockHeight: tx.public.blockHeight };
    },
    async verifyCredential(document, salt) {
      const tx = await deployed.callTx.verifyCredential(document, salt);
      return { txId: tx.public.txId, blockHeight: tx.public.blockHeight };
    },
    async getVerifiedCount() {
      const contractState = await providers.publicDataProvider.queryContractState(CONTRACT_ADDRESS);
      if (!contractState) return 0n;
      return ConfidentialCredentials.ledger(contractState.data).verifiedCount as bigint;
    },
  };
}
