import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useConnection } from './ConnectionProvider';

// Room list
// Join room
// Chat

function App() {
    const { connection, loading, error } = useConnection();

    connection?.on('message', (content: any) => {
        console.log(content);
    });

    return (
        <>
            <h1>{loading ? 'loading' : 'loaded'}</h1>
            {error === true ? <p>error</p> : null}
        </>
    );
}

export default App;
