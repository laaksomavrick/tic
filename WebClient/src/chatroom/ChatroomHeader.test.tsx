import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { ChatroomHeader } from './ChatroomHeader';

describe('ChatroomHeader', () => {
    it('can render', () => {
        render(<ChatroomHeader name="foo" onClickBackButton={jest.fn()} />);

        const header = screen.getByTestId('ChatroomHeader');

        expect(header).toBeInTheDocument();
    });

    it('displays the room name', () => {
        const roomName = 'roomName';
        render(
            <ChatroomHeader name={roomName} onClickBackButton={jest.fn()} />,
        );

        const roomNameText = screen.getByText(roomName);

        expect(roomNameText).toBeInTheDocument();
    });

    it('supports a user clicking the back button', () => {
        const backButtonMock = jest.fn();

        render(
            <ChatroomHeader name="foo" onClickBackButton={backButtonMock} />,
        );
        const backButton = screen.getByRole('button', { name: 'back-button' });

        fireEvent.click(backButton);

        expect(backButtonMock).toHaveBeenCalled();
    });

    it('supports a user seeing the active users', async () => {
        render(<ChatroomHeader name="foo" onClickBackButton={jest.fn()} />);
        const usersPopoverButton = screen.getByRole('button', {
            name: 'users-button',
        });

        fireEvent.click(usersPopoverButton);

        const usersPopoverHeader = screen.getByText('Users');
        expect(usersPopoverHeader).toBeInTheDocument();
        await waitFor(() => {
            expect(usersPopoverHeader).toBeVisible();
        });
    });
});
