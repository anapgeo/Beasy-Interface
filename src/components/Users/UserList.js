// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the Express.js server
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>User List</h2>
      
      {/* Search input */}
      <input
        type="text"
        placeholder="Search users by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Address</th>
            {/* Add more table headers for additional features */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.user_ID}>
              <td>{user.user_ID}</td>
              <td>{user.name}</td>
              <td>{user.birthdate.slice(0, 10)}</td>
              <td>{user.street + " " + user.street_number}</td>
              {/* Add more table cells for additional features */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;