import '@css/Chat.css';

import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom';
import { SocketContextProvider } from '@/context/SocketContext';


const Chat = () => {
    return (
        <SocketContextProvider>
            <div className="chat-wrapper wrapper">
                <ChatSidebar />
                <ChatRoom />
            </div>
        </SocketContextProvider>
    );
};

export default Chat;