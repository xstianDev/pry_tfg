import { useEffect } from 'react';
import useRedirect from '@/hooks/useRedirect';

interface RedirectProps {
    to: string;
}

/** Componente que redirige al usuario sin guardar la ruta anterior en el historial. */
export const Redirect = ({ to }: RedirectProps): null => {
    const redirect = useRedirect();

    useEffect(() => {
        redirect(to);
    }, [redirect, to]);

    return null;
};

export default Redirect;