import { render } from '@testing-library/react';
import { ChatroomMessages } from './ChatroomMessages';

describe('ChatroomMessages', () => {
    it('can render', () => {
        const { getByTestId } = render(
            <ChatroomMessages  />,
        );

        const messages = getByTestId('ChatroomMessages');

        expect(messages).toBeInTheDocument();
    });

    // TODO: more tests as functionality is added
})

