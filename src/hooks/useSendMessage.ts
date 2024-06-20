import { apiChat } from '@/api/axios';
import { sendError } from '@/api/error';
import { MessageDocument } from '@/models/Message';
import { useChatContext } from '@/context/ChatContext';

const useSendMessage = () => {
    const { messages, setMessages, selectedChat } = useChatContext();

    const sendMessage = async (message: MessageDocument) => {
        apiChat.post(`/send/${selectedChat._id}`, { message })
            .then(res => setMessages([...messages, res.data]))
            .catch(err => sendError(err));
    };

    return { sendMessage };
};
export default useSendMessage;
