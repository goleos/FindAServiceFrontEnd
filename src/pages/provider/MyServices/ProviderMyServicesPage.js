import { observer } from "mobx-react";
import ManageServiceDialog from "../../../utils/components/provider/ManageServiceDialog";
import ServicesStack from "../../../utils/components/service/ServicesStack";
import { useStore } from "../../../stores/RootStore";
import { Title } from "../../../utils/components/Title";
import { Page } from "../../../utils/styles/pageStyles";
import { CircularLoading } from "../../../utils/components/CircularLoading";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useState } from "react";

/* Documentation used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
*/

const ProviderMyServicesPage = () => {

    const { uploadImagesStore, serviceStore, userStore } = useStore();
    const [dialogOpen, setDialogOpen] = useState(false);

    // Get current user
    let provider = userStore.getCurrentUser();

    // Loading
    if (provider === undefined) {
        return <CircularLoading />;
    }

    const services = serviceStore.getServices(provider.id);

    // Loading
    if (services === undefined) {
        return <CircularLoading />;
    }

    const handleOpenDialog = () => {
        uploadImagesStore.resetImages()
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Page>
            <Title text="My Services" />
            <ServicesStack services={services} perspective="provider"/>
            <Fab
                onClick={handleOpenDialog}
                color="primary"
                variant="extended"
                size="large"
                sx={{
                    width: 170,
                    height: 50,
                    position: "fixed",
                    bottom: 40,
                    right: 30,
                }}
            >
                <AddIcon sx={{ mr: 1 }} />
                New Service
            </Fab>
            <ManageServiceDialog providerID={provider.id} open={dialogOpen} onClose={handleCloseDialog} />
        </Page>
    );
};

export default observer(ProviderMyServicesPage);
