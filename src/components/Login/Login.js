import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user list once during component initialization
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []); // Empty dependency array ensures this effect runs once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered username and password match any user in the local user list
    const user = users.find(user => user.username === formData.username && user.password === formData.password);

    if (user) {
      console.log('User authenticated!', user);
      // Perform actions for authenticated users, e.g., store authentication state
      setAuthenticatedUser(user);
      setError(null); // Clear any previous error
      navigate('/home'); // Redirect to the Home page
    } else {
      console.log('Invalid credentials');
      // Display an error message or perform actions for authentication failure
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
