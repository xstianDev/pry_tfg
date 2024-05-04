import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

const ChatSidebar = () => {
    const [ conversations, setConversations ] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/conversations/:id')
    //         .then(res => setConversations(res))
    //         .catch();
    // });

    return (
        <ul>
            {conversations.map((user, index) => {
                <li key={`conversation_${index}`}>
                    <span>{user}</span>
                </li>;
            })}
        </ul>
    );
};

export default ChatSidebar;