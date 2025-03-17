'use client';

import { Button, Center, HStack, Input, StackProps, Text, VStack } from '@chakra-ui/react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { formatMarketDateTime, getMarketAssertionText, getMarketStatus } from '../../utils/market';
import { Market } from '../../api/types';
import { pythPriceFeeds } from '../../config/constants';
import { useEffect, useState } from 'react';
import { useProgram } from '../../hooks/program';
import { buyOutcomeShares, getOutcomeShares, redeemOutcomeShares } from '../../api/outcome';
import { resolveMarket } from '../../api/markets';

interface MarketDetailProps extends StackProps {
  market: Market;
}

const MarketDetail = ({ market, ...props }: MarketDetailProps) => {
  const pg = useProgram();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [shares, setShares] = useState({ amount0: 0, amount1: 0 });
  const [numOutcome0Shares, setNumOutcome0Shares] = useState<string>('');
  const [numOutcome1Shares, setNumOutcome1Shares] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!pg || !wallet) return;

    getOutcomeShares(pg, wallet, { marketAddress: market.publicKey })
      .then((res) => setShares(res))
      .catch((err) => console.error('error getting shares:', err));
  }, [pg]);

  const handleBuyShares = async (outcomeIdx: number) => {
    setIsLoading(true);
    console.log('buying shares:', outcomeIdx);
    if (!pg || !wallet || !connection) return;

    try {
      const numOutcomeShares = outcomeIdx === 0 ? numOutcome0Shares : numOutcome1Shares;
      const shares = parseInt(numOutcomeShares);
      // console.log({ numOutcomeShares, shares });
      const res = await buyOutcomeShares(pg, connection, wallet, {
        outcomeIdx,
        numOutcomeShares: shares,
        marketAddress: market.publicKey,
      });
      console.log('buyOutcomeShares res:', res);
    } catch (error) {
      console.error('error buying shares:', error);
    }
    setIsLoading(false);
  };

  const handleResolve = async () => {
    console.log('resolving market:', market.publicKey);
    if (!pg || !wallet || !connection) return;

    setIsLoading(true);
    try {
      const res = await resolveMarket(pg, connection, wallet, {
        marketAddress: market.publicKey,
        priceFeedAddress: market.priceFeedId,
      });
      console.log('res:', res);
    } catch (error) {
      console.error('error resolving market:', error);
    }
    setIsLoading(false);
  };

  const handleRedeem = async () => {
    console.log('redeeming shares:', market.publicKey);
    if (!pg || !wallet || !connection) return;
    setIsLoading(true);
    try {
      const res = await redeemOutcomeShares(pg, connection, wallet, {
        marketAddress: market.publicKey,
      });
      console.log('res:', res);
    } catch (error) {
      console.error('error redeeming:', error);
    }

    setIsLoading(false);
  };

  const price = String(market?.price) || '--';
  const createdAt = market?.createdAt ? formatMarketDateTime(Number(market.createdAt)) : '--';
  const resolveFrom = market?.resolveFrom ? formatMarketDateTime(Number(market.resolveFrom)) : '--';
  const resolveTo = market?.resolveTo ? formatMarketDateTime(Number(market.resolveTo)) : '--';
  const priceYes = market?.priceOutcome0?.toFixed(2) || '--';
  const priceNo = market?.priceOutcome1?.toFixed(2) || '--';
  const assetName = pythPriceFeeds.find((f) => f.id === market.priceFeedId)?.name || '--';
  let outcomeTxt = '--';
  if (market.outcome === 0) {
    outcomeTxt = 'Yes';
  } else if (market.outcome === 1) {
    outcomeTxt = 'No';
  }

  const assertionText = getMarketAssertionText({
    price: market?.price,
    resolveFrom: market.resolveFrom ? Number(market.resolveFrom) : undefined,
    resolveTo: market.resolveTo ? Number(market.resolveFrom) : undefined,
    asset: assetName,
  });

  let chancePercent = '0';
  if (market.numOutcome0 && market.numOutcome1) {
    const total = Number(market.numOutcome0) + Number(market.numOutcome1);
    chancePercent = `${((Number(market.numOutcome0) / total) * 100).toFixed(0)}`;
  }

  let percentColor: string = 'black';
  if (Number(chancePercent)) {
    percentColor = Number(chancePercent) >= 50 ? 'green.500' : 'red.500';
  }

  console.log('MarketDetail', market);
  const status = getMarketStatus(market);
  const isResolved = market.isResolved;

  return (
    <VStack p={4} alignItems="stretch" maxW="900px" {...props}>
      <Text fontWeight="bold" fontSize="3xl" pb={8}>
        {assertionText}
      </Text>
      <Center>
        <VStack
          gap={0}
          rounded="50%"
          borderColor={percentColor}
          borderWidth="4px"
          p={12}
          color={percentColor}
          alignItems="center"
          textAlign="center"
        >
          <Text fontWeight="bold" fontSize="2xl">
            {chancePercent}%
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            chance
          </Text>
        </VStack>
      </Center>
      <HStack justify="space-between">
        <Text fontWeight="bold">Predicted Price:</Text>
        <Text>USDC {price}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text fontWeight="bold">Created On:</Text>
        <Text>{createdAt}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text fontWeight="bold">Resolution window:</Text>
        <Text>
          {resolveFrom} to {resolveTo}
        </Text>
      </HStack>
      <HStack justify="space-between">
        <Text fontWeight="bold">Status:</Text>
        <Text>{status?.toUpperCase()}</Text>
      </HStack>

      {status === 'resolving' && (
        <HStack justify="space-between" py={4}>
          <Text color="purple.500">Resolution Period Started:</Text>
          <Button colorPalette="purple" variant="surface" fontWeight="bold" onClick={handleResolve}>
            Resolve
          </Button>
        </HStack>
      )}

      {isResolved && (
        <HStack justify="space-between" py={4}>
          <Text color="purple.600" fontWeight="bold" fontSize="lg">
            Outcome:
          </Text>
          <Text color="purple.500" fontWeight="bold">
            {outcomeTxt}
          </Text>
        </HStack>
      )}

      {isResolved && (
        <Center>
          <Button
            loading={isLoading}
            colorPalette="purple"
            variant="surface"
            fontWeight="bold"
            onClick={handleRedeem}
          >
            Redeem Rewards
          </Button>
        </Center>
      )}

      <HStack justify="space-between" spaceX={4} py={4}>
        <VStack flexGrow={1} alignItems="stretch">
          <Text fontSize="sm">Balance: {shares.amount0}</Text>
          <Input
            size="lg"
            placeholder="Number of Yes shares"
            // value={numOutcome1Shares}
            onChange={(e) => {
              console.log(e);
              setNumOutcome0Shares(e.target.value);
            }}
          />
          <Button
            size="xl"
            bgColor="green.500"
            variant="solid"
            fontWeight="bold"
            color="white"
            onClick={() => handleBuyShares(0)}
            loading={isLoading}
          >
            Yes ({priceYes} USDC)
          </Button>
        </VStack>
        <VStack flexGrow={1} alignItems="stretch">
          <Text fontSize="sm">Balance: {shares.amount1}</Text>
          <Input
            size="lg"
            placeholder="Number of No shares"
            // value={numOutcome1Shares}
            onChange={(e) => setNumOutcome1Shares(e.target.value)}
          />
          <Button
            size="xl"
            bgColor="red.500"
            variant="solid"
            flexGrow={1}
            fontWeight="bold"
            color="white"
            onClick={() => handleBuyShares(1)}
            loading={isLoading}
          >
            No ({priceNo} USDC)
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default MarketDetail;
