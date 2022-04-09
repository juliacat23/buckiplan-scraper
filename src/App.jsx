import React from "react";
import "./assets/sass/_index.scss";
import "react-toggle/style.css";

import {DarkToggle} from "./components/themes/DarkToggle";

export default function App() {
    return (
      <>
        <DarkToggle />
      </>
    );
  }