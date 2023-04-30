import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import {Title} from "../../../utils/components/Title";
import ServiceRequestList from "../../../utils/components/service/ServiceRequestList";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";

const ServiceRequestsPage = () => {
  const { serviceRequestsStore } = useStore();

  const serviceRequests = serviceRequestsStore.getServiceRequests()

  if (serviceRequests === undefined) {
    return (
      <CircularLoading />
    )
  }

  return (
    <Page>
      <Title text="My Service Requests" padding/>
      <ServiceRequestList serviceRequests={serviceRequests} byService={false}/>
    </Page>
  )
}

export default observer(ServiceRequestsPage);