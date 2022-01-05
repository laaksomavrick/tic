import { createContext, useContext } from 'react';
import { useRoomCreate, useUserCreate, useUserGetOne } from './hooks';

export interface ApiState {
    useUserGetOne: typeof useUserGetOne;
    useUserCreate: typeof useUserCreate;
    useRoomCreate: typeof useRoomCreate
}

export const ApiContext = createContext<ApiState>({
    useUserGetOne,
    useUserCreate,
    useRoomCreate
});

export const useApi = () => useContext(ApiContext);
