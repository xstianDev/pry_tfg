import '@css/Chat.css';

import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom';
import { SocketContextProvider } from '@/context/SocketContext';
import { ChatContextProvider } from '@/context/ChatContext';


const Chat = () => {
    return (
        <SocketContextProvider>
            <ChatContextProvider>
                <div className="chat-wrapper wrapper">
                    <ChatSidebar />
                    <ChatRoom />
                </div>
            </ChatContextProvider>
        </SocketContextProvider>
    );
};

export default Chat;