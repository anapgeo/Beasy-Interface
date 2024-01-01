// ServicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServicePage.css';
import { useAuth } from '../../AuthContext'; // Import useAuth

const ServicePage = () => {


const { authenticatedUser } = useAuth(); 
let user_ID=authenticatedUser.user_ID

  const [service, setService] = useState([]);
  const prices = [
    { title: 'Τοποθέτηση πλακιδίων δαπέδου', price:"50" },
    { title: 'Αλλαγή λάμπας', price:"10"},
    {  title: 'Βάψιμο δωματίου',price:"30" },
    {  title: 'Επισκευή καναπέ' ,price:"40"},
    { title: 'Αλλαγή φλοτέρ', price:"20"},
  ];
  const [submissionTime, setSubmissionTime] = useState(null);

  
  const [selectedService, setSelectedService] = useState(null);
  const [teams, setTeams] = useState([]);
  const handleServiceClick = (serviceName, serviceTeam) => {
   
    console.log(serviceName)
    console.log(serviceTeam)
    const serviceIndex = service.findIndex((s) => s.title === serviceName);
    const teamIndex=teams.findIndex((team)=> team.name=== serviceTeam)
    appointmentDetails.team_team_TIN=teams[teamIndex].team_TIN

    const selectedServicePrice = prices[serviceIndex].price;

  // Update the appointment details with the selected service price
    setAppointmentDetails((prevDetails) => ({
    ...prevDetails,
    payment_amount: selectedServicePrice,
    }));

    console.log(`Clicked on ${serviceName} with price ${selectedServicePrice}`);
    setSelectedService(serviceName);
    console.log(`Clicked on ${serviceName}`);
  };

  const [appointmentDetails, setAppointmentDetails] = useState({
    appointment_ID:'',
    appointment_time:'',
    appointment_date:'',
    payment_amount:'',
    payment_method:'', 
    rating:'0',
    made_time:'',
    made_date:'',
    street:'',
    city:'',
    zip_code:'',
    street_number:'',
    location_ID:'',
    team_team_TIN:'',
    user_user_ID:''
  });
 
  
  useEffect(() => {
    axios.get('http://localhost:3000/available-services')
      .then(response => setService(response.data))
      .catch(error => console.error('Error fetching service data:', error));

      console.log(authenticatedUser)
   
    appointmentDetails.user_user_ID=user_ID
     
      axios.get('http://localhost:3000/teams')
      .then(response => setTeams(response.data)).then(console.log(teams))
      .catch(error => console.error('Error fetching data:', error));
      
    
  }, []);

  

  const handleFormChange = (e) => {
    // Update the form details as the user types
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

  
      let currentTime = new Date();
      setSubmissionTime(currentTime);
      console.log(currentTime.toISOString().slice(0,10));
      console.log(currentTime.toISOString().slice(11,19));
      appointmentDetails.made_date=currentTime.toISOString().slice(0,10)
      appointmentDetails.made_time=currentTime.toISOString().slice(11,19)
    let new_location_ID= Math.floor(Math.random() * Math.pow(10, 10));
    appointmentDetails.location_ID=new_location_ID

    let new_appointment_ID= Math.floor(Math.random() * Math.pow(10, 10));
    appointmentDetails.appointment_ID=new_appointment_ID
      console.log(appointmentDetails)
      try {
        // Make a POST request to your Node.js server
        await axios.post('http://localhost:3000/appointments', appointmentDetails, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Reset the form after successful submission
        setAppointmentDetails({
            appointment_ID:'',
            appointment_time:'',
            appointment_date:'',
            payment_amount:'',
            payment_method:'', 
            rating:null,
            made_time:'',
            made_date:'',
            street:'',
            city:'',
            zip_code:'',
            street_number:'',
            location_ID:'',
            team_team_TIN:'',
            user_user_ID:''
          });


          setSelectedService(null);
  
        // You can also add logic for handling successful submission, e.g., show a success message.
      } catch (error) {
        console.error('Error creating user:', error.message);
        
        
      }
     
  


    };
  return (
    <div className="service-container">
      {selectedService ? (
        <div className="selected-service">
            
          <h3>{selectedService}</h3>

          <p>Tιμή:{appointmentDetails.payment_amount}</p>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="appointment_date"
              value={appointmentDetails.appointment_date}
              onChange={handleFormChange}
              required
            />

        <label htmlFor="selectedTime">Select Time:</label>
        <input
          type="time"
          id="selectedTime"
          name="appointment_time"
          value={appointmentDetails.appointment_time}
          onChange={handleFormChange}
          required
        />

            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              name="payment_method"
              value={appointmentDetails.payment_method}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>

            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={appointmentDetails.street}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="street_number">Street Number:</label>
            <input
              type="number"
              id="street_number"
              name="street_number"
              value={appointmentDetails.street_number}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={appointmentDetails.city}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="zipCode">ZIP Code:</label>
            <input
              type="number"
              id="zipCode"
              name="zip_code"
              value={appointmentDetails.zip_code}
              onChange={handleFormChange}
              required
            />

            <button type="submit">Submit Appointment</button>
          </form>

    
        </div>
      ) : (
        service.map((service, index) => (
          <button
            key={index}
            className="service-box"
            onClick={() => handleServiceClick(service.title,service.name)}
          >
            <div >{ service.title  + " by \n" + service.name}</div>
         
          </button>
        ))
      )}
    </div>
  );
};

export default ServicePage;
