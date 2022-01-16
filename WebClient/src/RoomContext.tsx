import { createContext, useContext, useEffect, useReducer } from 'react';
import { GetDataError } from 'restful-react';
import { useApi } from './api/ApiContext';
import { GetRoomVm } from './api/hooks';

export interface RoomState {
    rooms: any[];
    loading: boolean;
    error: GetDataError<unknown> | null;
}

export const SET_ROOMS = 'SET_ROOMS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CREATE_ROOM = 'CREATE_ROOM';

type SetRoomsAction = {
    type: typeof SET_ROOMS;
    rooms: GetRoomVm[];
};

type SetLoadingAction = {
    type: typeof SET_LOADING;
    loading: boolean;
};

type SetErrorAction = {
    type: typeof SET_ERROR;
    error: GetDataError<unknown> | null;
};

type CreateRoomAction = {
    type: typeof CREATE_ROOM;
    room: GetRoomVm;
};

export type RoomAction =
    | SetRoomsAction
    | SetLoadingAction
    | SetErrorAction
    | CreateRoomAction;

const reducer = (state: RoomState, action: RoomAction): RoomState => {
    switch (action.type) {
        case SET_ROOMS: {
            return { ...state, rooms: action.rooms };
        }
        case SET_LOADING: {
            return { ...state, loading: action.loading };
        }
        case SET_ERROR: {
            return { ...state, error: action.error };
        }
        case CREATE_ROOM: {
            return { ...state, rooms: [...state.rooms, action.room] };
        }
        default:
            return state;
    }
};

const initialRoomState = {
    rooms: [],
    loading: false,
    error: null,
};

export const RoomContext = createContext<
    [RoomState, React.Dispatch<RoomAction>]
>([initialRoomState, () => {}]);

export const useRooms = () => useContext(RoomContext);

export const RoomProvider: React.FC = ({ children }) => {
    const { useRoomGetAll } = useApi();
    const [state, dispatch] = useReducer(reducer, initialRoomState);

    const { data, loading, error } = useRoomGetAll({});

    useEffect(() => {
        dispatch({ type: SET_LOADING, loading });
    }, [loading]);

    useEffect(() => {
        dispatch({ type: SET_ERROR, error });
    }, [error]);

    useEffect(() => {
        if (data) {
            dispatch({ type: SET_ROOMS, rooms: data });
        } else {
            dispatch({ type: SET_ROOMS, rooms: [] });
        }
    }, [data]);

    return (
        <RoomContext.Provider value={[state, dispatch]}>
            {children}
        </RoomContext.Provider>
    );
};
