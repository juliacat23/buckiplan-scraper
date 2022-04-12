import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { NavBar, Loading } from './components';
import { Home } from './views';

import './App.css';

const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id='app' className='d-flex flex-column h-100'>
            <NavBar />
            <div className='container flex-grow-1'>
                <Routes>
                    <Route path='/' exact element={Home} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
