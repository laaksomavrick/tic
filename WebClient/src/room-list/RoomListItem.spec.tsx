import { fireEvent, render, screen } from '@testing-library/react';
import { RoomListItem } from './RoomListItem';

describe('RoomListItem', () => {
    const room = { id: '1', name: 'roomName' };

    it('can render', () => {
        render(<RoomListItem room={room} onClickRoom={jest.fn()} />);

        const roomListItem = screen.getByTestId('RoomListItem-1');

        expect(roomListItem).toBeInTheDocument();
    });

    it('displays the room name', () => {
        const roomName = 'roomName';
        render(<RoomListItem room={room} onClickRoom={jest.fn()} />);

        const roomNameText = screen.getByText(roomName);

        expect(roomNameText).toBeInTheDocument();
    });

    it('supports a user selecting a room', () => {
        const onClickRoomMock = jest.fn();

        render(<RoomListItem room={room} onClickRoom={onClickRoomMock} />);

        const roomListItem = screen.getByTestId('RoomListItem-1');

        fireEvent.click(roomListItem);

        expect(onClickRoomMock).toHaveBeenCalled();
    });
});
