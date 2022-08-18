import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { RoomListCreateRoomModal } from './RoomListCreateRoomModal';

describe('RoomListCreteRoomModal', () => {
    const onCloseMock = jest.fn();
    const onCreateRoomMock = jest.fn();

    it('validates room name input', async () => {
        render(
            <ChakraProvider>
                <RoomListCreateRoomModal
                    isOpen={true}
                    isLoading={false}
                    onClose={onCloseMock}
                    onCreateRoom={onCreateRoomMock}
                />
            </ChakraProvider>,
        );

        const createButton = screen.getByRole('button', {
            name: 'CreateButton',
        });

        fireEvent.click(createButton);

        const errorMessage = await screen.findByText('Name is required');

        expect(errorMessage).toBeInTheDocument();
    });

    it('creates a room', async () => {
        const roomName = 'foo';
        render(
            <ChakraProvider>
                <RoomListCreateRoomModal
                    isOpen={true}
                    isLoading={false}
                    onClose={onCloseMock}
                    onCreateRoom={onCreateRoomMock}
                />
            </ChakraProvider>,
        );

        const input = screen.getByLabelText('Name');
        const createButton = screen.getByRole('button', {
            name: 'CreateButton',
        });

        fireEvent.change(input, { target: { value: roomName } });
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(onCreateRoomMock).toHaveBeenCalledWith(roomName);
        });
    });
});
