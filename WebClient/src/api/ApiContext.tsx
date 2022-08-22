import { createContext, useContext } from 'react';
import {
    useMessageCreate,
    useRoomCreate,
    useRoomGetAll,
    useUserCreate,
    useUserGetOne,
} from './hooks';

export interface ApiState {
    useUserGetOne: typeof useUserGetOne;
    useUserCreate: typeof useUserCreate;
    useRoomCreate: typeof useRoomCreate;
    useRoomGetAll: typeof useRoomGetAll;
    useMessageCreate: typeof useMessageCreate;
}

export const ApiContext = createContext<ApiState>({
    useUserGetOne,
    useUserCreate,
    useRoomCreate,
    useRoomGetAll,
    useMessageCreate,
});

export const useApi = () => useContext(ApiContext);
