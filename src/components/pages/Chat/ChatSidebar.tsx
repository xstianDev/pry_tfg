import React, { useEffect, useState } from 'react';
import { apiChat } from '@/api/axios';

import ChatUser from './ChatUser';
import user from '@img/chat/user-full.png';

const ChatSidebar = () => {
    const [conversations, setConversations] = useState([]);

    // useEffect(() => {
    //     apiChat.get('/conversations')
    //         .then(res => setConversations(res))
    //         .catch(err => { sendError(err); });
    // }, []);
    
    // useEffect(() => {
    //     apiChat.get('/conversations/:id')
    //         .then(res => setConversations(res))
    //         .catch(err => { sendError(err); });
    // }, [currentConversation]);

    const users = [];

    for (let i = 0; i < 10; i++) {
        users.push(
            <ChatUser key={`user_${i}`} profilePicture={user} name={`Usuario ${i}`} />
        );
    }

    return (
        <div className='chat-sidebar-wrapper'>
            <ul>{users}</ul>
        </div>
        // <ul>
        //     {conversations.map((user, index) => {
        //         <li key={`conversation_${index}`}>
        //             <span>{user}</span>
        //         </li>;
        //     })}
        // </ul>
    );
};

export default ChatSidebar;