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
          <Link to="/create-user">Create User</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/appointments">Appointments</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;