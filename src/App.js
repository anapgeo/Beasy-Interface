// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users/UserList.js';
import Appointments from './components/Appointments/Appointments.js';
import NavigationBar from './components/Navigation-Bar/NavigationBar.js';
import CreateUser from './components/Create-User/CreateUser.js';
import LoginPage from './components/Login/Login.js';
import Home from './components/HomePage/HomePage.js';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          {/* Pass setAuthenticatedUser to LoginPage */}
          <Route path="/" element={<LoginPage onAuthenticate={setAuthenticatedUser} />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<div><NavigationBar/> <Home/> </div>} authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/create-user"
            element={<PrivateRoute element={<div><NavigationBar/> <CreateUser/> </div>} authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute element={<div><NavigationBar/> <Users/> </div>} authenticatedUser={authenticatedUser} />}
          />
          <Route
            path="/appointments"
            element={<PrivateRoute element={<div><NavigationBar/> <Appointments/> </div>} authenticatedUser={authenticatedUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ element, authenticatedUser }) => {
  // Check if the user is authenticated
  const isAuthenticated = authenticatedUser !== null;

  // If authenticated, render the specified element; otherwise, redirect to the login page
  return isAuthenticated ? element : null;
};

export default App;