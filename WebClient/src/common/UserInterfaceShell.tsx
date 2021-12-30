import { Box, CSSReset, ChakraProvider } from '@chakra-ui/react';
import React from 'react';

export const UserInterfaceShell: React.FC = ({ children }) => {
    return (
        <ChakraProvider>
            <CSSReset />
            <Box w="100vw" h="100vh" p={[4]} m={0} background="gray.50">
                {children}
            </Box>
        </ChakraProvider>
    );
};
