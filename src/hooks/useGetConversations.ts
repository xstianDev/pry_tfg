import { useEffect, useState } from 'react';
import { sendError } from '@/api/error';
import { apiChat } from '@/api/axios';

/** Obtiene la lista de conversaciones para el usuario. */
const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        apiChat.get('/conversations')
            // .then(res => { setConversations(res.data.users); })
            .then(res => { console.log(res.data); })
            .catch(err => { sendError(err); });
    }, []);

    return { conversations };
};
export default useGetConversations;