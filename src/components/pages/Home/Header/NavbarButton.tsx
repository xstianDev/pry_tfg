import React from 'react';
import { Link } from 'react-router-dom';

import { Btn } from '@/types';

interface NavbarButtonProps {
    btn: Btn;
}

const NavbarButton = ({ btn }: NavbarButtonProps) => {
    const { id, text, url } = btn;
    return (
        <div className='navbar-button' key={id}>
            <Link to={url}>{text}</Link>
        </div>
    );
};

export default NavbarButton;