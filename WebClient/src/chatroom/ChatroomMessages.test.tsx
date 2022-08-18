import { render, screen } from '@testing-library/react';
import { ChatroomMessages } from './ChatroomMessages';

describe('ChatroomMessages', () => {
    it('can render', () => {
        render(<ChatroomMessages />);

        const messages = screen.getByTestId('ChatroomMessages');

        expect(messages).toBeInTheDocument();
    });

    // TODO: more tests as functionality is added
});
