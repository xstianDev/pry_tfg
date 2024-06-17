import '@css/error.css';
import React, { ReactNode } from 'react';
import Icon from '../handlers/Icon';
import { BootstrapIcon } from '@/types';

export interface ErrorProps {
    icon: BootstrapIcon;
    content: string | ReactNode;
}

const Error = ({ icon, content }: ErrorProps) => {
    const error = (typeof content === 'string')
        ? <span>{content}</span>
        : content;

    return (
        <div className='error-container'>
            <Icon name={icon} />
            <div className='error-content'>
                {error}
            </div>
        </div>
    );
};

export default Error;