import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { ChatroomPage } from './chatroom/ChatroomPage';
import { UserInterfaceShell } from './common/UserInterfaceShell';
import { RoomListPage } from './room-list/RoomListPage';
import { RoomProvider } from './RoomProvider';

function App() {
    // const { connection, loading, error } = useConnection();
    //
    // connection?.on('message', (content: any) => {
    //     console.log(content);
    // });

    // TODO: room provider ok here or make an abstraction e.g. dataprovider

    return (
        <UserInterfaceShell>
            <RoomProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<RoomListPage />} />
                        <Route
                            path="/rooms/:roomId"
                            element={<ChatroomPage />}
                        />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                </Router>
            </RoomProvider>
        </UserInterfaceShell>
    );
}

export default App;
