// LoginPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
 import '../Login/Login.css'
const LoginPage = () => {
  const { authenticateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user list once during component initialization
    axios
      .get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Check if the entered username and password match any user in the local user list
    const user = users.find(
      user => user.username === formData.username && user.password === formData.password
    );

    if (user) {
      console.log('User authenticated!', user);
      // Perform actions for authenticated users, e.g., store authentication state
      authenticateUser(user); // Use the context function to set the authenticated user
      setError(null); // Clear any previous error
      console.log("Go home")
      navigate('/home'); // Redirect to the Home page
    } else {
      console.log('Invalid credentials');
      // Display an error message or perform actions for authentication failure
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login'> 
      <h2 className='login-text'>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-label' htmlFor="username">Username:</label>
        <input className='login-input'
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label className='login-label' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button className='login-button' type="submit">Login</button>
      </form>

      <p>If you don't have an account, create one:</p>

      <Link to="/create-user">
        <button className='login-button' type="button">Create Account</button>
      </Link>
    </div>
  );
};

export default LoginPage;
