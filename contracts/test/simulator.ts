import {
  createConstructorContext,
  createCircuitContext,
  CostModel,
  sampleContractAddress,
  type CircuitContext,
} from '@midnight-ntwrk/compact-runtime';
// @ts-expect-error - only exists after `npm run compile` generates this module
import { Contract, ledger, type Ledger } from '../managed/hello-world/contract/index.js';

// The contract has no persisted private state - document/salt are passed as
// circuit call arguments each time, never stored - so the private state type
// is simply empty.
export type PrivateState = Record<string, never>;

const DUMMY_COIN_PUBLIC_KEY = '00'.repeat(32);

/**
 * Runs the compiled Confidential Credentials contract entirely off-chain,
 * mirroring Midnight's own CounterSimulator pattern, so its circuits can be
 * exercised in plain Vitest without a proof server or deployed contract.
 */
export class ConfidentialCredentialsSimulator {
  readonly contract: InstanceType<typeof Contract<PrivateState>>;
  circuitContext: CircuitContext<PrivateState>;

  constructor() {
    this.contract = new Contract<PrivateState>({});
    const { currentContractState, currentPrivateState, currentZswapLocalState } = this.contract.initialState(
      createConstructorContext({}, DUMMY_COIN_PUBLIC_KEY),
    );

    this.circuitContext = createCircuitContext(
      sampleContractAddress(),
      currentZswapLocalState,
      currentContractState,
      currentPrivateState,
      undefined,
      CostModel.initialCostModel(),
    );
  }

  submitCredential(document: Uint8Array, salt: Uint8Array): void {
    const result = this.contract.impureCircuits.submitCredential(this.circuitContext, document, salt);
    this.circuitContext = result.context;
  }

  verifyCredential(document: Uint8Array, salt: Uint8Array): void {
    const result = this.contract.impureCircuits.verifyCredential(this.circuitContext, document, salt);
    this.circuitContext = result.context;
  }

  getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  /** A string dump of the entire public ledger state, for leak-detection tests. */
  serializedLedgerState(): string {
    return this.circuitContext.currentQueryContext.state.toString();
  }
}
