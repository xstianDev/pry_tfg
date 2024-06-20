import { useEffect } from 'react';

import { useSocketContext } from '@/context/SocketContext';
import { useChatContext } from '@/context/ChatContext';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useChatContext();

    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [socket, setMessages, messages]);
};
export default useListenMessages;