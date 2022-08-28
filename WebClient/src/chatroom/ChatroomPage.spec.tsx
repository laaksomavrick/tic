import * as joinChatroom from './useJoinChatroom';
import { UserContext } from '../user/UserContext';
import { ApiContext } from '../api/ApiContext';
import { ChatroomPage } from './ChatroomPage';
import { screen, render } from '@testing-library/react';
import { RoomContext } from '../RoomContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        roomId: 'roomId',
    }),
    useNavigate: jest.fn(),
}));

describe('ChatroomPage', () => {
    const wrapper: React.FC = ({ children }) => (
        <ApiContext.Provider
            value={
                {
                    useMessageCreate: jest.fn(() => ({
                        mutate: jest.fn(),
                        loading: false,
                        error: null,
                    })),
                } as any
            }
        >
            <UserContext.Provider
                value={{
                    user: { id: 'id', username: 'username' },
                    loading: false,
                    error: null,
                }}
            >
                <RoomContext.Provider
                    value={[
                        {
                            rooms: [{ id: 'roomId' }],
                            loading: false,
                            error: null,
                        },
                        jest.fn(),
                    ]}
                >
                    {children}
                </RoomContext.Provider>
            </UserContext.Provider>
        </ApiContext.Provider>
    );

    it('shows a loading spinner when a user is joining', () => {
        jest.spyOn(joinChatroom, 'useJoinChatroom').mockImplementation(() => ({
            joined: false,
            error: null,
        }));
        render(<ChatroomPage />, { wrapper });
        const spinner = screen.getByTestId('TicSpinner');
        expect(spinner).toBeInTheDocument();
    });

    it('shows the chatroom when the user has joined', () => {
        jest.spyOn(joinChatroom, 'useJoinChatroom').mockImplementation(() => ({
            joined: true,
            error: null,
        }));
        render(<ChatroomPage />, { wrapper });
        const container = screen.getByTestId('ChatroomContainer');
        expect(container).toBeInTheDocument();
    });
});
