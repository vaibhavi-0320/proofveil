# PROPOSAL.md — ProofVeil: Confidential Credentials

## 1. Product & Users

ProofVeil lets someone prove a document (a diploma, an ID, a contract, a piece of evidence) is authentic and previously registered — **without ever uploading, storing, or revealing the document itself**, and without any later verification act revealing which document is being checked.

Two roles:

- **Issuer** — the person or organization that holds a document and wants to be able to prove its authenticity later. They hash the document locally (SHA-256, client-side, in the browser) and submit that hash as a private witness to the `submitCredential` circuit. Only a one-way commitment to the hash is ever written on-chain.
- **Verifier** — anyone who wants to confirm a credential is genuine. They (or the original issuer, presenting proof on request) supply the same document + a private salt to `verifyCredential`. The circuit proves the pair matches a previously-issued commitment, without disclosing the document to the chain, to an observer, or to whoever is checking.

Concrete use cases: a journalist proving a leaked document is authentic without exposing its contents or their source; a candidate proving a credential is genuine to an employer without handing over the underlying file; an organization maintaining an audit trail of "documents we've certified" without centrally storing any of them.

## 2. Why Midnight

A centralized "hash anchor" service (a database mapping hash → verified) technically achieves public-verifiability, but requires trusting an operator not to leak submission metadata (who submitted what, when, how often), and offers no way to prove possession of a document without handing over enough information for the operator to link submissions together.

Midnight's selective-disclosure model solves exactly this: a circuit can take `document` and `salt` as **private witnesses**, compute a `persistentHash` commitment inside the circuit, and disclose only the commitment — never the inputs — to public ledger state. The zero-knowledge proof that accompanies every transaction is what convinces the network the circuit ran correctly (the caller really does know a document that hashes to the disclosed commitment) without the network, an indexer operator, or any other observer ever seeing the document. This is not achievable with a plain smart contract on a fully-transparent chain, and it's the entire reason ProofVeil is built on Midnight rather than as a traditional web service or a transparent-ledger dApp.

## 3. Data Model

| Field | Location | Visibility | Notes |
| :---- | :------- | :--------- | :---- |
| `document` (SHA-256 of the source file) | Circuit witness argument | **PRIVATE** — never disclosed, never stored | Computed client-side; leaves the device only inside a ZK proof, never as plaintext |
| `salt` (32 random bytes) | Circuit witness argument | **PRIVATE** — never disclosed, never stored | Blinds the commitment so the same document hashed twice doesn't produce a linkable, guessable commitment |
| `commitment = persistentHash([document, salt])` | `credentialCommitments: Map<Bytes<32>, Boolean>` | **PUBLIC** (disclosed) | The only on-chain trace of a credential — a one-way commitment, not reversible to `document` |
| `verifiedCount` | `verifiedCount: Counter` | **PUBLIC** | Total successful verifications; reveals activity volume only, never which credential or who |
| Local submission history (filenames, labels, timestamps) | Browser `localStorage` only | **PRIVATE to the user's device** | Convenience UI history — never sent to the chain or any server; the chain has no notion of "your" submissions |

**Proved-without-revealing**: a successful `verifyCredential` transaction is cryptographic proof that the caller knows a `(document, salt)` pair matching an already-issued commitment — without the document, the salt, or even which specific commitment matched (beyond what issuance already made public) ever leaving the caller's machine in plaintext.

## 4. Mainnet Feasibility

- **Contract complexity**: two circuits, one `Map` and one `Counter` ledger cell — well within Compact's supported feature set today; no exotic primitives required.
- **Cost model**: each submit/verify call is a single, small transaction (one map insert or one map lookup + counter increment) — comparable in cost/complexity to Midnight's own reference examples (counter, bulletin board), so no unusual gas/DUST pressure is expected at mainnet scale.
- **Scaling consideration**: `credentialCommitments` grows by one entry per issued credential. For very high issuance volumes, this argues for periodic Merkle-root batching in a future version rather than a flat `Map`, but at hackathon/early-adoption scale a flat map is the correct, simplest choice and matches how Midnight's own examples model growing sets.
- **What's needed before mainnet**: (1) a security review of the commitment scheme (salt entropy, hash collision resistance — SHA-256 + `persistentHash` composition is conservative here), (2) a UX flow for safely backing up the private `(document, salt)` pairs a user needs to later prove verification (lost salt = unprovable credential, by design — this is the same trade-off as losing a private key), (3) real Preprod deployment and load-testing, currently pending as a follow-up to this PR.
