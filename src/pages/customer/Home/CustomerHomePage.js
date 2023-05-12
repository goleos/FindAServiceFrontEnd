import {observer} from "mobx-react";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import React, { useState } from 'react';
import ServiceList from "./ServiceList/ServiceList"
import Header from "./Header/Header"
import { serviceList } from './ServiceList/SeviceItem/data';
import {Page} from "../../../utils/styles/pageStyles";


const CustomerHomePage = () => {
    
    // Define state for Services
    const [Services] = useState(serviceList);

    // Accessing userStore from RootStore
    const { userStore } = useStore();

    // Get current user
    let customer = userStore.getCurrentUser();

    // Loading
    if (customer === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (  
        <Page>
            <h3>Hi, {customer.firstName}</h3>
            {/* Customer Home Header */}
            <Header />
            {/* Customer Home Service List */}
            {<ServiceList services={Services} />}
        </Page>    
    )
}

export default observer(CustomerHomePage);