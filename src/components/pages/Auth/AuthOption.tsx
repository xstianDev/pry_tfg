import React from 'react';
import { Link } from 'react-router-dom';

export interface AuthOptionProps {
    paragraph: string,
    url: string,
    text: string
}

const AuthOption = ({ paragraph, url, text }: AuthOptionProps) => (
    <div className='auth-option-container'>
        <p>{paragraph}</p>
        <Link to={url} className='auth-link'>{text}</Link>
    </div>
);

export default AuthOption;