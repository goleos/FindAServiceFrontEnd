import {observer} from "mobx-react";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import React from "react";
import {useStore} from "../../../stores/RootStore";
import ServicesStack from "../../../utils/components/service/ServicesStack";

/**
 * List of all available services
 * @returns {JSX.Element}
 * @constructor
 */
const CustomerExploreServicesPage = () => {

  const { serviceStore } = useStore();

  const services = serviceStore.getServices();

  // Loading
  if (services === undefined) {
    return (
      <CircularLoading />
    )
  }

  return (
    <Page>
      <ServicesStack services={services} perspective="provider"/>
    </Page>
  )
}

export default observer(CustomerExploreServicesPage);