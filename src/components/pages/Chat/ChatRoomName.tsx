import React from 'react';

import user from '@img/chat/user-full.png';
import Icon from '@/components/shared/handlers/Icon';

interface ChatRoomNameProps {

}

const ChatRoomName = (props: ChatRoomNameProps) => {
    return (
        <div className='chat-room-name-wrapper'>
            <div className="chat-room-name-container">
                <img className='chat-profile-picture' src={user} alt="" />
                <span className='chat-profile-name'>Nombre</span>
            </div>
            <div className="chat-submenu">
                <Icon name='three-dots' />
            </div>
        </div>
    );
};

export default ChatRoomName;