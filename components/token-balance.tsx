import { Center, Text } from '@chakra-ui/react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getTokenBalance } from '../api/token';

const TokenBalance = () => {
  const [data, setData] = useState<any>({ balance: 0, displayBalance: '0' });
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (!connection || !wallet) return;

    getTokenBalance(connection, wallet)
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, [connection, wallet]);

  return (
    <Center px={4} py={2} rounded="md" borderColor="purple.600" borderWidth="2px" minW={32}>
      {data && (
        <Text fontWeight="bold" color="purple.500">
          {data.displayBalance} USDC
        </Text>
      )}
    </Center>
  );
};

export default TokenBalance;
