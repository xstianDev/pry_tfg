import React from 'react';
import { Link } from 'react-router-dom';

import footerSocials from '@/assets/js/footerSocials';

import { Social } from '@/types';

const FooterSocials = () => {
    return (
        <div className='footer-socials'>
            {footerSocials.map((social: Social, idx: number) => {
                const { href, title, className } = social;
                return (
                    <div
                        className={`social_icon social_${idx}`}
                        key={`social_${idx}`}
                    >
                        <Link to={href} title={title}>
                            <i className={className}></i>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterSocials;
