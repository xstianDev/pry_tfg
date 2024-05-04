// Chat.tsx
import React from 'react';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom';

const ChatClient = () => {
    return (
        <>
            <ChatSidebar />
            <ChatRoom />
        </>
    );
};

export default ChatClient;