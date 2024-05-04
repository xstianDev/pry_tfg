/// <reference types="vite/client" />

export interface Btn {
    id: number,
    text: string,
    url: string
}

export interface Row {
    rowIdx: number;
    text: string;
    url: string;
}

export interface Column {
    colIdx: number,
    title: string,
    rows: Row[];
}

export interface Social {
    id: number;
    href: string;
    title: string;
    className: string;
}

export type Optional<T> = T | null;

export type AuthInputType = 'text' | 'email' | 'password' | 'date'; 

export type ChatSessionType = 'chat' | 'group';

export type MessageType = 'text' | 'image' | 'video';
