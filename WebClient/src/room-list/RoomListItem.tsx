import { Flex, FlexProps } from '@chakra-ui/react';
import { GetRoomVm } from '../api/hooks';
import { TicText } from '../common/TicText';
import { RoomListButton } from './RoomListButton';
import { useApi } from '../api/ApiContext';
import { useConnection } from '../ConnectionContext';
import { TicSpinner } from '../common/TicSpinner';
import { useUser } from '../user/UserContext';

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
    // TODO: move this into chatroom page component (needs to be e.g. user directly loads chatroom component)
    const { connection } = useConnection();
    const { useRoomJoinRoom } = useApi();
    const { user } = useUser();
    const { mutate: joinRoom, loading: joinRoomLoading, error: joinRoomError } =  useRoomJoinRoom({ roomId: id });

    const connectionId = connection?.connectionId;
    const userId = user?.id || '';

    const onClickRoomListButton = async () => {
        await joinRoom({
           connectionId,
            // @ts-ignore
            userId
        })
        onClickRoom(id);
    }

    return (
        <RoomListButton
            data-testid={`RoomListItem-${id}`}
            onClick={onClickRoomListButton}
            {...rest}
        >
            {joinRoomLoading ? (
                <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
                    <TicSpinner />
                </Flex>
            ) : (
                <TicText fontSize={['xl']} fontWeight={'semibold'}>
                    {room.name}
                </TicText>
            )}
        </RoomListButton>
    );
};
