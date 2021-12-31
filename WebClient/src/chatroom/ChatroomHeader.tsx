import { Flex, FlexProps } from '@chakra-ui/react';
import { TicHeading } from '../common/TicHeading';

export interface ChatroomHeaderProps extends FlexProps {
    name: string;
}

export const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({
    name,
    ...rest
}) => {
    return (
        <Flex
            borderBottom="1px solid"
            borderColor="gray.400"
            justifyContent="center"
            maxW="100%"
            overflowX="auto"
            {...rest}
        >
            <TicHeading fontSize="md" isTruncated>
                {name}
            </TicHeading>
        </Flex>
    );
};
