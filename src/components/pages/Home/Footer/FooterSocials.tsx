import React from 'react';
import { Link } from 'react-router-dom';

import footerSocials from '@/assets/js/footerSocials';

import { IFooterSocial } from '@/types';
import Icon from '@/components/shared/handlers/Icon';

const FooterSocials = () => (
    <div className='footer-socials'>
        {footerSocials.map(({ href, title, icon }: IFooterSocial, idx: number) => 
            <div
                className={`social_icon social_${idx}`}
                key={`social_${idx}`}
            >
                <Link to={href} title={title}>
                    <Icon name={icon} />
                </Link>
            </div>
        )}
    </div>
);

export default FooterSocials;
