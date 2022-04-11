import React, {useEffect, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {signInWithGoogle} from '../services/firebase';
import {UserContext, userContext} from '../providers/userProvider';

export default function Login() {
  const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)

  useEffect(() => {
    if (user) {
      setredirect('/dashboard')
    }
  }, [user])
  if (redirect) {
    return <Redirect to={redirect}/>
  }
  return (
    <div className='login-buttons'>
      <button className='email-button email-button--to' onClick={signInWithGoogle}>
        GET STARTED
      </button>
    </div>
  );
}