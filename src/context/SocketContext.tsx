import { SetState } from '@/types';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type SocketIO = Socket<DefaultEventsMap, DefaultEventsMap>;

export interface SocketContextProps {
    children: ReactNode;
}

export interface SocketContextModel {
    socket: SocketIO;
    setSocket: SetState<SocketIO>;
}

export const useSocketContext = () => {
    return useContext(SocketContext);
};

const SocketContext = createContext<SocketContextModel>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const [socket, setSocket] = useState<SocketIO>(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socketIO = io('wss://localhost:4001', {
            upgrade: true,
            transports: ['websocket', 'long-polling'],
            // query: {
            //     userId: socket._id,
            // },
        });

        // socket.on() is used to listen to the events. can be used both on client and server side
        // socket.on('getOnlineUsers', (users) => {
        //     setOnlineUsers(users);
        // });

        setSocket(socketIO);

        return () => {
            if (socket) socket.close();
        };
    }, []);
    
    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
