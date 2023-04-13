import { observer } from "mobx-react";
// import { useStore } from "../../../stores/RootStore";
import NewServiceDialog from "../../../utils/components/provider/NewServiceDialog";
import ServicesStack from "../../../utils/components/service/ServicesStack";
import { useStore } from "../../../stores/RootStore";
import { useEffect } from "react";

/* Documentation used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/

const ProviderMyServicesPage = () => {
  // const { userStore } = useStore();

  // Get current user
  // let provider = userStore.getCurrentUser();

  const { serviceStore, userStore } = useStore();

  // get services of the current provider from the backend
  useEffect(() => {
    // userStore.requestCurrentUser();
    //TODO: should read services of current provider
    serviceStore.getServices();
  }, [serviceStore]);

  const refreshServices = () => {
    serviceStore.getServices(userStore.currentUser.id);
    console.log("refreshed", serviceStore.services);
  };

  return (
    <>
      <div>My services Page</div>
      <ServicesStack services={serviceStore.services} />
      <NewServiceDialog onAddServiceSuccess={refreshServices} />
    </>
  );
};

export default observer(ProviderMyServicesPage);
