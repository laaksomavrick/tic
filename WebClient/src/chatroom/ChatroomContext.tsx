import { createContext, useContext, useEffect, useReducer } from 'react';
import { GetDataError } from 'restful-react';
import { useApi } from './api/ApiContext';
import { GetRoomVm } from './api/hooks';

export interface ChatroomMessageVm {
    content: string;
    id: string;
    roomId: string;
    timestamp: string;
    userId: string; 
    username: string; 
}

export interface ChatroomState {
    id: string;
    room: any;
    messages: ChatroomMessageVm[]
}

export const SET_MESSAGES = 'SET_MESSAGES';

type SetMessagesAction = {
    type: typeof SET_MESSAGES;
    messages: ChatroomMessageVm[];
};

export type ChatroomAction = SetMessagesAction

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
    const [state, dispatch] = useReducer(reducer, initialRoomState);

    return (
        <RoomContext.Provider value={[state, dispatch]}>
            {children}
        </RoomContext.Provider>
    );
};
