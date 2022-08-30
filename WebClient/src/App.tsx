import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { ChatroomPage } from './chatroom/ChatroomPage';
import { LoadingMask } from './common/LoadingMask';
import { UserInterfaceShell } from './common/UserInterfaceShell';
import { RoomListPage } from './room-list/RoomListPage';
import { RoomProvider } from './RoomContext';
import { UserProvider } from './user/UserContext';
import { ChatroomProvider } from './chatroom/ChatroomContext';

function App() {
    return (
        <UserInterfaceShell>
            <UserProvider>
                <RoomProvider>
                    <LoadingMask>
                        <Router>
                            <Routes>
                                <Route path="/" element={<RoomListPage />} />
                                <Route
                                    path="/rooms/:roomId"
                                    element={
                                        <ChatroomProvider>
                                            <ChatroomPage />
                                        </ChatroomProvider>
                                    }
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
        </UserInterfaceShell>
    );
}

export default App;
