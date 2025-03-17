'use client';

import React, { useEffect, useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import MarketDetail from "../../../components/market/market-detail";
import { Market } from "../../../api/types";
import { getMarketByAddress } from "../../../api/markets";
import { useProgram } from "../../../hooks/program";

const MarketDetailPage = ({ params }: any) => {
    const address = params.address as string;
    const [market, setMarket] = useState<Market | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const pg = useProgram();

    useEffect(() => {
        if (!pg) return;
        setIsLoading(true);

        getMarketByAddress(pg, address).then(market => {
            setMarket(market as any as Market);
        })
        .catch(e => {
            console.error('Error fetching market:', e);
        });
        
        setIsLoading(false);
    }, [pg])

    if (isLoading) { 
        return <Center py={12}>Loading...</Center>
    }

    if (!market) {
        return <Center py={12}>Market not found</Center>
    }

    return (
        <Box p={12}>
        <Center py={8}>
            <MarketDetail market={market} />
        </Center>
        </Box>
    )
}

export default MarketDetailPage;