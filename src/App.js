// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './components/Users/UserList.js';
import Appointments from './components/Appointments/Appointments.js';
import NavigationBar from './components/Navigation-Bar/NavigationBar.js';
import CreateUser from './components/Create-User/CreateUser.js';
import LoginPage from './components/Login/Login.js';
import Home from './components/HomePage/HomePage.js';
import ServicePage from './components/MakeAppointment/ServicePage.js';
import MyAppointmentPage from './components/MyAppointments/MyAppointments.js';
import { AuthProvider, useAuth } from './AuthContext'; // Import AuthProvider and useAuth

const ProtectedRoute = ({ element }) => {
  const { authenticatedUser } = useAuth();
  return authenticatedUser ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>

      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={<ProtectedRoute element={<div><NavigationBar /><Home /></div>} />}
            />
            <Route path="/create-user" element={<CreateUser />} />
            <Route
              path="/make-appointment"
              element={<ProtectedRoute element={<div><NavigationBar /><ServicePage /></div>} />}
            />
            <Route
              path="/my-appointment"
              element={<ProtectedRoute element={<div><NavigationBar /><MyAppointmentPage /></div>} />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute element={<div><NavigationBar /><Users /></div>} />}
            />
            <Route
              path="/appointments"
              element={<ProtectedRoute element={<div><NavigationBar /><Appointments /></div>} />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
