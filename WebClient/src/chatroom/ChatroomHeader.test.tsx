import { fireEvent, render, waitFor } from '@testing-library/react';
import { ChatroomHeader } from './ChatroomHeader';

describe('ChatroomHeader', () => {
    it('can render', () => {
        const { getByTestId } = render(
            <ChatroomHeader name="foo" onClickBackButton={jest.fn()} />,
        );

        const header = getByTestId('ChatroomHeader');

        expect(header).toBeInTheDocument();
    });

    it('displays the room name', () => {
        const roomName = "roomName"
        const { getByText } = render(
            <ChatroomHeader name={roomName} onClickBackButton={jest.fn()} />,
        );

        const roomNameText = getByText(roomName);

        expect(roomNameText).toBeInTheDocument();
    });

    it('supports a user clicking the back button', () => {
        const backButtonMock = jest.fn();

        const { getByRole } = render(
            <ChatroomHeader name="foo" onClickBackButton={backButtonMock} />,
        );
        const backButton = getByRole('button', { name: 'back-button'}); 

        fireEvent.click(backButton);

        expect(backButtonMock).toHaveBeenCalled();
    });

    it('supports a user seeing the active users', async () => {
        const { getByText, getByRole } = render(
            <ChatroomHeader name="foo" onClickBackButton={jest.fn()} />,
        );
        const usersPopoverButton = getByRole('button', { name: 'users-button'}); 

        fireEvent.click(usersPopoverButton);

        const usersPopoverHeader = getByText('Users')
        expect(usersPopoverHeader).toBeInTheDocument();
        await waitFor(() => {
            expect(usersPopoverHeader).toBeVisible();
        })
    });

})

