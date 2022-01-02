import { createContext, useContext, useEffect, useState } from "react";
import { GetDataError } from "restful-react";
import { GetUserVm } from "./api/hooks";
import { useApi } from "./api/ApiContext";
import { useLocalStorage } from "./LocalStorageContext";

const USER_DATA = "USER_DATA";

export interface UserState {
    user: GetUserVm | null;
    loading: boolean;
    error: GetDataError<unknown> | null;
}

export const UserContext = createContext<UserState>({
    user: null,
    loading: true,
    error: null,
})

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
    const { useUserCreate } = useApi();
    const { getItem, setItem } = useLocalStorage();
    const { mutate, loading, error } = useUserCreate({});

    const [state, setState] = useState<UserState>({
        user: null,
        loading: true,
        error: null
    });

    useEffect(() => {
         (async () => {
            if (state.user != null)
            {
                return;
            }
            
            if (state.error != null) {
                return;
            }

            const userJson = getItem(USER_DATA);

            if (userJson == null)
            {
                const user = await mutate()

                setItem(USER_DATA, JSON.stringify(user));

                setState({
                    ...state,
                    user
                })
            } else {
                const user = JSON.parse(userJson);

                setState({
                    error: null,
                    loading: false,
                    user
                })
            }

        })()
    }, [getItem, state, setItem]);

    useEffect(() => {
        setState(state => ({...state, loading}))
    }, [loading])

    useEffect(() => {
        setState(state => ({...state, error}))
    }, [error])

    return (
        <UserContext.Provider value={state}>{children}</UserContext.Provider>
    );

}