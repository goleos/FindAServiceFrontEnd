import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ServiceItem = (props) => {
  const {
    id,
    title,
    description,
    cover,
  } = props.serviceCard;

  return (
    <div className='serviceItem-wrap'>
      <img className='serviceItem-cover' src={cover} alt='cover' />
      <Link className='serviceItem-link' to={`/customer/home/service/${id}`}><h3>{title}</h3></Link>
      <p className='serviceItem-desc'>{description}</p>
    </div>
  );
};

export default ServiceItem;
