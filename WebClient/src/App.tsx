import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { ChatroomPage } from './chatroom/ChatroomPage';
import { LoadingMask } from './common/LoadingMask';
import { UserInterfaceShell } from './common/UserInterfaceShell';
import { ConnectionProvider } from './ConnectionContext';
import { RoomListPage } from './room-list/RoomListPage';
import { RoomProvider } from './RoomContext';
import { UserProvider } from './user/UserContext';

function App() {
    // const { connection, loading, error } = useConnection();
    //
    // connection?.on('message', (content: any) => {
    //     console.log(content);
    // });

    return (
        <UserInterfaceShell>
                <ConnectionProvider>
            <UserProvider>
                    <RoomProvider>
                        <LoadingMask>
                            <Router>
                                <Routes>
                                    <Route path="/" element={<RoomListPage />} />
                                    <Route
                                        path="/rooms/:roomId"
                                        element={<ChatroomPage />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate replace to="/" />}
                                    />
                                </Routes>
                            </Router>
                        </LoadingMask>
                    </RoomProvider>
            </UserProvider>
                </ConnectionProvider>
        </UserInterfaceShell>
    );
}

export default App;
