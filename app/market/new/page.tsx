import React from 'react';
import CreateMarketForm from '../../../components/market/create-market';
import { VStack } from '@chakra-ui/react';

const CreateMarketPage = () => { 
    return (
        <VStack w='full' alignItems='center'>
            <CreateMarketForm />
        </VStack>
    )
}

export default CreateMarketPage;