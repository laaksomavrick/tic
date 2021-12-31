import { SettingsIcon, StarIcon } from '@chakra-ui/icons';
import { Grid, Flex, Input, Button } from '@chakra-ui/react';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TIC_BACKGROUND_COLOR_AND_TEXT } from '../common/common-styles';
import { TicHeading } from '../common/TicHeading';
import { TicText } from '../common/TicText';
import { useRooms } from '../RoomProvider';
import { ChatroomActions } from './ChatroomActions';
import { ChatroomHeader } from './ChatroomHeader';
import { ChatroomMessages } from './ChatroomMessages';

export const ChatroomPage: React.FC = () => {
    const { roomId } = useParams();
    const { rooms } = useRooms();

    if (roomId == null) {
        return <Navigate replace to="/" />;
    }

    // TODO: not great if many rooms - can we pass via navigate as metadata?
    const room = rooms.find((room) => room.id === roomId);

    if (room == null) {
        return <Navigate replace to="/" />;
    }

    return (
        <Grid
            h="100%"
            w="100%"
            gridTemplateRows={['min-content 1fr min-content']}
        >
            <ChatroomHeader name={room.name} />
            <ChatroomMessages />
            <ChatroomActions />
        </Grid>
    );
};
