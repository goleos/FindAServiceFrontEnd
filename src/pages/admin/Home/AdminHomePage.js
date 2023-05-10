import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import ServicesStack from "../../../utils/components/service/ServicesStack";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";


const AdminHomePage = () => {
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
      <ServicesStack services={services} />
    </Page>
  )
}

export default observer(AdminHomePage);
