import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button
            className='email-button email-button--top'
            onClick={() => loginWithRedirect()}
        >
            Login In
        </button>
    );
};

export default LoginButton;
