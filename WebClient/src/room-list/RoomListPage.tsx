import { Flex, Grid, useDisclosure } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiContext';
import { GetRoomVm } from '../api/hooks';
import { TicHeading } from '../common/TicHeading';
import { TicSpinner } from '../common/TicSpinner';
import { TicText } from '../common/TicText';
import { useErrorToast } from '../common/useErrorToast';
import { CREATE_ROOM, useRooms } from '../RoomContext';
import { useUser } from '../user/UserContext';
import { RoomListCreateRoomButton } from './RoomListCreateRoomButton';
import { RoomListCreateRoomModal } from './RoomListCreateRoomModal';
import { RoomListItem } from './RoomListItem';

export const RoomListPage: React.FC = () => {
    const { useRoomCreate } = useApi();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [state, dispatch] = useRooms();
    const { user } = useUser();

    const { rooms, loading: roomsLoading, error: roomsError } = state;

    const {
        mutate,
        loading: createRoomLoading,
        error: createRoomError,
    } = useRoomCreate({});

    useErrorToast(roomsError);
    useErrorToast(createRoomError);

    const onClickRoom = useCallback(
        (roomId: string) => {
            navigate(`/rooms/${roomId}`);
        },
        [navigate],
    );

    const onCreateRoom = async (name: string) => {
        const response = await mutate({ name });
        dispatch({ type: CREATE_ROOM, room: response });
        onClose();
    };

    return (
        <>
            <Flex direction="column" h="100%" data-testid="RoomListPage">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={[4]}
                >
                    <TicHeading>Rooms</TicHeading>
                    <TicText fontWeight="medium">{user?.username}</TicText>
                </Flex>
                <RoomListGrid
                    isLoading={roomsLoading}
                    rooms={rooms}
                    onOpen={onOpen}
                    onClickRoom={onClickRoom}
                />
            </Flex>
            <RoomListCreateRoomModal
                isOpen={isOpen}
                onClose={onClose}
                onCreateRoom={onCreateRoom}
                isLoading={createRoomLoading}
            />
        </>
    );
};

const RoomListGrid: React.FC<{
    isLoading: boolean;
    rooms: GetRoomVm[];
    onOpen: () => void;
    onClickRoom: (roomId: string) => void;
}> = ({ isLoading, rooms, onOpen, onClickRoom }) => {
    if (isLoading) {
        return (
            <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
                <TicSpinner />
            </Flex>
        );
    }

    return (
        <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gridGap="2">
            <RoomListCreateRoomButton onClick={onOpen} />
            {rooms.map((room) => (
                <RoomListItem
                    key={room.id}
                    room={room}
                    onClickRoom={onClickRoom}
                />
            ))}
        </Grid>
    );
};
