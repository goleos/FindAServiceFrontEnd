import React from 'react';
import './styles.css';
import { useStore } from "../../../../stores/RootStore";
import { CircularLoading } from "../../../../utils/components/CircularLoading";
import { getServiceIcon } from "../../../../utils/helpers/serviceFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const CurrentServiceList = () => {

  // Get the serviceStore and userStore from the RootStore using the useStore hook
  const { serviceStore, userStore } = useStore();

  // Get the current user
  let provider = userStore.getCurrentUser();

  // Check if the current user is undefined
  if (provider === undefined) {
      return <CircularLoading />;
  }

  // Get the services for the current provider
  const services = serviceStore.getServices(provider.id);

  // Loop through each unique service category and render a box with the category icon and name
  return (
    <>
      <div className='service-type-container'>
          <h1>Your Current Service Types</h1>
          <p>Provide more services, win more customers, and create an excellent service brand.</p>
          <div className='current-service-type'>
            {Array.from(new Set(services?.map((item) => item.category))) // Deduplicate category values
              .map((category, index) => ( // Loop through each unique category
                <div className='box' key={index}>
                  <FontAwesomeIcon className="fa-lg" icon={getServiceIcon(category)}/>
                  <h4>{category}</h4>
                </div>
              )).concat(// Add link to add more services
                <div key="additional-div" className="box">
                  <Link className='serviceItem-link' to={`/provider/my-services`}>
                    <FontAwesomeIcon className="fa-lg" icon={faAdd}/>
                    <h4>Add More Services</h4>
                  </Link>
                </div>
              )
            }
          </div>
      </div>
    </>
  )
};

export default CurrentServiceList;
