import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { RoomListCreateRoomModal } from "./RoomListCreateRoomModal"

describe('RoomListCreteRoomModal', () => {
    const onCloseMock = jest.fn();
    const onCreateRoomMock = jest.fn();

    it('validates room name input', async () => {
        const { getByRole, findByText } = render(
            <ChakraProvider>
                <RoomListCreateRoomModal 
                isOpen={true} 
                isLoading={false} 
                onClose={onCloseMock} 
                onCreateRoom={onCreateRoomMock} />
            </ChakraProvider>
        );

            const createButon = getByRole('button', { name: 'CreateButton'});

            fireEvent.click(createButon);

            const errorMessage = await findByText('Name is required');

            expect(errorMessage).toBeInTheDocument();

    });

    it('creates a room', async () => {
        const roomName = "foo";
        const { getByRole, getByLabelText } = render(
            <ChakraProvider>
                <RoomListCreateRoomModal 
                isOpen={true} 
                isLoading={false} 
                onClose={onCloseMock} 
                onCreateRoom={onCreateRoomMock} />
            </ChakraProvider>
        );

            const input = getByLabelText('Name');
            const createButon = getByRole('button', { name: 'CreateButton'});

            fireEvent.change(input, {target: { value: roomName }})
            fireEvent.click(createButon);

            await waitFor(() => {
                expect(onCreateRoomMock).toHaveBeenCalledWith(roomName)
            })

    });
})