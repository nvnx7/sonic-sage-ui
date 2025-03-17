'use client';

import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { getMarketAssertionText } from '../../utils/market';
import {
  Box,
  Button,
  Center,
  createListCollection,
  Heading,
  HStack,
  Input,
  Portal,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { pythPriceFeeds } from '../../config/constants';
import { createMarket } from '../../api/markets';
import { useProgram } from '../../hooks/program';
import { useRouter } from 'next/navigation';

const assetsList = createListCollection({
  items: pythPriceFeeds.map((f) => ({
    label: f.name,
    value: f.id,
  })),
});

const CreateMarketForm = () => {
  const router = useRouter();
  const [price, setPrice] = useState<string>('');
  const [assetId, setAssetId] = useState('');
  const [subsidyAmount, setSubsidyAmount] = useState('');
  const [resolveWindow, setResolveWindow] = useState<[Date, Date]>([new Date(), new Date()]);
  const [isLoading, setIsLoading] = useState(false);

  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const pg = useProgram();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!pg || !wallet) {
      return;
    }

    const params = {
      price: Number(price),
      resolveFrom: resolveWindow[0]?.getTime(),
      resolveTo: resolveWindow[1]?.getTime(),
      subsidyAmount: Number(subsidyAmount),
      priceFeed: assetId,
    };

    console.log('params:', params);
    if (
      !params.price ||
      !params.resolveFrom ||
      !params.resolveTo ||
      !params.subsidyAmount ||
      !params.priceFeed
    ) {
      return;
    }

    try {
      const res = await createMarket(pg, connection, wallet, params);
      console.log('res:', res);
      router.push('/');
    } catch (error) {
      console.error('error:', error);
    }

    setIsLoading(false);
  };

  const assertionText = getMarketAssertionText({
    price: price ? Number(price) : undefined,
    resolveFrom: resolveWindow[0]?.getTime(),
    resolveTo: resolveWindow[1]?.getTime(),
    asset: assetsList.find(assetId)?.label,
  });

  return (
    <VStack py={12} alignItems="stretch" maxW="800px" w="full">
      <Heading fontSize="3xl" mb="4" textAlign="center" color="purple.600">
        Create Market
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text fontSize="2xl" mb={8} fontWeight="bold">
          {assertionText}
        </Text>

        {/* Market Pair Selector */}
        <Box mb="4" w="full">
          <Select.Root collection={assetsList} size="sm" onValueChange={(e) => setAssetId(e.value[0])}>
            <Select.HiddenSelect />
            <Select.Label fontWeight="bold" fontSize="md">
              Select Asset
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select asset e.g. SOL/USD" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content color="black">
                  {assetsList.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>

        {/* Subsidy Amount Input */}
        <Box mb="4">
          <Text as="label" fontWeight="bold" mb="2">
            Subsidy Amount (in USDC)
          </Text>
          <Input value={subsidyAmount} onChange={(e) => setSubsidyAmount(e.target.value)} />
        </Box>

        <Box mb="4">
          <Text as="label" fontWeight="bold" mb="2">
            Predicted Price (in USD)
          </Text>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </Box>

        <HStack mb="4" justify="space-between">
          <Text as="label" fontWeight="bold" mb="2">
            Resolve Time Window{' '}
          </Text>
          <DateTimeRangePicker onChange={setResolveWindow as any} value={resolveWindow} />
        </HStack>

        {/* Submit Button */}
        <Center pt={8}>
          <Button
            type="submit"
            loading={isLoading}
            colorPalette="purple"
            variant="surface"
            fontWeight="bold"
            size="lg"
          >
            Create Market
          </Button>
        </Center>
      </form>
    </VStack>
  );
};

export default CreateMarketForm;
