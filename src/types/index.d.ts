/// <reference types="vite/client" />

import { InternalAxiosRequestConfig } from 'axios';
import React from 'react';

export interface INavbarButton {
    text: string;
    url: string;
}

export interface IFooterRow {
    text: string;
    url: string;
}

export interface IFooterColumn {
    title: string;
    rows: IFooterRow[];
}

export interface IFooterSocial {
    href: string;
    title: string;
    icon: SocialIcons;
}

export interface UserInfo {
    name: string;
    surname: string;
    gender: string;
    birthday: Date;
    address?: UserAddress;
}

export interface UserAddress {
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
}

export interface CustomError extends Error {
    config?: InternalAxiosRequestConfig<any>;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'white';

export type SocialIcons = 'instagram' | 'tiktok' | 'twitter-x' | 'youtube' | 'github';
export type InfoIcons = 'info-circle' | 'check2-circle';
export type BadIcons = 'exclamation-triangle' | 'exclamation-diamond';
export type EyeIcons = 'eye-fill' | 'eye-slash';
export type MiscIcons = 'three-dots';
export type BootstrapIcon = SocialIcons | InfoIcons | BadIcons | EyeIcons | MiscIcons;

export type AuthInputType = 'text' | 'email' | 'password' | 'date'; 

export type UserRole = 'anon' | 'user' | 'worker' | 'admin'; 
export type UserGender = 'M' | 'F';

export type ChatSessionType = 'chat' | 'group';

export type ImageType = 'image/png' | 'image/jpeg';
export type MessageType = 'text' | ImageType;
export type MessageContent = string | File;