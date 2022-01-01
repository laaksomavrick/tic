import { StarIcon, SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, FlexProps, Input } from '@chakra-ui/react';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';
import { TicText } from '../common/TicText';

export interface ChatroomActionsProps extends FlexProps {}

export const ChatroomActions: React.FC<ChatroomActionsProps> = ({
    ...rest
}) => {
    return (
        <Flex data-testid="ChatroomActions" direction="column" {...rest}>
            <Input
                w="100%"
                minH="40px"
                mb={[2]}
                placeholder="Send a message"
                bg="gray.200"
                focusBorderColor="purple.400"
            ></Input>
            <Flex h="100%" w="100%" minH="40px" alignItems="center">
                <Flex alignItems="center" mr="auto">
                    <StarIcon color="purple.500" w={5} h={5} mr={[1]} />
                    <TicText fontWeight="semibold">10.2K</TicText>
                </Flex>

                <SettingsIcon mr={[4]} w={5} h={5} />
                <Button
                    {...TIC_BACKGROUND_COLOR_AND_TEXT}
                    _hover={{ background: 'purple.600' }}
                >
                    Chat
                </Button>
            </Flex>
        </Flex>
    );
};
