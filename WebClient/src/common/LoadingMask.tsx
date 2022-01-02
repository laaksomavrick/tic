import { Flex, Spinner } from "@chakra-ui/react";
import { useUser } from "../UserContext"

export const LoadingMask: React.FC = ({ children }) => {
    const { loading } = useUser();

    if (loading === false)
    {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <Flex h="100vh" w="100vw" position="absolute" top="0" left="0" zIndex="999" background="white" alignItems="center" justifyContent="center">
            <Spinner aria-label="loading" color="purple.500" size="xl" emptyColor='gray.200'
            thickness="6px"
            />
        </Flex>
    )
}