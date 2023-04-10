import { observer } from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const ProviderMyServicesPage = () => {
  const { userStore } = useStore();

  // Get current user
  let provider = userStore.getCurrentUser();

  return (
    <>
      <div>My services Page</div>
      <Button variant="contained" startIcon={<AddIcon />} Add New Service>
        Add New Service
      </Button>
    </>
  );
};

export default observer(ProviderMyServicesPage);
