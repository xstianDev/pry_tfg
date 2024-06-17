import { SetState, UserRole } from '@/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface AuthContextProps {
    children: ReactNode;
}

export interface AuthState {
    logged: boolean;
    role: UserRole;
}

export interface AuthContextModel {
    auth: AuthState;
    setAuth: SetState<AuthState>;
}

const AuthContext = createContext<AuthContextModel>(null);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: AuthContextProps) => {
    const [auth, setAuth] = useState<AuthState>({
        logged: false,
        role: 'anon'
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
