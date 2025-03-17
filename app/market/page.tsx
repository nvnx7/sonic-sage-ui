'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateMarket = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return <></>;
};

export default CreateMarket;
