
import React from 'react';
import { MessageType } from '@/types';

export interface MessageProps {
    type: MessageType;
    content: string;
    avatar: string;
}

const Message = (props: MessageProps) => {
    const { type, content, avatar } = props;
    return (
        <div className='message-wrapper'>
            <div className='message-content'>
                {type === 'text'
                    ? <span>{content}</span>
                    : <img src={content}/>
                }
            </div>
            <img className='message-avatar' src={avatar} />
        </div>
    );
};

export default Message;