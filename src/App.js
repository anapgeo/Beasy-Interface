
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './components/Users/UserList.js';
import Appointments from './components/Appointments/Appointments.js';
import NavigationBar from './components/Navigation-Bar/NavigationBar.js'
import CreateUser from './components/Create-User/CreateUser.js';
import LoginPage from './components/Login/Login.js';

const Home = () => {


  return (
    <div>
  
      <div>Home Page</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
      

        <Routes>
          <Route path="/" element={<LoginPage/>  }/>
          <Route path="/home" element={
            <div>
              <NavigationBar />
              <Home />
            </div>
          } />

        <Route path="/create-user" element={
            <div>
              <NavigationBar />
              <CreateUser />
            </div>
          } />
        <Route path="/users" element={
            <div>
              <NavigationBar />
              <Users />
            </div>
          } />
        
        <Route path="/appointments" element={
            <div>
              <NavigationBar />
              <Appointments />
            </div>
          } />
        
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
