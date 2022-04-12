import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import UserContext from './providers/UserProvider';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import "./assets/sass/App.scss";

// import {DarkToggle} from "./components/themes/DarkToggle";

export default function App() {
    return (
      <UserContext>
        <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/dasboard' element={<Dashboard />} />
        </Routes>
      </Router>
      </UserContext>
    );
  }