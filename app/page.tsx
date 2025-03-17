'use client';

import Link from 'next/link';
import { Button, Heading, VStack, Text, Box } from '@chakra-ui/react';
import MarketList from '../components/market/market-list';
// import { setupMetadata } from '../api/markets';
// import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
// import { useProgram } from '../hooks/program';

export default function Page() {
  // const wallet = useAnchorWallet();
  // const pg = useProgram();
  // const { connection } = useConnection();

  // const handle = async () => {
  //   if (!pg || !wallet || !connection) {
  //     console.log('missing pg, wallet, or conn');

  //     return;
  //   }
  //   const res = await setupMetadata(pg, connection, wallet);
  //   console.log(res);
  // };

  return (
    <VStack py="10vh" px="3" align={'center'} justify={'center'}>
      <Heading fontSize="5xl" fontWeight="bold" pb={2} color="purple.700">
        🧙🏼‍♂️ SonicSage
      </Heading>
      <Text py={4} fontWeight="medium" fontSize="lg">
        Bet on the future of markets and assets with lightning-fast, low-cost prediction markets powered by
        Sonic.
      </Text>
      {/* <Button onClick={handle}>ASKAKDLSDS</Button> */}
      <Link href="/market/new">
        <Button size="lg" colorPalette="purple" variant="surface" fontWeight="bold">
          Create Market
        </Button>
      </Link>
      <Text pt={12} fontWeight="medium" fontSize="lg">
        or explore existing markets 👇
      </Text>
      <Box py={8}>
        <MarketList />
      </Box>
    </VStack>
  );
}
