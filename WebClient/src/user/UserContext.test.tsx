import { fireEvent, render, waitFor } from '@testing-library/react';
import { ApiContext, ApiState } from '../api/ApiContext';
import { LocalStorageContext } from '../LocalStorageContext';
import { UserProvider, USER_DATA, useUser } from './UserContext';

const TestComponent: React.FC = () => {
    const { user, loading, error} = useUser();

    if (loading)
    {
        return <div>loading</div>
    }

    if (error || user == null)
    {
        return <div>error</div>
    }

    return (
        <>
            <div data-testid="userId">{user.id} </div>
            <div data-testid="username">{user.username} </div>
        </>
    )
}

describe('UserContext', () => {
    const setItemMock = jest.fn();
    const getItemMock = jest.fn();

    const localStorageMock = {
        setItem: setItemMock,
        getItem: getItemMock
    }

    const mockMutate = jest.fn()

    const useUserCreateMock = {
        mutate: mockMutate,
        loading: false,
        error: null
    }

    const apiMock = {
        useUserCreate:  () => useUserCreateMock 
    } as unknown as ApiState


const getRender = () => (
    <ApiContext.Provider value={apiMock}>
    <LocalStorageContext.Provider value={localStorageMock}>
        <UserProvider>
            <TestComponent />
        </UserProvider>
    </LocalStorageContext.Provider>
</ApiContext.Provider>
)


    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('creates a user', async () => {
        const id = 'id';
        const username = 'username';
        getItemMock.mockImplementation(() => null)
        mockMutate.mockImplementation(() => Promise.resolve({ id, username }))

        const { findByTestId } = render(
            getRender()
        )

        const userIdDiv = await findByTestId('userId');
        const usernameDiv = await findByTestId('username');

        expect(setItemMock).toHaveBeenCalledWith(USER_DATA, JSON.stringify({ id, username }))

        expect(userIdDiv).toHaveTextContent(id);
        expect(usernameDiv).toHaveTextContent(username);
    })

    it('retrieves a cached user', async () => {
        const id = 'id';
        const username = 'username';
        getItemMock.mockImplementation(() => (JSON.stringify({ id, username})))

        const { findByTestId } = render(
            getRender()
        )

        const userIdDiv = await findByTestId('userId');
        const usernameDiv = await findByTestId('username');

        expect(getItemMock).toHaveBeenCalled()
        expect(setItemMock).not.toHaveBeenCalled()

        expect(userIdDiv).toHaveTextContent(id);
        expect(usernameDiv).toHaveTextContent(username);
    })
});