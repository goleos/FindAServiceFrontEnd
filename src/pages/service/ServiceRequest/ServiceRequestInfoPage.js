import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import ServiceRequestStore from "../../../stores/ServiceRequestStore";
import {useParams} from "react-router-dom";
import ServiceRequest from "./components/ServiceRequest";
import LoginStoreInstance from "../../../stores/LoginStore";
import RequestUpdates from "./components/RequestUpdates";

const ServiceRequestInfoPage = () => {
  const params = useParams();

  const provider = LoginStoreInstance.isProvider();
  const serviceRequestStore = new ServiceRequestStore(Number(params.requestId));

  return (
    <Page>
      <ServiceRequest store={serviceRequestStore} />
      {provider && <RequestUpdates store={serviceRequestStore}/>}
    </Page>
  )
}

export default observer(ServiceRequestInfoPage);