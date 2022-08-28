import { BoxProps, Flex, Grid } from '@chakra-ui/react';
import { TicText } from '../common/TicText';

export interface ChatroomMessagesProps extends BoxProps {}

let messages = [
    {
        id: '1',
        username: 'AlpacaDog667',
        color: 'red.400',
        message: 'hi',
    },
    {
        id: '2',
        username: 'EpicMemer1337',
        color: 'blue.400',
        message: 'lorem ipsum something',
    },
    {
        id: '3',
        username: 'shadowdog',
        color: 'black.400',
        message:
            'the quick brown fox one two three four five six seven this is a long message the quick brown fox one two three four five six seven this is a long message',
    },
];

export const ChatroomMessages: React.FC<ChatroomMessagesProps> = () => {
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
                        color={message.color}
                    >
                        {message.username}
                    </TicText>
                    <TicText fontSize="sm" fontWeight="normal">
                        :&nbsp;
                    </TicText>
                    <TicText fontSize="sm" fontWeight="normal">
                        {message.message}
                    </TicText>
                </Flex>
            ))}
        </Grid>
    );
};
