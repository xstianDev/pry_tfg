import React from 'react';

interface ErrorProps {
    icon: string
    text: string
}

const Error = (props: ErrorProps) => {
    const { icon, text } = props;    
    return (
        <div className='auth-error-container'>
            <i className={`bi bi-${icon}`}></i>
            <span>{ text }</span>
        </div>
    );
};

export default Error;