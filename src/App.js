// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './components/Users/UserList.js';
import Appointments from './components/Appointments/Appointments.js';
import NavigationBar from './components/Navigation-Bar/NavigationBar.js';
import CreateUser from './components/Create-User/CreateUser.js';
import LoginPage from './components/Login/Login.js';
import Home from './components/HomePage/HomePage.js';
import ServicePage from './components/MakeAppointment/ServicePage.js';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              authenticatedUser ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginPage onAuthenticate={setAuthenticatedUser} />
              )
            }
          />
          <Route
            path="/home"
            element={
              authenticatedUser ? (
                <div>
                  <NavigationBar />
                  <Home />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/create-user"
            element={
              <div>
               
                <CreateUser />
              </div>
            }
          />
          <Route
            path="/make-appointment"
            element={
              authenticatedUser ? (
                <div>
                  <NavigationBar />
                  <ServicePage />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              authenticatedUser ? (
                <div>
                  <NavigationBar />
                  <Users />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/appointments"
            element={
              authenticatedUser ? (
                <div>
                  <NavigationBar />
                  <Appointments />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
