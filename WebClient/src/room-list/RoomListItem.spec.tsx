import { fireEvent, render } from '@testing-library/react';
import { RoomListItem } from './RoomListItem';

describe('RoomListItem', () => {
    const room = { id: '1', name: 'roomName' };

    it('can render', () => {
        const { getByTestId } = render(
            <RoomListItem room={room} onClickRoom={jest.fn()} />,
        );

        const roomListItem = getByTestId('RoomListItem-1');

        expect(roomListItem).toBeInTheDocument();
    });

    it('displays the room name', () => {
        const roomName = 'roomName';
        const { getByText } = render(
            <RoomListItem room={room} onClickRoom={jest.fn()} />,
        );

        const roomNameText = getByText(roomName);

        expect(roomNameText).toBeInTheDocument();
    });

    it('supports a user selecting a room', () => {
        const onClickRoomMock = jest.fn();

        const { getByTestId } = render(
            <RoomListItem room={room} onClickRoom={onClickRoomMock} />,
        );

        const roomListItem = getByTestId('RoomListItem-1');

        fireEvent.click(roomListItem);

        expect(onClickRoomMock).toHaveBeenCalled();
    });
});
