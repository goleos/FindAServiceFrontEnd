import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import React from "react";
import {useParams} from "react-router-dom";
import ServiceInfoStore from "../../../stores/ServiceInfoStore";
import Service from "./components/Service";



const ServiceInfoPage = () => {

    const params = useParams();

    const serviceInfoStore = new ServiceInfoStore(Number(params.serviceId));

    return (
        <Page>
          <Service store={serviceInfoStore} />
        </Page>
    )
}

export default observer(ServiceInfoPage);