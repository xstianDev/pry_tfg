import React from 'react';

interface ChatUserProps {
    profilePicture: string,
    name: string
}

const ChatUser = (props: ChatUserProps) => {
    const { profilePicture, name } = props;

    return (
        <li className="chat-session">
            <img className="chat-profile-picture" src={profilePicture} />
            <span className='chat-profile-name'>{name}</span>
        </li>
    );
};

export default ChatUser;