import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ChatroomPage } from './chatroom/ChatroomPage';
import { UserInterfaceShell } from './common/UserInterfaceShell';
import { RoomListPage } from './room-list/RoomListPage';

function App() {
    // const { connection, loading, error } = useConnection();
    //
    // connection?.on('message', (content: any) => {
    //     console.log(content);
    // });

    return (
        <UserInterfaceShell>
            <Router>
                <Routes>
                    <Route path="/" element={<RoomListPage />} />
                    <Route path="/rooms/:roomId" element={<ChatroomPage />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
        </UserInterfaceShell>
    );
}

export default App;
