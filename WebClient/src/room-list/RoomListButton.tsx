import { Flex, FlexProps } from '@chakra-ui/react';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';

export interface RoomListButtonProps extends FlexProps {}

export const RoomListButton: React.FC<RoomListButtonProps> = ({
    children,
    ...rest
}) => {
    return (
        <Flex
            direction="column"
            minH={'10em'}
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.400"
            padding={[2]}
            cursor="pointer"
            _hover={{
                ...TIC_BACKGROUND_COLOR_AND_TEXT,
                borderColor: 'gray.50',
            }}
            {...rest}
        >
            {children}
        </Flex>
    );
};
