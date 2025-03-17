import { web3 } from '@coral-xyz/anchor';
import idl from '../idl/sonic_sage.json';

export const programId = new web3.PublicKey(idl.address);

// export const mint = new web3.PublicKey('G45cC7J1Cq1w3QSFKKFvAwdkR2kGmffQvjBSBeS5m9ZN');
export const mint = new web3.PublicKey('88sV7y1ryDCiutfCUgqWvmkD9tUCBzdCLM8QqNhwgcAY');

export const [metadataPda] = web3.PublicKey.findProgramAddressSync([Buffer.from('metadata')], programId);

export const [programTokenAccountPda] = web3.PublicKey.findProgramAddressSync(
  [Buffer.from('token')],
  programId
);
