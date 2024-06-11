import '@css/WIP.css';
import React from 'react';

const WIP = () => (
    <div className='wip-wrapper wrapper'>
        <div className='wip-bar-container'>
            <div className='wip-bar-pattern move-right'></div>
            <div className='wip-bar-shadow'></div>
        </div>
        <span style={{ fontSize: '1.5em' }}>🚧 Actualmente estamos construyendo esta página 🚧</span>
        <div className='wip-bar-container'>
            <div className='wip-bar-pattern move-left'></div>
            <div className='wip-bar-shadow'></div>
        </div>
    </div>
);

export default WIP;
