import React from 'react';

import footerSocials from '/src/data/footerSocials.js';


const FooterSocials = () => {
    return (
        <div className='footer-socials'>
            {footerSocials.map((icon, idx) => {
                return (
                    <div
                        className={`social_icon social_${idx}`}
                        key={`social_${idx}`}
                    >
                        <a href={icon.href} title={icon.title}>
                            <i className={icon.className}></i>
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default FooterSocials;
