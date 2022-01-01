import { Flex, Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TicHeading } from '../common/TicHeading';
import { useRooms } from '../RoomProvider';
import { RoomListItem } from './RoomListItem';

export const RoomListPage: React.FC = () => {
    const { rooms, loading, error } = useRooms();

    const navigate = useNavigate();

    const onClickRoom = useCallback(
        (roomId: string) => {
            navigate(`/rooms/${roomId}`);
        },
        [navigate],
    );

    return (
        <Flex direction="column" h="100%">
            <TicHeading>Rooms</TicHeading>
            <Grid
                templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                gridGap="2"
            >
                {rooms.map((room) => (
                    <RoomListItem
                        key={room.id}
                        room={room}
                        onClickRoom={onClickRoom}
                    />
                ))}
            </Grid>
        </Flex>
    );
};
