import { UserContext } from '../user/UserContext';
import { ConnectionContext } from '../ConnectionContext';
import { ApiContext } from '../api/ApiContext';
import { useJoinChatroom } from './useJoinChatroom';
import { renderHook } from '@testing-library/react-hooks';

describe('useJoinChatroom', () => {
    const roomId = 'roomId';
    const userId = 'userId';
    const connectionId = 'connectionId';
    const connection = { connectionId } as any;
    const wrapper: React.FC = ({ children }) => (
        <ApiContext.Provider
            value={
                {
                    useRoomJoinRoom: jest.fn(() => ({
                        mutate: mockJoinRoom,
                        error: null,
                    })),
                } as any
            }
        >
            <ConnectionContext.Provider
                value={{ connection, loading: false, error: false }}
            >
                <UserContext.Provider
                    value={{
                        user: { id: userId, username: 'username' },
                        loading: false,
                        error: null,
                    }}
                >
                    {children}
                </UserContext.Provider>
            </ConnectionContext.Provider>
        </ApiContext.Provider>
    );

    const mockJoinRoom = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('joins a chatroom on mount', async () => {
        mockJoinRoom.mockImplementation(() => Promise.resolve());
        const { result, waitForNextUpdate } = renderHook(
            () => useJoinChatroom(roomId),
            {
                wrapper,
            },
        );

        expect(result.current.joined).toBe(false);

        await waitForNextUpdate();

        expect(result.current.joined).toBe(true);
        expect(mockJoinRoom).toHaveBeenCalledTimes(1);
    });
});
