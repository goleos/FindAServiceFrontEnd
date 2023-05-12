import React from 'react';
import ServiceItem from './SeviceItem/ServiceItem';
import './styles.css';

const ServiceList = ({ services }) => {
  return (
    <div className="service-container">
      <div className='service-list'>
        {/* Service List Header */}
        <h1>Service Types - All Services</h1>
        <p>Here, the service provider provides the following services.</p>
        {/* Service List Wrapper */}
        <div className='service-list-wrap'>
          {/* Map through each service and create a service item for each one */}
          {services.map((serviceCard) => (
            <ServiceItem serviceCard={serviceCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceList;

