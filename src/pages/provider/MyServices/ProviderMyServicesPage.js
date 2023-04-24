import { observer } from "mobx-react";
import NewServiceDialog from "../../../utils/components/provider/NewServiceDialog";
import ServicesStack from "../../../utils/components/service/ServicesStack";
import { useStore } from "../../../stores/RootStore";
import {Title} from "../../../utils/components/Title";
import {Page} from "../../../utils/styles/pageStyles";
import {CircularLoading} from "../../../utils/components/CircularLoading";

/* Documentation used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/

const ProviderMyServicesPage = () => {

  const { serviceStore, userStore } = useStore();

  // Get current user
  let provider = userStore.getCurrentUser();

  // Loading
  if (provider === undefined) {
    return (
        <CircularLoading />
    )
  }

  const services = serviceStore.getServices(provider.id);

  // Loading
  if (services === undefined) {
    return (
        <CircularLoading />
    )
  }

  return (
    <Page>
      <Title text="My Services"/>
      <ServicesStack services={serviceStore.services} />
      <NewServiceDialog providerID={provider.id}/>
    </Page>
  );
};

export default observer(ProviderMyServicesPage);
