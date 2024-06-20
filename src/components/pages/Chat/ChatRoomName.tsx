import React from 'react';

import user from '@img/chat/user-full.png';
import Icon from '@/components/shared/handlers/Icon';

interface ChatRoomNameProps {
    name: string;
}

const ChatRoomName = ({ name }: ChatRoomNameProps) => {
    return (
        <div className='chat-room-name-wrapper'>
            <div className="chat-room-name-container">
                <img className='chat-profile-picture' src={user} alt="" />
                <span className='chat-profile-name'>{name}</span>
            </div>
            <div className="chat-submenu">
                <Icon name='three-dots' />
            </div>
        </div>
    );
};

export default ChatRoomName;