import React, { createContext, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useContext, useState } from 'react';

export type Connection = signalR.HubConnection;

export interface ConnectionState {
    connection?: Connection;
    loading: boolean;
    error: boolean;
}

export const ConnectionContext = createContext<ConnectionState>({
    connection: undefined,
    loading: true,
    error: false,
});

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider: React.FC = ({ children }) => {
    const [connection, setConnection] = useState<Connection | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            if (connection !== undefined) {
                return;
            }
            try {
                const connection = new signalR.HubConnectionBuilder()
                    .withUrl('https://localhost:7009/hub') // TODO: read from env
                    .configureLogging(signalR.LogLevel.Information)
                    .build();

                await connection.start();

                setConnection(connection);
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [setConnection, setLoading, setError, connection]);

    const connectionState = { connection, loading, error };

    return (
        <ConnectionContext.Provider value={connectionState}>{children}</ConnectionContext.Provider>
    );
};
