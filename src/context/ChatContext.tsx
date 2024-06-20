import { ChatDocument } from '@/models/Chat';
import { MessageDocument } from '@/models/Message';
import { SetState } from '@/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface ChatContextProps {
    children: ReactNode;
}

export interface ChatContextModel {
    selectedChat: ChatDocument;
    setSelectedChat: SetState<ChatDocument>;
    messages: MessageDocument[];
    setMessages: SetState<MessageDocument[]>;
}

const ChatContext = createContext<ChatContextModel>(null);

export const useChatContext = () => {
    return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }: ChatContextProps) => {
    const [selectedChat, setSelectedChat] = useState<ChatDocument>(null);
    const [messages, setMessages] = useState<MessageDocument[]>(null);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat, messages, setMessages }}>
            {children}
        </ChatContext.Provider>
    );
};
