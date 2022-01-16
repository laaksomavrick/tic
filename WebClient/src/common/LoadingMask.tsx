import { Flex } from '@chakra-ui/react';
import { useUser } from '../user/UserContext';
import { TicSpinner } from './TicSpinner';
import { useErrorToast } from './useErrorToast';

export const LoadingMask: React.FC = ({ children }) => {
    const { loading, error } = useUser();

    useErrorToast(error);

    if (loading === false) {
        return <>{children}</>;
    }

    return (
        <Flex
            data-testid="LoadingMask"
            h="100vh"
            w="100vw"
            position="absolute"
            top="0"
            left="0"
            zIndex="999"
            background="white"
            alignItems="center"
            justifyContent="center"
        >
            <TicSpinner />
        </Flex>
    );
};
