import { Buffer } from 'buffer';
import { mnemonicToSeedSync, validateMnemonic as validateBip39Mnemonic } from '@scure/bip39';
import { wordlist as englishWordlist } from '@scure/bip39/wordlists/english';

export function parseWalletSeed(input: string): Uint8Array {
  const normalized = input.trim();

  if (/^[a-fA-F0-9]{64}$/.test(normalized)) {
    return Buffer.from(normalized, 'hex');
  }

  if (validateBip39Mnemonic(normalized, englishWordlist)) {
    return mnemonicToSeedSync(normalized);
  }

  throw new Error(
    'Wallet secret must be either a 64-character hexadecimal seed or a valid BIP39 mnemonic phrase'
  );
}

export function describeWalletSeedFormat(input: string): 'hex' | 'mnemonic' {
  const normalized = input.trim();

  if (/^[a-fA-F0-9]{64}$/.test(normalized)) return 'hex';
  if (validateBip39Mnemonic(normalized, englishWordlist)) return 'mnemonic';

  throw new Error(
    'Wallet secret must be either a 64-character hexadecimal seed or a valid BIP39 mnemonic phrase'
  );
}
