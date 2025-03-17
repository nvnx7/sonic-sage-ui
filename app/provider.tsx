'use client';

import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';
import { RPC_TESTNET } from '../config/env';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function RootProvider(props: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Testnet;
  const endpoint = RPC_TESTNET;

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <Theme>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <ChakraProvider value={defaultSystem}>
              <ThemeProvider attribute="class" disableTransitionOnChange>
                {props.children}
              </ThemeProvider>
            </ChakraProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Theme>
  );
}
