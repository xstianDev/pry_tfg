import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Header } from './pages/Home/Header';
import { Auth } from './pages/Auth';
import { Chat } from './pages/Chat';
import { Error404 } from './shared/errors';
import { VerifyEmailHandler, WIP, Redirect } from './shared/handlers';

import { HOME, LOGIN, LOGOUT, REGISTER } from '@/constants/pageRoutes';
import { VERIFY_SESSION, API_AUTH, VERIFY_EMAIL } from '@/constants/apiRoutes';
import { useAuthContext } from '@/context/AuthContext';
import { apiAuth } from '@/api/axios';
import { sendError } from '@/api/error';
import Modal from './shared/errors/Modal';
import LogoutHandler from './shared/handlers/LogoutHandler';

interface AppProps {
    isClient: boolean;
}

/**
 * Comprueba si la ruta actual está en la lista negra. Si este es el caso, no comprueba la sesión.
 * Sirve para saltar esta comprobación en casos donde no es necesario.
 */
const isNotCheckable = () => {
    const location = window.location.href;
    const blacklist = ['/api/auth/verify/'];

    for (const str in blacklist) {
        if (location.includes(str)) return true;
    }
};

const _Home = () => <Redirect to={HOME} />;

const App = ({ isClient }: AppProps) => {
    const { auth, setAuth } = useAuthContext();

    useEffect(() => {
        if (isClient && isNotCheckable()) return;

        apiAuth.post(VERIFY_SESSION)
            .then(res => {
                if (res.status !== 200) return;

                setAuth({
                    logged: (res.data.role !== 'anon'),
                    role: res.data.role
                });
            })
            .catch(err => { sendError(err); });
    }, []);
    
    return (
        <div className='global-wrapper'>
            <Header />
            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path='/chat' element={<Chat />} />

                {auth.logged 
                    ? <>
                        <Route path={LOGOUT} element={<LogoutHandler />} />
                    </> 
                    : <>
                        <Route path={LOGIN} element={<Auth isRegister={false} />} />
                        <Route path={REGISTER} element={<Auth isRegister={true} />} />
                    </>
                }
                
                <Route path='/salud-mental' element={<WIP />} />
                <Route path='/desarrollo-personal' element={<WIP />} />
                <Route path='/servicios-productos' element={<WIP />} />
            
                {isClient && <>
                    <Route path={`${API_AUTH}${VERIFY_EMAIL}`} element={<VerifyEmailHandler />} />
                    <Route path={API_AUTH} element={<_Home />} >
                        <Route path='verify' element={<_Home />} >
                            <Route path='session' />
                        </Route>
                    </Route>

                    <Route path='*' element={<Error404 />} />
                </>}
            </Routes>
            <Modal />
        </div>
    );
};

export default App;
