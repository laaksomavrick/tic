import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiContext, ApiState } from '../api/ApiContext';
import {
    getMockReturnValueFactory,
    mutateMockReturnValueFactory,
} from '../api/ApiContext.mocks';
import { UserInterfaceShell } from '../common/UserInterfaceShell';
import { LocalStorageContext, LocalStorageState } from '../LocalStorageContext';
import { RoomProvider } from '../RoomContext';
import { UserProvider } from '../user/UserContext';
import { RoomListPage } from './RoomListPage';

// Navigation mocks
let mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
}));

// Api mocks
let useUserCreateMock = jest.fn();
let useRoomGetAllMock = jest.fn();
let useRoomCreateMock = jest.fn();

const apiContextValue = {
    useUserCreate: useUserCreateMock,
    useRoomGetAll: useRoomGetAllMock,
    useRoomCreate: useRoomCreateMock,
    useUserGetOne: jest.fn(),
} as unknown as ApiState;

// Local storage mocks
let getItemMock = jest.fn();
let setItemMock = jest.fn();

const localStorageContextValue = {
    getItem: getItemMock,
    setItem: setItemMock,
} as LocalStorageState;

describe('RoomListPage', () => {
    const user = {
        id: 'foo',
        username: 'username',
    };

    let rooms = [
        {
            id: '1',
            name: 'roomOne',
        },
        {
            id: '2',
            name: 'roomTwo',
        },
    ];

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
    );

    beforeEach(() => {
        getItemMock.mockImplementation(() => JSON.stringify(user));
        useRoomGetAllMock.mockImplementation(
            getMockReturnValueFactory({
                data: rooms,
                error: null,
                loading: false,
            }),
        );
        useUserCreateMock.mockImplementation(
            mutateMockReturnValueFactory({
                mutate: jest.fn(() => Promise.resolve(user)),
            }),
        );
        useRoomCreateMock.mockImplementation(mutateMockReturnValueFactory({}));
        jest.clearAllMocks();
    });

    it('renders', () => {
        render(getComponent());

        const roomListPage = screen.getByTestId('RoomListPage');

        expect(roomListPage).toBeInTheDocument();
    });

    it("displays the user's name", async () => {
        render(getComponent());

        const username = await screen.findByText(user.username);

        expect(username).toBeInTheDocument();
    });

    it('displays a listing of rooms', async () => {
        render(getComponent());

        const firstRoom = await screen.findByText(rooms[0].name);
        const secondRoom = await screen.findByText(rooms[1].name);

        expect(firstRoom).toBeInTheDocument();
        expect(secondRoom).toBeInTheDocument();
    });

    it('displays an error when rooms cannot be retrieved', async () => {
        const errorText = 'Oops! Something went wrong';
        const error = {
            loading: false,
            data: null,
            error: { data: {}, message: '' },
        };
        useRoomGetAllMock.mockImplementation(() => ({
            loading: false,
            data: null,
            error,
        }));

        render(getComponent());

        const errorToast = await screen.findByText(errorText);

        expect(errorToast).toBeInTheDocument();
    });

    // TODO: why do multiple toasts appear?
    xit('displays an error when a room cannot be created', async () => {
        const errorText = 'Oops! Something went wrong';
        const error = {
            loading: false,
            data: null,
            error: { data: {}, message: '' },
        };

        useRoomCreateMock.mockImplementation(() => ({
            loading: false,
            mutate: () => Promise.resolve(),
            error,
        }));

        render(getComponent());

        const errorToast = await screen.findByText(errorText);

        expect(errorToast).toBeInTheDocument();
    });

    it('can redirect to a room', async () => {
        render(getComponent());

        const button = screen.getByTestId('RoomListItem-1');

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
    });

    it('can create a room', async () => {
        const roomName = 'foo';
        const roomId = '1337';
        let createRoomMutateMock = jest.fn(() =>
            Promise.resolve({ id: roomId, name: roomName }),
        );

        useRoomCreateMock.mockImplementation(() => ({
            loading: false,
            mutate: createRoomMutateMock,
            error: null,
        }));

        render(getComponent());

        const createRoomButton = screen.getByTestId('RoomListCreateRoomButton');
        fireEvent.click(createRoomButton);

        const createRoomInput = screen.getByLabelText('Name');
        const createButon = screen.getByRole('button', {
            name: 'CreateButton',
        });

        fireEvent.change(createRoomInput, { target: { value: roomName } });
        fireEvent.click(createButon);

        const newRoom = await screen.findByTestId(`RoomListItem-${roomId}`);

        expect(newRoom).toBeInTheDocument();
    });
});
