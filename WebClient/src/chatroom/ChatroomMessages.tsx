import { Flex, Grid } from '@chakra-ui/react';
import { TicText } from '../common/TicText';

export interface ChatroomMessagesProps {}

let messages = [
    {
        id: '1',
        username: 'AlpacaDog667',
        message: 'hi',
    },
    {
        id: '2',
        username: 'EpicMemer1337',
        message: 'lorem ipsum something',
    },
    {
        id: '3',
        username: 'shadowdog',
        message:
            'the quick brown fox one two three four five six seven this is a long message the quick brown fox one two three four five six seven this is a long message',
    },
];

messages = [...messages, ...messages, ...messages, ...messages, ...messages];

export const ChatroomMessages: React.FC<ChatroomMessagesProps> = () => {
    return (
        <Grid
            templateColumns="1fr"
            templateRows="min-content min-content"
            gridRowGap="0.5rem"
            my="0.5rem"
            overflowY="scroll"
            css={{
                '::-webkit-scrollbar': {
                    'background-color': 'transparent',
                    width: '8px',
                },
                '::-webkit-scrollbar-track': {
                    'background-color': 'transparent',
                },
                '::-webkit-scrollbar-thumb': {
                    'background-color': 'rgb(226, 232, 240)',
                },
            }}
        >
            {messages.map((message) => (
                <Flex key={message.id} height="min-content">
                    <TicText fontSize="sm" fontWeight="semibold">
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
