import { Inter } from 'next/font/google';
import Provider from './provider';
import '@radix-ui/themes/styles.css';
import './reset.css';
// import { Flex, Section } from "@radix-ui/themes";
import { Nav } from '../components/nav';
import { Box, Flex } from '@chakra-ui/react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body className="light">
        <Provider>
          <Flex direction="column" w="full">
            <Nav />
            <Flex direction={'row'}>
              <Box w="full">{children}</Box>
            </Flex>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
