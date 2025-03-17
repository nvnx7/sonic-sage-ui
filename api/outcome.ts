import { BN, Program, utils, web3 } from '@coral-xyz/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { mint, programId, programTokenAccountPda } from './utils';
import type { SonicSage } from '../idl/sonic_sage';

export const buyOutcomeShares = async (
  pg: Program<SonicSage>,
  connection: web3.Connection,
  wallet: AnchorWallet,
  params: { outcomeIdx: number; numOutcomeShares: number; marketAddress: string }
) => {
  const signerTokenAccountAddress = getAssociatedTokenAddressSync(mint, wallet.publicKey);
  const marketPda = new web3.PublicKey(params.marketAddress);
  const [outcomeAccountPda] = await web3.PublicKey.findProgramAddressSync(
    [Buffer.from('outcome'), marketPda.toBuffer(), wallet.publicKey.toBuffer()],
    programId
  );

  const accounts = {
    market: marketPda,
    subsidyMint: mint,
    signerTokenAccount: signerTokenAccountAddress,
    programTokenAccount: programTokenAccountPda,
    outcomeAccount: outcomeAccountPda,
    signer: wallet.publicKey,
    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
    systemProgram: web3.SystemProgram.programId,
  };

  const tx = await pg.methods
    .buyOutcome(params.outcomeIdx, new BN(params.numOutcomeShares))
    .accounts(accounts)
    .transaction();
  tx.recentBlockhash = await connection.getRecentBlockhash().then((r) => r.blockhash);
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);
  const res = await connection.sendRawTransaction(signedTx.serialize());
  return res;
};

export const redeemOutcomeShares = async (
  pg: Program<SonicSage>,
  connection: web3.Connection,
  wallet: AnchorWallet,
  params: { marketAddress: string }
) => {
  const signerTokenAccountAddress = getAssociatedTokenAddressSync(mint, wallet.publicKey);
  const marketPda = new web3.PublicKey(params.marketAddress);
  const [outcomeAccountPda] = await web3.PublicKey.findProgramAddressSync(
    [Buffer.from('outcome'), marketPda.toBuffer(), wallet.publicKey.toBuffer()],
    programId
  );

  const accounts = {
    market: marketPda,
    subsidyMint: mint,
    signerTokenAccount: signerTokenAccountAddress,
    programTokenAccount: programTokenAccountPda,
    outcomeAccount: outcomeAccountPda,
    signer: wallet.publicKey,
    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
    systemProgram: web3.SystemProgram.programId,
  };

  const tx = await pg.methods.redeemOutcome().accounts(accounts).transaction();
  tx.recentBlockhash = await connection.getRecentBlockhash().then((r) => r.blockhash);
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);
  const res = await connection.sendRawTransaction(signedTx.serialize());
  return res;
};

export const getOutcomeShares = async (
  pg: Program<SonicSage>,
  wallet: AnchorWallet,
  params: { marketAddress: string }
) => {
  const marketPda = new web3.PublicKey(params.marketAddress);
  const [outcomeAccountPda] = await web3.PublicKey.findProgramAddressSync(
    [Buffer.from('outcome'), marketPda.toBuffer(), wallet.publicKey.toBuffer()],
    programId
  );

  const outcomeAccount = await pg.account.outcomeAccount.fetch(outcomeAccountPda);

  console.log('outcomeAccount:', outcomeAccount.amount0.toString());

  return {
    amount0: Number(outcomeAccount.amount0.toString()),
    amount1: Number(outcomeAccount.amount1.toNumber()),
  };
};
