import { createContext, useContext } from 'react';
import { useRoomCreate, useRoomGetAll, useUserCreate, useUserGetOne } from './hooks';

export interface ApiState {
    useUserGetOne: typeof useUserGetOne;
    useUserCreate: typeof useUserCreate;
    useRoomCreate: typeof useRoomCreate;
    useRoomGetAll: typeof useRoomGetAll;
}

export const ApiContext = createContext<ApiState>({
    useUserGetOne,
    useUserCreate,
    useRoomCreate,
    useRoomGetAll
});

export const useApi = () => useContext(ApiContext);
