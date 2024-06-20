import React, { ReactNode, useState } from 'react';
import { AuthInputType, EyeIcons, SetState } from '@/types';
import Icon from '@/components/shared/handlers/Icon';

export interface AuthFieldProps {
    required: boolean;
    className: string;
    labelText: string;
    type: AuthInputType;
    cb: SetState<any>;
    placeholder?: string;
    extra?: {
        tag?: ReactNode;
        bottom?: ReactNode;
    };
}

const AuthField = (props: AuthFieldProps) => {
    const { required, className, labelText, type, cb, placeholder, extra } = props;

    const [currentType, setCurrentType] = useState<AuthInputType>(type);
    const [icon, setIcon] = useState<EyeIcons>('eye-fill');

    return (
        <div className={`auth-field ${className}`}>
            <div className='auth-label-container'>
                <label className='auth-label'>{labelText}</label>
                {extra?.tag}
            </div>
            <input 
                type={currentType}
                placeholder={placeholder}
                onChange={e => cb(e.target.value)}
                required={required}
            />
            {type === 'password' &&
                <div className="password-toggle-icon" onClick={() => {
                    setCurrentType(currentType === 'password' ? 'text' : 'password');
                    setIcon(icon === 'eye-fill' ? 'eye-slash' : 'eye-fill');
                }}>
                    <Icon name={icon} />
                </div>
            }
            {extra?.bottom}
        </div>
    );
};

export default AuthField;