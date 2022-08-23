import { Flex } from '@chakra-ui/react';
import { useUser } from '../user/UserContext';
import { TicSpinner } from './TicSpinner';
import { useErrorToast } from './useErrorToast';
import { useConnection } from '../ConnectionContext';

export const LoadingMask: React.FC = ({ children }) => {
    const { loading: connectionLoading, error: connectionError } = useConnection();
    const { loading: userLoading, error: userError } = useUser();

    const error = userError || connectionError ;
    const loading = userLoading || connectionLoading;

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
