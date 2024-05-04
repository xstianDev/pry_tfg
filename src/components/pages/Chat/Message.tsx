
import React from 'react';
import { MessageType } from '@/types';

interface MessageProps {
    type: MessageType,
    content: string
}

const Message = (props: MessageProps) => {
    const { type, content } = props;
    return (
        <div className='message'>{content}</div>
    );
};

export default Message;