import { Spinner } from '@chakra-ui/react';

export const TicSpinner: React.FC = () => (
    <Spinner
        aria-label="loading"
        color="purple.500"
        size="xl"
        emptyColor="gray.200"
        thickness="6px"
    />
);
