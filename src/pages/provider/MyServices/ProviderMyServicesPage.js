import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import NewServiceDialog from "../../../utils/components/provider/NewServiceDialog";
/* Documentation used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/

const ProviderMyServicesPage = () => {
  const { userStore } = useStore();

  // Get current user
  let provider = userStore.getCurrentUser();

  return (
    <>
      <div>My services Page</div>
      <NewServiceDialog />
    </>
  );
};

export default observer(ProviderMyServicesPage);
