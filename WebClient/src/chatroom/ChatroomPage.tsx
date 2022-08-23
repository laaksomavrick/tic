import { Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRooms } from '../RoomContext';
import { ChatroomActions } from './ChatroomActions';
import { ChatroomHeader } from './ChatroomHeader';
import { ChatroomMessages } from './ChatroomMessages';
import { useApi } from '../api/ApiContext';
import { useUser } from '../user/UserContext';
import { useConnection } from '../ConnectionContext';

export const ChatroomPage: React.FC = () => {
    const { useMessageCreate } = useApi();
    const { roomId } = useParams();
    const { user } = useUser();
    const [roomState] = useRooms();
    const navigate = useNavigate();

    const { connection } = useConnection();
    const { mutate: createMessage, loading: createMessageLoading, error: createMessageError } = useMessageCreate({});

    console.log('rerender')
    connection?.on('ReceiveMessage', (content: any) => {
        console.log('receivemessage', content);
    });


    const onClickMessageCreate = async (message: string): Promise<void> => {
        const userId = user?.id;

        if (userId == null || roomId == null) {
            console.error('onClickMessageCreate userId or roomId null');
            return;
        }

        const response = await createMessage({ userId, roomId, message });

        console.log('onClickMessageCreate', response);
    };

    const onClickBackButton = useCallback(() => {
        navigate('/');
    }, [navigate]);

    if (roomId == null) {
        return <Navigate replace to="/" />;
    }

    // TODO: not great if many rooms - can we pass via navigate as metadata?
    const rooms = roomState.rooms;
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
            <ChatroomActions onClickMessageCreate={onClickMessageCreate} />
        </Grid>
    );
};
