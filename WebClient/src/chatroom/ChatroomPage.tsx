import { Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRooms } from '../RoomContext';
import { ChatroomActions } from './ChatroomActions';
import { ChatroomHeader } from './ChatroomHeader';
import { ChatroomMessages } from './ChatroomMessages';

export const ChatroomPage: React.FC = () => {
    const { roomId } = useParams();
    const { rooms } = useRooms();
    const navigate = useNavigate();

    const onClickBackButton = useCallback(() => {
        navigate('/');
    }, [navigate]);

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
            <ChatroomHeader
                name={room.name}
                onClickBackButton={onClickBackButton}
            />
            <ChatroomMessages />
            <ChatroomActions />
        </Grid>
    );
};
