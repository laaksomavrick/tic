import { Flex, Grid, useDisclosure } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiContext';
import { TicHeading } from '../common/TicHeading';
import { TicText } from '../common/TicText';
import { useErrorToast } from '../common/useErrorToast';
import { useRooms } from '../RoomContext';
import { useUser } from '../user/UserContext';
import { RoomListCreateRoomButton } from './RoomListCreateRoomButton';
import { RoomListCreateRoomModal } from './RoomListCreateRoomModal';
import { RoomListItem } from './RoomListItem';

export const RoomListPage: React.FC = () => {
    const { useRoomCreate } = useApi();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const { rooms } = useRooms();
    const { user } = useUser();

    const {mutate, loading, error } = useRoomCreate({});

    useErrorToast(error);

    const onClickRoom = useCallback(
        (roomId: string) => {
            navigate(`/rooms/${roomId}`);
        },
        [navigate],
    );

    const onCreateRoom = async (name: string) => {
        const response = await mutate({ name })
        onClose();
    }

    return (
        <>
            <Flex direction="column" h="100%">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={[4]}
                >
                    <TicHeading>Rooms</TicHeading>
                    <TicText fontWeight="medium">{user?.username}</TicText>
                </Flex>
                <Grid
                    templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    gridGap="2"
                >
                    <RoomListCreateRoomButton onClick={onOpen} />
                    {rooms.map((room) => (
                        <RoomListItem
                            key={room.id}
                            room={room}
                            onClickRoom={onClickRoom}
                        />
                    ))}
                </Grid>
            </Flex>
            <RoomListCreateRoomModal isOpen={isOpen} onClose={onClose} onCreateRoom={onCreateRoom} isLoading={loading} />
        </>
    );
};
