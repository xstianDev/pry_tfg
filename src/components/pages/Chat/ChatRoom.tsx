import React, { useEffect, useState } from 'react';
import io from 'socket.io';

import ChatContainer from './ChatContainer';
import ChatMessageBox from './ChatMessageBox';

const socket = io('http://localhost:5000');

const ChatRoom = () => {
    const [myId, setMyId] = useState('');
    const [otherId, setOtherId] = useState('');
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);
    
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (name && message) {
            socket.emit('sendMessage', { name, message });
            setName('');
            setMessage('');
        }
    };
    
    return (
        <>
            <ChatContainer />
            <ChatMessageBox />
            <button onClick={handleSubmit}></button>
        </>
    );
};

export default ChatRoom;