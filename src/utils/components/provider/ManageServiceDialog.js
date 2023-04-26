import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, Fab } from "@mui/material";
import EditServiceForm from "./ManageServices/EditServiceForm/EditServiceForm";
import { Snackbar, Alert } from "@mui/material";
import { useStore } from "../../../stores/RootStore";
import { observer } from "mobx-react";

/* mui documentation pages used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
https://mui.com/material-ui/react-snackbar/#customization
*/
const ManageServiceDialog = (props) => {
    const { serviceStore } = useStore();
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    const handleSubmit = async () => {
        await serviceStore.requestServices(props.providerID);
        props.onClose();
        setSuccessAlertOpen(true);
    };

    const handleCloseSuccessAlert = (event) => {
        setSuccessAlertOpen(false);
    };

    return (
        <>
            <Snackbar open={successAlertOpen} autoHideDuration={7000} onClose={handleCloseSuccessAlert}>
                <Alert severity="success">New service successfully created</Alert>
            </Snackbar>
            <Dialog open={props.open} maxWidth={false} fullWidth>
                {/* <DialogTitle>Add a new service</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>
            All new services have to be approved by admin first before they
            become visible to customers.
          </DialogContentText> */}
                    <EditServiceForm
                        editingExistingService={props.editingExistingService}
                        editService={props.editService}
                        onFinish={props.onClose}
                        onSuccess={handleSubmit}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default observer(ManageServiceDialog);
