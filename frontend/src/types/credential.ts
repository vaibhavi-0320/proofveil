/**
 * A credential submitted from this device. `document`/`salt` are the private
 * witnesses that produced the on-chain commitment - kept only in this
 * browser's localStorage so the user can re-prove it later, never sent
 * anywhere but into the submitCredential/verifyCredential circuit calls.
 */
export interface ProofRecord {
  label: string;
  document: string; // hex, sha-256 of the source content
  salt: string; // hex, 32 random bytes
  timestamp: string;
  txId?: string;
  blockHeight?: number;
}

export const PROOF_RECORDS_KEY = 'proofveil_records';

export function loadProofRecords(): ProofRecord[] {
  try {
    const raw = localStorage.getItem(PROOF_RECORDS_KEY);
    return raw ? (JSON.parse(raw) as ProofRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveProofRecord(record: ProofRecord): void {
  const records = [record, ...loadProofRecords()];
  localStorage.setItem(PROOF_RECORDS_KEY, JSON.stringify(records));
}
