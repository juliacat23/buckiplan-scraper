import React from "react";
import {signInWithGoogle} from '../services/firebase';

const Login = () => {
    return (
      <div>
        <button className="email-button email-button--top" variant="primary" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
      </div>
    )
  }
  
  export default Login;