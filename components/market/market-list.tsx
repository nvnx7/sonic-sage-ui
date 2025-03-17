import { Center, SimpleGrid, StackProps, VStack } from '@chakra-ui/react';
import MarketItem from './market-item';
import { useProgram } from '../../hooks/program';
import { useEffect, useState } from 'react';
import { getAllMarkets } from '../../api/markets';
import { Market } from '../../api/types';

const MarketList = (props: StackProps) => {
  const pg = useProgram();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pg) return;
    setIsLoading(true);
    getAllMarkets(pg)
      .then((markets) => {
        setMarkets(markets as any as Market[]);
        console.log('markets:', markets);
      })
      .catch((e) => {
        console.error('Error fetching markets:', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pg]);

  if (isLoading) {
    return (
      <Center py={12} {...props}>
        Loading...
      </Center>
    );
  }

  if (!markets.length) {
    return (
      <Center py={12} {...props}>
        No markets found
      </Center>
    );
  }

  return (
    <VStack {...props}>
      <SimpleGrid columns={3} gap={4}>
        {markets?.map((market) => (
          <MarketItem key={market.id} market={market} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default MarketList;
