import '@css/App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Header } from './pages/Home/Header';
import { Auth } from './pages/Auth';
import { Chat } from './pages/Chat';
import { Error404 } from './shared/errors';
import { VerifyEmailHandler, WIP, Redirect } from './shared/handlers';

import { HOME, LOGIN, LOGOUT, REGISTER } from '@/constants/pageRoutes';
import { VERIFY_SESSION, API_AUTH } from '@/constants/apiRoutes';
import { useAuthContext } from '@/context/AuthContext';
import { apiAuth } from '@/api/axios';
import { sendError } from '@/api/error';
import Modal from './shared/errors/Modal';
import { useModalContext } from '@/context/ModalContext';

interface AppProps {
    isClient: boolean
}

const _Home = () => <Redirect to={HOME} />;

const App = ({ isClient }: AppProps) => {
    const { auth, setAuth } = useAuthContext();
    const { setModal } = useModalContext();

    useEffect(() => {
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

                {!auth.logged 
                    ? <>
                        <Route path={LOGIN} element={<Auth isRegister={false} />} />
                        <Route path={REGISTER} element={<Auth isRegister={true} />} />
                    </> 
                    : <>
                        <Route path={LOGOUT} />
                    </>
                }
                
                <Route path='/salud-mental' element={<WIP />} />
                <Route path='/desarrollo-personal' element={<WIP />} />
                <Route path='/servicios-productos' element={<WIP />} />
            
                {isClient && <>
                    <Route path={API_AUTH} element={<_Home />} >
                        <Route path='verify' element={<_Home />} >
                            <Route path='email/:token' element={<VerifyEmailHandler />} />
                            <Route path='session' />
                            {/* <Route path='*' />  element={<_Home />}*/}
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
