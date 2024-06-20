import { useNavigate } from 'react-router-dom';

type RedirectFunction = (to: string) => void

/** Devuelve una función que redirige al usuario. */
const useRedirect = (): RedirectFunction => {
    const navigate = useNavigate();

    /**
     * Redirige al usuario a una ruta sin guardar la anterior en el historial.
     * @param to - Nueva ruta.
     */
    const redirect: RedirectFunction = (to) => {
        navigate(to, { replace: true });
    };
    
    return redirect;
};

export default useRedirect;