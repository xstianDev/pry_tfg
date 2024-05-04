import React, { ReactNode, useState } from 'react';
import { createContext } from 'vm';

interface AuthContextProps {
    children: ReactNode
}

const Context = createContext({});

const AuthContext = ({ children }: AuthContextProps) => {
    const [auth, setAuth] = useState({});

    return (
        <Context.Provider value={{ auth, setAuth }}>
            {children}
        </Context.Provider>
    );
};

export default AuthContext;