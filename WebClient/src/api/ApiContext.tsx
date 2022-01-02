import { createContext, useContext } from 'react';
import { useUserCreate, useUserGetOne } from './hooks';

export interface ApiState {
    useUserGetOne: typeof useUserGetOne
    useUserCreate: typeof useUserCreate
};

export const ApiContext = createContext<ApiState>({
    useUserGetOne,
    useUserCreate
});

export const useApi = () => useContext(ApiContext);