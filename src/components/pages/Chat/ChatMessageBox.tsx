import React, { useEffect, useState } from 'react';
import { SetState, MessageContent } from '@/types';
import { uploadFile } from '@/api/upload';

interface ChatMessageBoxProps {
    cb: SetState<MessageContent>;
}

const ChatMessageBox = ({ cb }: ChatMessageBoxProps) => {
    const [content, setContent] = useState<MessageContent>(null);
    const [showFileInput, setShowFileInput] = useState<boolean>(true);
    const [showTextInput, setShowTextInput] = useState<boolean>(true);
    const [showSendButton, setShowSendButton] = useState<boolean>(false);

    useEffect(() => {
        if (!content) {
            setShowFileInput(true);
            setShowTextInput(true);
            setShowSendButton(false);
            return;
        }

        const isFile = content instanceof File;
        setShowSendButton(true);
        setShowFileInput(isFile);
        setShowTextInput(!isFile);
    }, [content]);
    
    const handleClickFile = () => {
        const file = uploadFile();
        if (file) setContent(file);

        // console.log(new Date(file.lastModified));
        // setContent(file);
        // console.log(content);
    };
    
    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleSend = () => {
        cb(content);
        setContent('');
    };

    return (
        <div className='chat-messagebox-wrapper'>
            {showFileInput && <button className='chat-send' onClick={handleClickFile}>Archivo</button>}
            {showTextInput && <input 
                className='chat-messagebox'
                type='text'
                value={typeof content === 'string' ? content : ''}
                onChange={handleText}
                placeholder='Escribe un mensaje'
            />}
            {showSendButton && <button className='chat-send' onClick={handleSend}>Enviar</button>}
        </div>
    );
};

export default ChatMessageBox;