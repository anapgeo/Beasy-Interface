// src/components/Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Appointments.css"
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from the Express.js server
    axios.get('http://localhost:3000/appointments')
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Appointments</h2>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Date</th>
            <th>Payment Amount</th>
            <th>Payment Method</th>
            <th>Rating</th>
            <th>Made Time</th>
            <th>Made Date</th>
            <th>Street</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Street Number</th>
            <th>Location ID</th>
            <th>Team TIN</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointment_ID}>
              <td>{appointment.appointment_ID}</td>
              <td>{appointment.appointment_time}</td>
              <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
              <td>{appointment.payment_amount}</td>
              <td>{appointment.payment_method}</td>
              <td>{appointment.rating}</td>
              <td>{appointment.made_time}</td>
              <td>{new Date(appointment.made_date).toLocaleDateString()}</td>
              <td>{appointment.street}</td>
              <td>{appointment.city}</td>
              <td>{appointment.zip_code}</td>
              <td>{appointment.street_number}</td>
              <td>{appointment.location_ID}</td>
              <td>{appointment.team_team_TIN}</td>
              <td>{appointment.user_user_ID}</td>
              {/* Add more table cells for additional features */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;