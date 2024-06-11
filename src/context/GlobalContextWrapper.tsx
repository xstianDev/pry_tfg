import React, { ReactNode } from 'react';
import { AuthContextProvider } from './AuthContext';
import { ModalContextProvider } from './ModalContext';

export interface ModalContextProps {
    children: ReactNode
}

const GlobalContextWrapper = ({ children }: ModalContextProps) => {
    return (
        <ModalContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </ModalContextProvider>
    );
};

export default GlobalContextWrapper;