import '@css/Modal.css';
import React, { useEffect, useState } from 'react';
import Icon from '../handlers/Icon';
import { useModalContext } from '@/context/ModalContext';
import { BootstrapIcon, Color } from '@/types';

const Modal = () => {
    const { modal } = useModalContext();

    const [icon, setIcon] = useState<BootstrapIcon>(null);
    const [text, setText] = useState<string>(null);
    const [color, setColor] = useState<Color>(null);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if (!modal) return;

        setIcon(modal.icon);
        setText(modal.text);
        setColor(modal.color);
        setShow(true);
        
        const showTimeout = setTimeout(() => {
            setShow(false);
        }, 5000);
        
        return () => {
            clearTimeout(showTimeout);
        };
    }, [modal]);

    return (show &&
        <div className={`modal-wrapper ${color} animation`}>
            <Icon name={icon} />
            <span>{text}</span>
        </div>
    );
};

export default Modal;