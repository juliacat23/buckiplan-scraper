import React from "react";
import "./styles/_index.scss";
import "react-toggle/style.css";

import {DarkToggle} from "./components/themes/DarkToggle";

export default function App() {
    return (
      <>
        <div className="TextCard">
          <h2 className="TextCard__Title">Temperature for plants 🌱</h2>
          <p className="TextCard__Body">
            The proper condition of temperature is the most difficult thing to
            regulate and maintain in growing plants in the house.
          </p>
          <button className="Button">Learn more</button>
        </div>
  
        <DarkToggle />
      </>
    );
  }