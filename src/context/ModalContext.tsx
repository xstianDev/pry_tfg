import { BootstrapIcon, Color, SetState } from '@/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface ModalContextProps {
    children: ReactNode;
}

export interface ModalState {
    icon: BootstrapIcon;
    text: string;
    color: Color;
}

export interface ModalContextModel {
    modal: ModalState;
    setModal: SetState<ModalState>;
}

const ModalContext = createContext<ModalContextModel>(null);

export const useModalContext = () => {
    return useContext(ModalContext);
};

export const ModalContextProvider = ({ children }: ModalContextProps) => {
    const [modal, setModal] = useState<ModalState>(null);

    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};
