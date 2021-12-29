import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { TicHeading } from './TicHeading';
import { TicText } from './TicText';

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
    return (
        <Flex direction="column" h="100%">
            <TicHeading>Rooms</TicHeading>
            <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']} gridGap="2">
                {rooms.map((room) => (
                    <Flex
                        key={room.id}
                        direction="column"
                        minH={'10em'}
                        borderRadius="8px"
                        border="1px solid"
                        borderColor="gray.400"
                        padding={[2]}
                        cursor="pointer"
                    >
                        <TicText fontSize={['xl']} fontWeight={'semibold'}>
                            {room.name}
                        </TicText>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    );
};
