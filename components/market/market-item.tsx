'use client';

import { Button, Center, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import { getMarketAssertionText } from '../../utils/market';
import { useRouter } from 'next/navigation';
import { Market } from '../../api/types';
import { pythPriceFeeds } from '../../config/constants';

interface MarketItemProps extends StackProps {
  market: Market;
}

const MarketItem = ({ market, ...props }: MarketItemProps) => {
  const router = useRouter();
  const price = String(market?.price) || '--';
  // const createdAt = market.createdAt ? new Date(Number(market.createdAt)) : '--';
  // const resolveFrom = market.resolveFrom ? new Date(Number(market.resolveFrom)) : '--';
  // const resolveTo = market.resolveTo ? new Date(Number(market.resolveTo)) : '--';
  const priceYes = market?.priceOutcome0?.toFixed(2) || '--';
  const priceNo = market?.priceOutcome1?.toFixed(2) || '--';
  const assetName = pythPriceFeeds.find((f) => f.id === market.priceFeedId)?.name || '--';

  const assertionText = getMarketAssertionText({
    price: market?.price,
    resolveFrom: market.resolveFrom ? Number(market.resolveFrom) : undefined,
    resolveTo: market.resolveTo ? Number(market.resolveFrom) : undefined,
    asset: assetName?.split('/')[0],
  });

  let chancePercent = '--';
  if (market.numOutcome0 && market.numOutcome1) {
    const total = Number(market.numOutcome0) + Number(market.numOutcome1);
    chancePercent = `${((Number(market.numOutcome0) / total) * 100).toFixed(0)}%`;
  }

  const handleClick = () => {
    console.log('MarketItem clicked');
    router.push(`/market/${market.publicKey}`);
  };

  return (
    <VStack
      p={4}
      rounded="md"
      shadow="md"
      alignItems="stretch"
      onClick={handleClick}
      maxW="450px"
      _hover={{ cursor: 'pointer' }}
      {...props}
    >
      <Text fontWeight="bold" fontSize="lg">
        {assertionText}
      </Text>
      <Center>
        <VStack gap={0} rounded="50%" borderColor="gray.200" borderWidth="1px" p={4}>
          <Text fontWeight="bold" fontSize="lg">
            {chancePercent}
          </Text>
          <Text fontSize="sm">Chance</Text>
        </VStack>
      </Center>
      <HStack justify="space-between">
        <Text>Predicted Price:</Text>
        <Text>USDC {price}</Text>
      </HStack>
      <HStack justify="space-between">
        <Button bgColor="green.500" variant="solid" flexGrow={1} fontWeight="bold" color="white">
          Yes ({priceYes})
        </Button>
        <Button bgColor="red.500" variant="solid" flexGrow={1} fontWeight="bold" color="white">
          No ({priceNo})
        </Button>
      </HStack>
    </VStack>
  );
};

export default MarketItem;
