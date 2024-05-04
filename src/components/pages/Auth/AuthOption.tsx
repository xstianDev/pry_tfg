import React from 'react';
import { Link } from 'react-router-dom';

interface AuthOptionProps {
    paragraph: string,
    url: string,
    text: string
}

const AuthOption = (props: AuthOptionProps) => {
    const { paragraph, url, text } = props;
    return (
        <div className='auth-option-container'>
            <p>{paragraph}</p>
            <Link to={url}>{text}</Link>
        </div>
    );
};

export default AuthOption;