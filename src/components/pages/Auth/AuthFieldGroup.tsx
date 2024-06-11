import React, { ReactNode } from 'react';

export interface AuthFieldGroupProps {
    children: ReactNode
}

const AuthFieldGroup = ({ children }: AuthFieldGroupProps) => (
    <div className='auth-field-group'>
        {children}
    </div>
);

export default AuthFieldGroup;