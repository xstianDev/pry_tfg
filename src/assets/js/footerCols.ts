import { IFooterColumn } from '@/types';

const footerCols: IFooterColumn[] = [
    {
        title: 'Sobre nosotros',
        rows: [
            {
                text: 'Historia',
                url: 'history',
            },
            {
                text: 'Misión',
                url: 'info',
            },
            {
                text: 'Métodos',
                url: 'approach',
            },
            {
                text: 'Estadísticas',
                url: 'stats',
            },
        ],        
    },
    {
        title: 'Ayuda y soporte',
        rows: [
            {
                text: 'Reporta un error',
                url: 'report',
            },
            {
                text: 'Sugerencias',
                url: 'suggestions',
            },
            {
                text: 'Contáctanos',
                url: 'contact',
            },
            {
                text: 'Opina sobre nosotros',
                url: 'rate',
            },
        ],
    },
    {
        title: 'Apóyanos',
        rows: [
            {
                text: 'Hazte socio',
                url: 'partners',
            },
            {
                text: 'Donaciones',
                url: 'donations',
            },
            {
                text: 'Patrocinios',
                url: 'sponsorship',
            },
        ],
    },
    {
        title: 'Empleo',
        rows: [
            {
                text: 'Trabajos disponibles',
                url: 'work',
            },
            {
                text: 'Manda tu CV',
                url: 'cv',
            },
        ],
    },
    {
        title: 'Condiciones',
        rows: [
            {
                text: 'Política de privacidad',
                url: 'privacy',
            },
            {
                text: 'Protección de datos',
                url: 'data-protection',
            },
            {
                text: 'Aviso legal',
                url: 'legal',
            },
            {
                text: 'Cookies',
                url: 'cookies',
            },
        ],
    },
];

export default footerCols;