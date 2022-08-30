import { useMountEffect } from '../common/useMountEffect';
import { useState } from 'react';
import { useUser } from '../user/UserContext';
import { useConnection } from '../ConnectionContext';
import { useApi } from '../api/ApiContext';
import {
    ChatroomMessageVm,
    SET_LOADING,
    SET_MESSAGES,
    useChatroom,
} from './ChatroomContext';

export const useJoinChatroom = (roomId: string) => {
    const { user } = useUser();
    const { connection } = useConnection();
    const { useRoomJoinRoom } = useApi();
    const [state, dispatch] = useChatroom();
    const { mutate: joinRoom, error } = useRoomJoinRoom({ roomId });
    const [joined, setJoined] = useState(false);

    const connectionId = connection?.connectionId;
    const userId = user?.id || '';

    connection?.on('ReceiveRoomMessages', (messages: ChatroomMessageVm[]) => {
        dispatch({ type: SET_MESSAGES, messages });
        dispatch({ type: SET_LOADING, loading: false });
    });

    useMountEffect(async () => {
        if (joined) {
            return;
        }
        await joinRoom({ connectionId, userId });
        setJoined(true);
    });

    return { joined, error };
};
