import { BootstrapIcon } from '@/types';
import React from 'react';

interface IconProps {
    name: BootstrapIcon
}

const Icon = ({ name }: IconProps) => <i className={`bi bi-${name}`}></i>;

export default Icon;