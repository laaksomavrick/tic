import { Flex, Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';
import { TicHeading } from '../common/TicHeading';
import { TicText } from '../common/TicText';

const rooms = [
    {
        id: '1',
        name: 'Extravagant Blue, Or Otherwise Known as Something Really Long',
        description: "foo bar baz blah blah blah" // ?
    },
    {
        id: '2',
        name: 'Somewhere Out There',
    },
    {
        id: '3',
        name: 'Casual Chat',
    },
    {
        id: '4',
        name: 'Lorem Ipsum',
    },
];

export const RoomListPage: React.FC = () => {

    const navigate = useNavigate();

    const onClickRoom = useCallback((roomId: string) => {
        navigate(`/rooms/${roomId}`);
    }, [navigate]);

    return (
        <Flex direction="column" h="100%">
            <TicHeading>Rooms</TicHeading>
            <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gridGap="2">
                {rooms.map((room) => (
                    <RoomListItem key={room.id} room={room} onClick={onClickRoom} />
                ))}
            </Grid>
        </Flex>
    );
};

const RoomListItem: React.FC<{ room: any, onClick: (roomId: string) => void }> = ({ room, onClick }) => {
    return (
        <Flex
            onClick={() => onClick(room.id)}
            direction="column"
            minH={'10em'}
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.400"
            padding={[2]}
            cursor="pointer"
            _hover={{
                ...TIC_BACKGROUND_COLOR_AND_TEXT,
                borderColor: 'gray.50'
            }}
        >
            <TicText fontSize={['xl']} fontWeight={'semibold'}>
                {room.name}
            </TicText>
        </Flex>
    )
}
