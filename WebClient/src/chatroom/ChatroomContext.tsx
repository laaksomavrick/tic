import { createContext, useContext, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useRooms } from '../RoomContext';
import { useConnection } from '../ConnectionContext';

export interface ChatroomMessageVm {
    content: string;
    id: string;
    roomId: string;
    timestamp: string;
    userId: string;
    username: string;
    color: string;
}

export interface ChatroomState {
    roomId: string;
    room: any;
    messages: ChatroomMessageVm[];
    loading: boolean;
}

export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_LOADING = 'SET_LOADING';

type SetMessagesAction = {
    type: typeof SET_MESSAGES;
    messages: ChatroomMessageVm[];
};

type AddMessageAction = {
    type: typeof ADD_MESSAGE;
    message: ChatroomMessageVm;
};

type SetLoadingAction = {
    type: typeof SET_LOADING;
    loading: boolean;
};

export type ChatroomAction =
    | SetMessagesAction
    | AddMessageAction
    | SetLoadingAction;

const reducer = (
    state: ChatroomState,
    action: ChatroomAction,
): ChatroomState => {
    // TODO: filter dupes from e.g. rerenders
    switch (action.type) {
        case SET_MESSAGES: {
            return { ...state, messages: action.messages };
        }
        case ADD_MESSAGE: {
            return { ...state, messages: [...state.messages, action.message] };
        }
        case SET_LOADING: {
            return { ...state, loading: action.loading };
        }
        default:
            return state;
    }
};

export const ChatroomContext = createContext<
    [ChatroomState, React.Dispatch<ChatroomAction>]
>([{} as ChatroomState, () => {}]);

export const useChatroom = () => useContext(ChatroomContext);

export const ChatroomProvider: React.FC = ({ children }) => {
    const { roomId } = useParams();
    const [{ rooms }] = useRooms();

    const room = rooms.find((room) => room.id === roomId);
    const initialState = {
        roomId,
        room,
        messages: [],
        loading: true,
    } as ChatroomState;

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ChatroomContext.Provider value={[state, dispatch]}>
            {children}
        </ChatroomContext.Provider>
    );
};
