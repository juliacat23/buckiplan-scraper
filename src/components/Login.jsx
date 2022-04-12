import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { signInWithGoogle } from '../services/firebase';
import { UserContext } from '../providers/UserProvider';


const Login = () => {
    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);

    useEffect(() => {
        if (user) {
            setredirect('/dashboard');
        }
    }, [user]);
    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <button
            className='email-button email-button--top'
            onClick={signInWithGoogle}
        >
            GET STARTED
        </button>
    );

}

export default Login;