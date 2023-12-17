'use client';

import type { ReactNode } from 'react';
// import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from '@chakra-ui/react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
