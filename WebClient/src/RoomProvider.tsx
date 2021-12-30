import { createContext, useContext } from "react";

export interface RoomState {
    rooms: any[];
    loading: boolean;
    error: boolean;
}

export const RoomContext = createContext<RoomState>({
    rooms: [],
    loading: false,
    error: false,
})

export const useRooms = () => useContext(RoomContext);

export const RoomProvider: React.FC = ({ children }) => {
    const state = {
        rooms: [
            {
                id: '1',
                name: 'Extravagant Blue, Or Otherwise Known as Something Really Long',
                description: "foo bar baz blah blah blah" // maybe description too ?
            },
            {
                id: '2',
                name: 'Somewhere Out There',
            },
            {
                id: '3',
                name: 'Casual Chat',
            },
            {
                id: '4',
                name: 'Lorem Ipsum',
            },
        ],
        loading: false,
        error: false 
    }

    return (
        <RoomContext.Provider value={state}>{children}</RoomContext.Provider>
    )
}