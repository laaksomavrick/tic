import { createContext, useContext } from 'react';

export interface LocalStorageState {
    getItem: typeof localStorage['getItem'];
    setItem: typeof localStorage['setItem'];
}

export const LocalStorageContext = createContext<LocalStorageState>({
    getItem: window.localStorage.getItem.bind(localStorage),
    setItem: window.localStorage.setItem.bind(localStorage),
});

export const useLocalStorage = () => useContext(LocalStorageContext);
