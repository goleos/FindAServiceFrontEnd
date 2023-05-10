import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react";
import { useParams } from 'react-router';
import { serviceList } from '../ServiceList/SeviceItem/data';
import { Link } from 'react-router-dom';
import './styles.css';


const ServiceTypeContentPage = () => {
  
  // Get the service ID from the URL parameters
  const { id } = useParams();
  // Initialize state for the selected service
  const [service, setService] = useState(null);

  useEffect(() => {
    // Find the service in the serviceList array with the matching ID
    const selectedService = serviceList.find((service) => service.id === parseInt(id));
    // Set the selected service state
    if (selectedService) {
      setService(selectedService);
    }
  }, []);

  return (
    <>
      <Link className='serviceContent-goBack' to='/customer/home'>
        <span> &#8592;</span> <span>Back to Home</span>
      </Link>
      {service ? (
        <div className='serviceContent-wrap'>
          <header>
            <h1>{service.title}</h1>
          </header>
          <img src={service.cover} alt='cover' />
          <p className='serviceContent-desc'>{service.description}</p>
        </div>
      ):(
        // If the service is not found, display an empty div
        <div></div>
      )}
    </>
  );
};

export default observer(ServiceTypeContentPage);
