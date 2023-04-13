import { observer } from "mobx-react";
// import { useStore } from "../../../stores/RootStore";
import NewServiceDialog from "../../../utils/components/provider/NewServiceDialog";
import ServicesStack from "../../../utils/components/ServicesStack";
import { useStore } from "../../../stores/RootStore";
import { useEffect, useState } from "react";

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
    serviceStore.getServices(userStore.currentUser.id);
  }, []);

  return (
    <>
      <div>My services Page</div>
      <ServicesStack services={serviceStore.services} />
      <NewServiceDialog />
    </>
  );
};

export default observer(ProviderMyServicesPage);
