import { BN, Program, utils, web3 } from '@coral-xyz/anchor';
import type { SonicSage } from '../idl/sonic_sage';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { metadataPda, mint, programId, programTokenAccountPda } from './utils';
// import { RPC_TESTNET } from '../config/env';
// import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';

export const getAllMarkets = async (pg: Program<SonicSage>) => {
  return (await pg.account.market.all()).map((res) => {
    const m = res.account;
    return {
      publicKey: res.publicKey.toBase58(),
      id: Number(m.id.toString()),
      price: Number(m.price.toString()),
      priceFeedId: m.priceFeedId.toString(),
      subsidyAmount: Number(m.subsidyAmount.toString()),
      createdAt: Number(m.createdAt.toString()) * 1000, // Convert to milliseconds
      resolveFrom: Number(m.resolveFrom.toString()),
      resolveTo: Number(m.resolveTo.toString()),
      numOutcome0: Number(m.numOutcome0.toString()),
      numOutcome1: Number(m.numOutcome1.toString()),
      priceOutcome0: Number(m.priceOutcome0.toString()),
      priceOutcome1: Number(m.priceOutcome1.toString()),
      isResolved: m.isResolved,
      outcome: m.outcome,
    };
  });
};

export const getMarketByAddress = async (pg: Program<SonicSage>, address: string) => {
  const res = await pg.account.market.fetch(new web3.PublicKey(address));
  const m = res;
  return {
    publicKey: address,
    id: Number(m.id.toString()),
    price: Number(m.price.toString()),
    priceFeedId: m.priceFeedId.toString(),
    subsidyAmount: Number(m.subsidyAmount.toString()),
    createdAt: Number(m.createdAt.toString()) * 1000, // Convert to milliseconds
    resolveFrom: Number(m.resolveFrom.toString()),
    resolveTo: Number(m.resolveTo.toString()),
    numOutcome0: Number(m.numOutcome0.toString()),
    numOutcome1: Number(m.numOutcome1.toString()),
    priceOutcome0: Number(m.priceOutcome0.toString()),
    priceOutcome1: Number(m.priceOutcome1.toString()),
    isResolved: m.isResolved,
    outcome: m.outcome,
  };
};

export const createMarket = async (
  pg: Program<SonicSage>,
  connection: web3.Connection,
  wallet: AnchorWallet,
  params: { price: number; resolveFrom: number; resolveTo: number; subsidyAmount: number; priceFeed: string }
) => {
  const metadata = await pg.account.metadata.fetch(metadataPda);
  const [marketPda] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('market'), wallet.publicKey.toBuffer(), metadata.marketCounter.toArrayLike(Buffer, 'le', 8)],
    programId
  );

  const signerTokenAccountAddress = getAssociatedTokenAddressSync(mint, wallet.publicKey);

  const accounts = {
    market: marketPda,
    metadata: metadataPda,
    mint,
    signerTokenAccount: signerTokenAccountAddress,
    programTokenAccount: programTokenAccountPda,
    signer: wallet.publicKey,
    tokenProgram: utils.token.TOKEN_PROGRAM_ID,
    associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
    systemProgram: web3.SystemProgram.programId,
  };

  const tx = await pg.methods
    .createMarket(
      params.price,
      params.priceFeed,
      new BN(params.resolveFrom),
      new BN(params.resolveTo),
      new BN(params.subsidyAmount)
    )
    .accounts(accounts)
    .transaction();
  tx.recentBlockhash = await connection.getRecentBlockhash().then((r) => r.blockhash);
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);
  const res = await connection.sendRawTransaction(signedTx.serialize());
  return res;
};

export const resolveMarket = async (
  pg: Program<SonicSage>,
  connection: web3.Connection,
  wallet: AnchorWallet,
  params: { marketAddress: string; priceFeedAddress: string }
) => {
  const marketPda = new web3.PublicKey(params.marketAddress);
  // const [outcomeAccountPda] = await web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("outcome"), marketPda.toBuffer(), wallet.publicKey.toBuffer()],
  //     programId
  // );

  //   const priceUpdatePda = new web3.PublicKey(params.priceFeedAddress);
  const accounts = {
    market: marketPda,
    signer: wallet.publicKey,
    // priceUpdate: priceUpdatePda,
    systemProgram: web3.SystemProgram.programId,
  };

  const tx = await pg.methods.resolveMarket().accounts(accounts).transaction();
  tx.recentBlockhash = await connection.getRecentBlockhash().then((r) => r.blockhash);
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);
  const res = await connection.sendRawTransaction(signedTx.serialize());
  return res;
};

// export const setupMetadata = async (
//   pg: Program<SonicSage>,
//   connection: web3.Connection,
//   wallet: AnchorWallet
//   //   params: { marketAddress: string; priceFeedAddress: string }
// ) => {
//   const conn = new web3.Connection(RPC_TESTNET);
//   const buffer = new Buffer('metadata');
//   const kp = web3.Keypair.fromSecretKey(
//     bs58.decode('')
//   );

//   //   const wall = new Wallet(kp);

//   const accounts = {
//     metadata: metadataPda,
//     tokenAccount: programTokenAccountPda,
//     mint: mint,
//     // signer: wallet.publicKey,
//     signer: kp.publicKey,
//     tokenProgram: TOKEN_PROGRAM_ID,
//     systemProgram: web3.SystemProgram.programId,
//   };

//   //   const x = await pg.methods.setupMetadata().accounts(accounts).signers([kp]).rpc();
//   //   console.log('x:', x);

//   const tx = await pg.methods.setupMetadata().accounts(accounts).transaction();
//   //   tx.recentBlockhash = await connection.getRecentBlockhash().then((r) => r.blockhash);
//   tx.recentBlockhash = 'GTntAqwx54RYxBmXCnysc7AVzbuuJq2LaEK9WCmTA42h';
//   tx.feePayer = kp.publicKey;
//   await tx.sign(kp);
//   const signedTx = tx;
//   //   //   tx.feePayer = wallet.publicKey;

//   //   const signedTx = await wallet.signTransaction(tx);
//   //   //   const res = await connection.sendRawTransaction(signedTx.serialize());
//   const res = await conn.sendRawTransaction(signedTx.serialize());
//   return res;
// };
