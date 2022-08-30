import { BoxProps, Flex, Grid } from '@chakra-ui/react';
import { TicText } from '../common/TicText';
import { ChatroomMessageVm } from './ChatroomContext';

export interface ChatroomMessagesProps extends BoxProps {
    messages: ChatroomMessageVm[];
}

export const ChatroomMessages: React.FC<ChatroomMessagesProps> = ({
    messages,
}) => {
    return (
        <Grid
            data-testid="ChatroomMessages"
            templateColumns="1fr"
            templateRows="min-content min-content"
            gridRowGap="0.5rem"
            my="0.5rem"
            overflowY="scroll"
            css={{
                '::-webkit-scrollbar': {
                    backgroundColor: 'transparent',
                    width: '8px',
                },
                '::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgb(226, 232, 240)',
                },
            }}
        >
            {messages.map((message) => (
                <Flex key={message.id} height="min-content">
                    <TicText
                        fontSize="sm"
                        fontWeight="semibold"
                        color={message.color || 'black.400'}
                    >
                        {message.username || 'Unknown'}
                    </TicText>
                    <TicText fontSize="sm" fontWeight="normal">
                        :&nbsp;
                    </TicText>
                    <TicText fontSize="sm" fontWeight="normal">
                        {message.content}
                    </TicText>
                </Flex>
            ))}
        </Grid>
    );
};
