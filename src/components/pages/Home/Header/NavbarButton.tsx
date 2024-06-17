import React from 'react';
import { Link } from 'react-router-dom';

import { INavbarButton } from '@/types';

interface NavbarButtonProps {
    btn: INavbarButton;
    idx: number;
}

const NavbarButton = ({ btn: { text, url }, idx }: NavbarButtonProps) => (
    <div className='navbar-button' key={idx}>
        <Link to={url}>{text}</Link>
    </div>
);

export default NavbarButton;