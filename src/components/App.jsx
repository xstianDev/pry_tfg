import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home/';
// import Register from './Register';
import Login from './Login';

import '/src/styles/App.css';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/register' element={<Register />} />x */}
                <Route path='/login' element={<Login />} />
                
                {// TODO
                /*
                <Route exact path='/salud-mental' element={<SaludMental />} />
                <Route exact path='/desarrollo-personal' element={<DesarrolloPersonal />} />
                <Route exact path='/servicios-productos' element={<About />} />
                <Route path='*' element={<Error404 />} /> 
                */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;
