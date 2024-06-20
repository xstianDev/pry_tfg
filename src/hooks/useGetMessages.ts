import { useEffect } from 'react';
import { sendError } from '@/api/error';
import { apiChat } from '@/api/axios';
import { useChatContext } from '@/context/ChatContext';

/** Obtiene los mensajes de una conversación específica. */
const useGetMessages = () => {
    const { messages, setMessages, selectedChat } = useChatContext();

    useEffect(() => {
        const getMessages = async () => {
            apiChat.get(`/to/${selectedChat._id}`)
                .then(res => setMessages(res.data))
                .catch(err => sendError(err));
        };

        if (selectedChat._id) getMessages().catch(err => sendError(err));
    }, [selectedChat._id, setMessages]);

    return { messages };
};
export default useGetMessages;