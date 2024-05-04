import React, { ReactNode, useEffect, useState } from 'react';
import { AuthInputType, Optional } from '@/types';

interface AuthFieldProps {
    className: string,
    labelText: string,
    type: AuthInputType,
    placeholder: Optional<string>,
    required: boolean
    cb: React.Dispatch<React.SetStateAction<string>>,
    extra: Optional<{
        tag: Optional<ReactNode>,
        bottom: Optional<ReactNode>,
    }> 
}

const AuthField = (props: AuthFieldProps) => {
    const { className, labelText, type, placeholder, required, cb, extra } = props;

    const [inputType, setInputType] = useState(type);
    const [icon, setIcon] = useState('bi-eye-fill');

    return (
        <div className={`auth-field ${className}`}>
            <div className='auth-label-container'>
                <label className='auth-label'>{labelText}</label>
                {extra?.tag}
            </div>
            <input 
                type={inputType}
                placeholder={placeholder}
                onChange={e => cb(e.target.value)}
                required={required}
            />
            {type === 'password' &&
                <div className="password-toggle-icon" onClick={() => {
                    setInputType(inputType === 'password' ? 'text' : 'password');
                    setIcon(icon === 'bi-eye-fill' ? 'bi-eye-slash' : 'bi-eye-fill');
                }}>
                    <i className={`bi ${icon}`}></i>
                </div>
            }
            {extra?.bottom}
        </div>
    );
};

export default AuthField;