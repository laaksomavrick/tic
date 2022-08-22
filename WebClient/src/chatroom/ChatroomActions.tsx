import { StarIcon, SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, FlexProps, Input } from '@chakra-ui/react';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';
import { TicText } from '../common/TicText';
import React, { ChangeEvent, FC, useState } from 'react';

export interface ChatroomActionsProps extends FlexProps {
    onClickMessageCreate: (message: string) => Promise<void>;
}

export const ChatroomActions: FC<ChatroomActionsProps> = ({
    onClickMessageCreate,
    ...rest
}) => {
    const [message, setMessage] = useState('');

    const onSubmitMessage = async () => {
        await onClickMessageCreate(message);
    };

    const onChangeMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
        const message = e.target?.value || '';
        setMessage(message);
    };

    const isChatButtonDisabled = message === '';

    return (
        <Flex data-testid="ChatroomActions" direction="column" {...rest}>
            <Input
                w="100%"
                minH="40px"
                mb={[2]}
                placeholder="Send a message"
                bg="gray.200"
                focusBorderColor="purple.400"
                onChange={onChangeMessageInput}
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
                    onClick={onSubmitMessage}
                    isDisabled={isChatButtonDisabled}
                >
                    Chat
                </Button>
            </Flex>
        </Flex>
    );
};
