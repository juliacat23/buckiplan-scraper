import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom'; // migrate from Redirect to Migrate in React v6

import { UserContext } from '../providers/userProvider';
import { logOut } from '../services/firebase';

export default function Dashboard() {
    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);

    useEffect(() => {
        if (!user) {
            setredirect('/');
        }
    }, [user]);
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className='dashboard'>
            <h1 className='dashboard-text'>Welcome Home</h1>
            <button className='logout-button' onClick={logOut}>
                <img
                    src='https://img.icons8.com/ios-filled/50/000000/google-logo.png'
                    alt='google icon'
                />
                <span> logout</span>
            </button>
        </div>
    );
}
