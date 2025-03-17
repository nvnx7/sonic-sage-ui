'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Heading, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import TokenBalance from './token-balance';

export function Nav() {
  return (
    <HStack
      justifyContent="space-between"
      px={8}
      py={4}
      borderColor="purple.500"
      borderBottomWidth="1px"
      bgColor="purple.100"
    >
      <Link href="/">
        <Heading fontWeight="bold" fontSize="2xl" color="purple.700">
          🧙🏼‍♂️ SonicSage
        </Heading>
      </Link>
      <HStack spaceX={4}>
        <TokenBalance />
        <WalletMultiButton />
      </HStack>
    </HStack>
  );
}
