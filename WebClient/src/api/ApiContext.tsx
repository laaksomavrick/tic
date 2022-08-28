import { createContext, useContext } from 'react';
import {
    useMessageCreate,
    useRoomCreate,
    useRoomGetAll,
    useRoomJoinRoom,
    useUserCreate,
    useUserGetOne,
} from './hooks';

export interface ApiState {
    useUserGetOne: typeof useUserGetOne;
    useUserCreate: typeof useUserCreate;
    useRoomCreate: typeof useRoomCreate;
    useRoomGetAll: typeof useRoomGetAll;
    useMessageCreate: typeof useMessageCreate;
    useRoomJoinRoom: typeof useRoomJoinRoom;
}

export const ApiContext = createContext<ApiState>({
    useUserGetOne,
    useUserCreate,
    useRoomCreate,
    useRoomGetAll,
    useMessageCreate,
    useRoomJoinRoom,
});

export const useApi = () => useContext(ApiContext);
