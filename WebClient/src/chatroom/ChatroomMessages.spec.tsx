import { render, screen } from '@testing-library/react';
import { ChatroomMessages } from './ChatroomMessages';
import { ChatroomMessageVm } from './ChatroomContext';

const messages: ChatroomMessageVm[] = [
    {
        id: '1',
        username: 'AlpacaDog667',
        color: 'red.400',
        content: 'hi',
    },
    {
        id: '2',
        username: 'EpicMemer1337',
        color: 'blue.400',
        content: 'lorem ipsum something',
    },
    {
        id: '3',
        username: 'shadowdog',
        color: 'black.400',
        content:
            'the quick brown fox one two three four five six seven this is a long message the quick brown fox one two three four five six seven this is a long message',
    },
] as ChatroomMessageVm[];

describe('ChatroomMessages', () => {
    it('can render', () => {
        render(<ChatroomMessages messages={messages} />);

        const messagesComponent = screen.getByTestId('ChatroomMessages');

        expect(messagesComponent).toBeInTheDocument();
    });

    // TODO: more tests as functionality is added
});
