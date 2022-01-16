import { FlexProps } from '@chakra-ui/react';
import { GetRoomVm } from '../api/hooks';
import { TicText } from '../common/TicText';
import { RoomListButton } from './RoomListButton';

export interface RoomListItemProps extends FlexProps {
    room: GetRoomVm;
    onClickRoom: (roomId: string) => void;
}

export const RoomListItem: React.FC<RoomListItemProps> = ({
    room,
    onClickRoom,
    ...rest
}) => {
    const id = room.id || '';
    return (
        <RoomListButton
            data-testid={`RoomListItem-${id}`}
            onClick={() => onClickRoom(id)}
            {...rest}
        >
            <TicText fontSize={['xl']} fontWeight={'semibold'}>
                {room.name}
            </TicText>
        </RoomListButton>
    );
};
