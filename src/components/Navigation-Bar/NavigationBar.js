// src/components/NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./NavigationBar.css"


const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/my-appointment">My appointments</Link>
        </li>
        <li>
          <Link to="/make-appointment">Make an appointment</Link>
        </li>
     
      </ul>
    </nav>
  );
};

export default NavigationBar;
