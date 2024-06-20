import React from 'react';

interface ConversationProps {
    avatar: string;
    name: string;
}

const Conversation = (props: ConversationProps) => {
    const { avatar, name } = props;

    return (
        <div className="chat-conversation">
            <img className="chat-profile-picture" src={avatar} />
            <span className='chat-profile-name'>{name}</span>
        </div>
    );
};

export default Conversation;