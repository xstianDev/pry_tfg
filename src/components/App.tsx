import React, { Fragment } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { VerifyEmail } from './shared/screens';
import { Error404 } from './shared/errors';

import { HOME, LOGIN, REGISTER, VERIFY, VERIFY_TOKEN } from '@/constants/pageRoutes';
import '@css/App.css';

interface AppProps {
    isClient: boolean
}

const App = ({ isClient }: AppProps) => (
    <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Auth isRegister={false} />} />
        <Route path={REGISTER} element={<Auth isRegister={true} />} />
        
        {/*
        <Route exact path='/salud-mental' element={<SaludMental />} />
        <Route exact path='/desarrollo-personal' element={<DesarrolloPersonal />} />
        <Route exact path='/servicios-productos' element={<About />} />
        */}
        {isClient && <>
            <Route path={VERIFY}>
                <Route path=':token' element={<VerifyEmail />} />
                <Route path='' element={<Navigate to={HOME} />} />
            </Route>
            <Route path='*' element={<Error404 />} /> 
        </>}
    </Routes>
);

export default App;
