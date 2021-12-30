import { SettingsIcon, StarIcon } from '@chakra-ui/icons';
import { Grid, Flex, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';
import { TicHeading } from '../common/TicHeading';
import { TicText } from '../common/TicText';
import { useRooms } from '../RoomProvider';

export const ChatroomPage: React.FC = () => {
    const { roomId } = useParams();
    const { rooms } = useRooms();

    if (roomId == null)
    {
        return (<Navigate replace to="/" />)
    }

    // TODO: not great if many rooms - can we pass via navigate as metadata?
    const room = rooms.find(room => room.id === roomId);

    if (room == null)
    {
        return (<Navigate replace to="/" />)
    }

    return (
        <Grid h="100%" w="100%" gridTemplateRows={["min-content 1fr min-content"]}>
            <Flex borderBottom="1px solid" borderColor="gray.400" justifyContent="center" maxW="100%" overflowX="auto">
                <TicHeading fontSize="md" isTruncated>{room.name}</TicHeading>
            </Flex>
            <p>foo</p>
            <Flex direction="column">
                <Input w="100%" minH="40px" mb={[2]} placeholder='Send a message' bg="gray.200" focusBorderColor='purple.400'></Input>
                <Flex h="100%" w="100%" minH="40px" alignItems="center">
                    <Flex alignItems="center" mr="auto">
                        <StarIcon color="purple.500" w={5} h={5} mr={[1]} />
                        <TicText fontWeight="semibold">10.2K</TicText>
                    </Flex>
                    
                    <SettingsIcon mr={[4]} w={5} h={5} />
                    <Button {...TIC_BACKGROUND_COLOR_AND_TEXT} _hover={{ background: 'purple.600'}}>Chat</Button>
                </Flex>
            </Flex>
        </Grid>
    )
}