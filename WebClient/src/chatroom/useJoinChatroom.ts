import { useMountEffect } from '../common/useMountEffect';
import { useState } from 'react';
import { useRoomJoinRoom } from '../api/hooks';
import { useUser } from '../user/UserContext';
import { useConnection } from '../ConnectionContext';

export const useJoinChatroom = (roomId: string) => {
    const { user } = useUser();
    const { connection } = useConnection();
    const { mutate: joinRoom, error } =  useRoomJoinRoom({ roomId });
    const [joined, setJoined] = useState(false)

    const connectionId = connection?.connectionId;
    const userId = user?.id || '';

    useMountEffect(() => {
       if (joined) { return; }
        (async () => {
            // TODO: remove ts-ignore
            // @ts-ignore
            await joinRoom({ connectionId, userId });
            setJoined(true);
        })();
    })

    return { joined, error };
}