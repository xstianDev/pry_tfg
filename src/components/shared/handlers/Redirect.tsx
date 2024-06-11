import { useEffect } from 'react';
import useRedirect from '@/hooks/useRedirect';

interface RedirectProps {
    to: string;
}

export const Redirect = ({ to }: RedirectProps): null => {
    const redirect = useRedirect();

    useEffect(() => {
        redirect(to);
    }, [redirect, to]);

    return null;
};

export default Redirect;