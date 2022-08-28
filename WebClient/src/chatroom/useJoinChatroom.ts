import { useMountEffect } from '../common/useMountEffect';
import { useState } from 'react';
import { useUser } from '../user/UserContext';
import { useConnection } from '../ConnectionContext';
import { useApi } from '../api/ApiContext';

export const useJoinChatroom = (roomId: string) => {
    const { user } = useUser();
    const { connection } = useConnection();
    const { useRoomJoinRoom } = useApi();
    const { mutate: joinRoom, error } = useRoomJoinRoom({ roomId });
    // TODO: read user joined room state from GET user
    const [joined, setJoined] = useState(false);

    const connectionId = connection?.connectionId;
    const userId = user?.id || '';

    useMountEffect(async () => {
        if (joined) {
            return;
        }
        await joinRoom({ connectionId, userId });
        setJoined(true);
    });

    return { joined, error };
};
