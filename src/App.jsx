import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "./assets/sass/_index.scss";
import "react-toggle/style.css";

// import {DarkToggle} from "./components/themes/DarkToggle";
import Login from './views/Login';

export default function App() {
    return (
      <Router>
        <Routes>
          <Route exact path='/login' exact element={<Login />} />
        </Routes>
      </Router>
    );
  }