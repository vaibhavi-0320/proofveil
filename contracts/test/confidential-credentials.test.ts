import { describe, it, expect, beforeEach } from 'vitest';
import { randomBytes, createHash } from 'node:crypto';
import { ConfidentialCredentialsSimulator } from './simulator.js';

function documentHash(text: string): Uint8Array {
  return new Uint8Array(createHash('sha256').update(text, 'utf-8').digest());
}

function salt(): Uint8Array {
  return new Uint8Array(randomBytes(32));
}

describe('ProofVeil Confidential Credentials contract', () => {
  let simulator: ConfidentialCredentialsSimulator;
  let document: Uint8Array;
  let credentialSalt: Uint8Array;

  beforeEach(() => {
    simulator = new ConfidentialCredentialsSimulator();
    document = documentHash('diploma-2026-vaibhavi.pdf');
    credentialSalt = salt();
  });

  it('submitCredential records a commitment in the public ledger, never the document itself', () => {
    const before = simulator.getLedger();
    expect(before.credentialCommitments.isEmpty()).toBe(true);

    simulator.submitCredential(document, credentialSalt);

    const after = simulator.getLedger();
    expect(after.credentialCommitments.isEmpty()).toBe(false);
    expect(after.credentialCommitments.size()).toBe(1n);
  });

  it('verifyCredential succeeds for a matching (document, salt) pair and increments verifiedCount', () => {
    simulator.submitCredential(document, credentialSalt);
    expect(simulator.getLedger().verifiedCount).toBe(0n);

    simulator.verifyCredential(document, credentialSalt);

    expect(simulator.getLedger().verifiedCount).toBe(1n);
  });

  it('verifyCredential fails for a document/salt pair that was never issued', () => {
    simulator.submitCredential(document, credentialSalt);

    const wrongDocument = documentHash('forged-diploma.pdf');

    expect(() => simulator.verifyCredential(wrongDocument, credentialSalt)).toThrow();
    expect(simulator.getLedger().verifiedCount).toBe(0n);
  });

  it('never discloses the private document bytes anywhere in the public ledger state', () => {
    simulator.submitCredential(document, credentialSalt);
    simulator.verifyCredential(document, credentialSalt);

    const dump = simulator.serializedLedgerState();
    const documentHex = Buffer.from(document).toString('hex');

    expect(dump).not.toContain(documentHex);
  });
});
