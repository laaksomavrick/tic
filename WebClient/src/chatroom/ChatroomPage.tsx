import { Flex, Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRooms } from '../RoomContext';
import { ChatroomActions } from './ChatroomActions';
import { ChatroomHeader } from './ChatroomHeader';
import { ChatroomMessages } from './ChatroomMessages';
import { useApi } from '../api/ApiContext';
import { useUser } from '../user/UserContext';
import { TicSpinner } from '../common/TicSpinner';
import { useJoinChatroom } from './useJoinChatroom';
import { useChatroom } from './ChatroomContext';

export const ChatroomPage: React.FC = () => {
    const { useMessageCreate } = useApi();
    const [state] = useChatroom();
    const { user } = useUser();
    const navigate = useNavigate();

    const roomId = state.roomId;
    const room = state.room;
    const loading = state.loading;
    const messages = state.messages;

    // TODO: handle error, loading
    const { mutate: createMessage } = useMessageCreate({});

    // TODO: errorJoining
    const { joined } = useJoinChatroom(roomId || '');

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

    if (roomId == null || room == null) {
        return <Navigate replace to="/" />;
    }

    const showSpinner = !joined || loading;

    console.log({ joined, loading, showSpinner });

    return showSpinner ? (
        <Flex justifyContent="center" alignItems="center" w="100%" h="100%">
            <TicSpinner />
        </Flex>
    ) : (
        <Grid
            h="100%"
            w="100%"
            gridTemplateRows={['min-content 1fr min-content']}
            data-testid="ChatroomContainer"
        >
            <ChatroomHeader
                name={room.name}
                onClickBackButton={onClickBackButton}
            />
            <ChatroomMessages messages={messages} />
            <ChatroomActions onClickMessageCreate={onClickMessageCreate} />
        </Grid>
    );
};
