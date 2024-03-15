import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Auth } from './site';
import { Error404 } from './shared';

import '/src/styles/App.css';

const App = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth isRegister={false} />} />
        <Route path='/register' element={<Auth isRegister={true} />} />
        
        {/* // TODO: Enrutamiento de direcciones. */}
        {/*
        <Route exact path='/salud-mental' element={<SaludMental />} />
        <Route exact path='/desarrollo-personal' element={<DesarrolloPersonal />} />
        <Route exact path='/servicios-productos' element={<About />} />
        */}
        <Route path='*' element={<Error404 url={window.location.href} />} /> 
    </Routes>
);  

export default App;
