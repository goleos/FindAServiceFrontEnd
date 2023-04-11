import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import NewServiceDialog from "../../../utils/components/provider/NewServiceDialog";
import ServicesStack from "../../../utils/components/ServicesStack";
import { useEffect, useState } from "react";
/* Documentation used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/

const ProviderMyServicesPage = () => {
  const { serviceStore } = useStore();
  // useEffect(() => {
  //   serviceStore.updateMyServicesProvider();
  // }, [serviceStore.services]);

  return (
    <>
      <div>My services Page</div>
      <ServicesStack services={serviceStore.services} />
      <NewServiceDialog />
    </>
  );
};

export default observer(ProviderMyServicesPage);
