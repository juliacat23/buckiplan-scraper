import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "./assets/sass/App.scss";
import "react-toggle/style.css";

// import {DarkToggle} from "./components/themes/DarkToggle";
import Login from './components/views/Login';

export default function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>
    );
  }