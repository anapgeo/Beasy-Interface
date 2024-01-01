// ServicePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServicePage.css';


const ServicePage = () => {
  const [service, setService] = useState([]);
  const prices = [
    { title: 'Τοποθέτηση πλακιδίων δαπέδου', price:"50" },
    { title: 'Αλλαγή λάμπας', price:"10"},
    {  title: 'Βάψιμο δωματίου',price:"30" },
    {  title: 'Επισκευή καναπέ' ,price:"40"},
    { title: 'Αλλαγή φλοτέρ', price:"20"},
  ];
  useEffect(() => {
    axios.get('http://localhost:3000/available-services')
      .then(response => setService(response.data))
      .catch(error => console.error('Error fetching service data:', error));
  }, []);

  const [selectedService, setSelectedService] = useState(null);
  
  const handleServiceClick = (serviceName) => {
    // Set the selected service
    // Find the index of the selected service in the service array
  const serviceIndex = service.findIndex((s) => s.title === serviceName);

  // Get the price from the prices array using the index
  const selectedServicePrice = prices[serviceIndex].price;

  // Update the appointment details with the selected service price
    setAppointmentDetails((prevDetails) => ({
    ...prevDetails,
    price: selectedServicePrice,
    }));

    console.log(`Clicked on ${serviceName} with price ${selectedServicePrice}`);
    setSelectedService(serviceName);
    console.log(`Clicked on ${serviceName}`);
  };

  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    paymentMethod: '',
    street: '',
    street_number: '',
    city: '',
    zipCode: '',
    price: '',  
  });
 

  
  const handleFormChange = (e) => {
    // Update the form details as the user types
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, e.g., send to server or store in state
    console.log('Appointment details submitted:', appointmentDetails);
  };
  return (
    <div className="service-container">
      {selectedService ? (
        <div className="selected-service">
            
          <h3>{selectedService}</h3>

          <p>Tιμή:{appointmentDetails.price}</p>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentDetails.date}
              onChange={handleFormChange}
              required
            />

            <label htmlFor="paymentMethod">Payment Method:</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={appointmentDetails.paymentMethod}
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
              type="text"
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
              type="text"
              id="zipCode"
              name="zipCode"
              value={appointmentDetails.zipCode}
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
            onClick={() => handleServiceClick(service.title)}
          >
            <div >{ service.title  + " by \n" + service.name}</div>
         
          </button>
        ))
      )}
    </div>
  );
};

export default ServicePage;
