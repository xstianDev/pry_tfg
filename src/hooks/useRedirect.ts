import { useNavigate } from 'react-router-dom';

type RedirectFunction = (to: string) => void

const useRedirect = (): RedirectFunction => {
    const navigate = useNavigate();

    const redirect: RedirectFunction = (to) => {
        navigate(to, { replace: true });
    };
    
    return redirect;
};

export default useRedirect;