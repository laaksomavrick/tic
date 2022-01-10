import { render } from '@testing-library/react'
import React from 'react'
import {
    BrowserRouter
} from 'react-router-dom'
import { ApiContext, ApiState } from '../api/ApiContext'
import { getMockReturnValueFactory, mutateMockReturnValueFactory } from '../api/ApiContext.mocks'
import { GetRoomVm, GetUserVm } from '../api/hooks'
import { UserInterfaceShell } from '../common/UserInterfaceShell'
import { LocalStorageContext, LocalStorageState } from '../LocalStorageContext'
import { RoomProvider } from '../RoomContext'
import { UserProvider } from '../user/UserContext'
import { RoomListPage } from './RoomListPage'

describe('RoomListPage', () => {
    const user: GetUserVm = {
        id: 'foo',
        username: 'username'
    };

    let rooms: GetRoomVm[] = [
        {
            id: '1',
            name: 'roomOne'
        },
        {
            id: '2',
            name: 'roomTwo'
        }
    ]

    // Api mocks
    let useUserCreateMock = mutateMockReturnValueFactory({ mutate: jest.fn(() => Promise.resolve(user)) });
    let useRoomGetAllMock = getMockReturnValueFactory({
        data: rooms,
        loading: false,
        error: null
    });
    let useRoomCreateMock = mutateMockReturnValueFactory({});

    const apiContextValue = {
        useUserCreate: useUserCreateMock,
        useRoomGetAll: useRoomGetAllMock,
        useRoomCreate: useRoomCreateMock,
        useUserGetOne: jest.fn()
    } as unknown as ApiState;

    // Local storage mocks
    let getItemMock = jest.fn();
    let setItemMock = jest.fn();

    const localStorageContextValue = {
        getItem: getItemMock,
        setItem: setItemMock
    } as LocalStorageState;

    const getComponent = () => (
        <ApiContext.Provider value={apiContextValue}>
            <LocalStorageContext.Provider value={localStorageContextValue}>
                <UserInterfaceShell>
                    <UserProvider>
                        <RoomProvider>
                            <BrowserRouter>
                                <RoomListPage />
                            </BrowserRouter>
                        </RoomProvider>
                    </UserProvider>
                </UserInterfaceShell>
            </LocalStorageContext.Provider>
        </ApiContext.Provider>
    )

    beforeEach(() => {
        // Bizarre, this doesn't work when brought up a level in scope
        // I.e., causes infinite hangs
        getItemMock.mockImplementation(() => JSON.stringify(user));
        jest.clearAllMocks();
    })

    it('renders', () => {
        const { getByTestId } = render(
            getComponent()
        )

        const roomListPage = getByTestId('RoomListPage');

        expect(roomListPage).toBeInTheDocument();
    })

    it('displays the user\'s name', async () => {
        const { findByText } = render(
            getComponent()
        )

        const username = await findByText("username");

        expect(username).toBeInTheDocument();
    });


    it.todo('displays a listing of rooms')
    it.todo('displays an error when rooms cannot be retrieved')
    it.todo('displays an error when a room cannot be created')
    it.todo('can redirect to a room')
    it.todo('can create a room')

})
