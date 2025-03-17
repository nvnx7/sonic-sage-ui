import { getAccount, getAssociatedTokenAddressSync, getMint } from '@solana/spl-token';
import { Connection } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { mint } from './utils';

export const getTokenBalance = async (connection: Connection, wallet: AnchorWallet) => {
  const tokenAccAddress = getAssociatedTokenAddressSync(mint, wallet.publicKey);
  const mintAcc = await getMint(connection, mint);
  const tokenAcc = await getAccount(connection, tokenAccAddress);

  const decimals = mintAcc.decimals;
  const balance = Number(tokenAcc.amount);
  const displayBalance = (balance / 10 ** decimals).toFixed(2);

  const data = {
    amount: balance,
    displayBalance,
  };

  console.log('data', data);

  return data;
};
