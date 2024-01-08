import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyAppointments.css"
import { useAuth } from '../../AuthContext'; // Import useAuth
const MyAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const { authenticatedUser } = useAuth();
  const  [teams, setTeams] = useState([]); 
  const [teamNames, setTeamNames] = useState({});
  let filteredAppointments=[]

  
  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:3000/teams');
        console.log(teamsResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  // Update appointments and team names when authenticated user changes or teams are updated
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get('http://localhost:3000/appointments');
        const filteredAppointmentsData = appointmentsResponse.data.filter(
          appointment => appointment.user_user_ID === authenticatedUser.user_ID
        );

        // Create a mapping object for team names
        const teamNamesMap = {};
        teams.forEach(team => {
          teamNamesMap[team.team_TIN] = team.name;
        });

        const appointmentsWithTeamNames = filteredAppointmentsData.map(appointment => ({
          ...appointment,
          teamName: teamNamesMap[appointment.team_team_TIN] || 'Unknown Team',
        }));

        setAppointments(appointmentsWithTeamNames);
        setTeamNames(teamNamesMap);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [authenticatedUser.user_ID, teams]);




  
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
          
         
            <th>Team Name</th>
          
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
              <td>{appointment.rating || 'N/A'}</td>
              <td>{appointment.made_time}</td>
              <td>{new Date(appointment.made_date).toLocaleDateString()}</td>
              <td>{appointment.street}</td>
              <td>{appointment.city}</td>
              <td>{appointment.zip_code}</td>
              <td>{appointment.street_number}</td>
              

              <td>{appointment.teamName}</td>
           
              {/* Add more table cells for additional features */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default MyAppointmentPage ;