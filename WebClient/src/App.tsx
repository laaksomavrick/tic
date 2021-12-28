import React, {useEffect} from 'react';
import * as signalR from "@microsoft/signalr";

// Room list
// Join room
// Chat

function App() {

    useEffect(() => {
        (async () => {
            try {

                const connection = new signalR.HubConnectionBuilder()
                    .withUrl("https://localhost:7009/hub")
                    .configureLogging(signalR.LogLevel.Information)
                    .build();

                connection.on('message', (content: any) => {
                    console.log(content)
                })

                await connection.start()

                console.log(connection);
            } catch (e) {
                console.error(e);
            }
        })()
    }, [])


    return (
        <h1>hello, world</h1>
    );
}

export default App;
