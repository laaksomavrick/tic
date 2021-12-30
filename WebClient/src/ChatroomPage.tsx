import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

export const ChatroomPage: React.FC = () => {

    const { roomId } = useParams();

    if (roomId == null)
    {
        return (<Navigate replace to="/" />)
    }

    return (
        <h1>chatroom {roomId}</h1>
    )
}