// CreateUser.js

import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css'

const CreateUser = () => {
  const [formData, setFormData] = useState({
    user_ID: '',
    username: '',
    password: '',
    birthdate: '',
    name: '',
    phone_number: '',
    city: '',
    zip_code: '',
    street_number: '',
    location_ID: '',
    street: '',
  });
  let ids=[]
  let new_user_id=0
  let new_location_id=0
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    await axios.get('http://localhost:3000/users')
    .then(response => 
        {
            ids=response.data.map(user => user.user_ID);
           
            
            do {
                new_user_id= Math.floor(Math.random() * Math.pow(10, 10));
              } while (ids.includes(new_user_id));

            formData.user_ID=new_user_id.toString()
            // setFormData(...prevData,[user_ID]:)
        
        })
    .catch(error => console.error('Error fetching data:', error));


    await axios.get('http://localhost:3000/appointments')
    .then(response => 
        {
            ids=response.data.map(appointment => appointment.location_ID);
           
            
            do {
                new_location_id= Math.floor(Math.random() * Math.pow(10, 10));
              } while (ids.includes(new_location_id));
              
            formData.location_ID=new_location_id.toString()
            // setFormData(...prevData,[user_ID]:)
        
        })
    .catch(error => console.error('Error fetching data:', error));

    console.log(formData)
    try {
      // Make a POST request to your Node.js server
      await axios.post('http://localhost:3000/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Reset the form after successful submission
      setFormData({
        user_ID: '',
        username: '',
        password: '',
        birthdate: '',
        name: '',
        phone_number: '',
        city: '',
        zip_code: '',
        street_number: '',
        location_ID: '',
        street: '',
      });

      // You can also add logic for handling successful submission, e.g., show a success message.
    } catch (error) {
      console.error('Error creating user:', error.message);
      // Handle error, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit} className='create-user-form'>
        
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <label>Birthdate:</label>
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Phone Number:</label>
        <input type="number" name="phone_number" value={formData.phone_number} onChange={handleChange} />

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
        
        <label>Street:</label>
        <input type="text" name="street" value={formData.street} onChange={handleChange} />
        
        <label>Street Number:</label>
        <input type="number" name="street_number" value={formData.street_number} onChange={handleChange} />
        
        <label>Zip Code:</label>
        <input type="number" name="zip_code" value={formData.zip_code} onChange={handleChange} />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
