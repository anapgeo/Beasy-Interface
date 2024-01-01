// ServiceDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceName } = useParams();

  return (
    <div>
      <h2>Service Details</h2>
      <p>Service Name: {serviceName}</p>
      {/* Display more details about the service */}
    </div>
  );
};

export default ServiceDetails;