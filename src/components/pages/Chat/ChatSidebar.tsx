import React from 'react';

import user from '@img/chat/user-full.png';
import Conversation from './Conversation';
import useGetConversations from '@/hooks/useGetConversations';

const ChatSidebar = () => {
    // const { conversations } = useGetConversations();

    const conversations = [];
    for (let i = 0; i < 10; i++) {
        conversations.push({
            user,
            name: `Usuario ${i}`
        });
    }

    return (
        <div className='chat-sidebar-wrapper'>
            {conversations.map((chat, index: number) =>
                <Conversation
                    key={`conversation_${index}`}
                    avatar={user}
                    name={chat.name}
                />
            )}
        </div>
    );
};

export default ChatSidebar;