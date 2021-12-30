import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useConnection } from './ConnectionProvider';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { RoomListPage } from './RoomListPage';
import { Box, CSSReset } from '@chakra-ui/react';
import { UserInterfaceShell } from './UserInterfaceShell';
import { TicHeading } from './TicHeading';
import { ChatroomPage } from './ChatroomPage';

// Room list
// Join room
// Chat

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
