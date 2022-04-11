import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userProvider from "./providers/userProvider";

import Login from './components/LoginButton';
import Dashboard from './pages/Dashboard';

import "./assets/sass/App.scss";
import UserProvider from "./providers/userProvider";


// import {DarkToggle} from "./components/themes/DarkToggle";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;