import { MessageContent } from '@/types';
import React, { useEffect, useState } from 'react';

import ChatMessageBox from './ChatMessageBox';
import ChatMessages from './ChatMessages';
import { useSocketContext } from '@/context/SocketContext';
import ChatRoomName from './ChatRoomName';
import { useChatContext } from '@/context/ChatContext';


const ChatRoom = () => {
    const [myId, setMyId] = useState('');
    const [otherId, setOtherId] = useState('');
    const [message, setMessage] = useState<MessageContent>('');
    const [messages, setMessages] = useState([]);
    
    const { socket } = useSocketContext();
    const { selectedChat } = useChatContext();
    
    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('cliente conectado');
        });

        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message]);
        });
        
        return () => {
            socket.off('connect');
            socket.off('message');
        };
    }, [socket]);
            
    useEffect(() => {
        if (!socket) return;
        
        const { event, content } = (typeof message === 'string') 
            ? { event: 'send', content: { message } }
            : { event: 'upload', content: { image: message } };        
        
        socket.emit(event, content);
    }, [message]);

    return (
        <div className='chat-room-wrapper'>
            <div className='chat-room-container'>
                {selectedChat && <ChatRoomName name={selectedChat.name} />}
                <ChatMessages />
            </div>
            <ChatMessageBox cb={setMessage} />
        </div>
    );
};

export default ChatRoom;