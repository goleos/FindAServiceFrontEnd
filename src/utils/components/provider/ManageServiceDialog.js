import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import EditServiceForm from "./ManageServices/EditServiceForm/EditServiceForm";
import { Snackbar, Alert } from "@mui/material";
import { observer } from "mobx-react";
import {useStore} from "../../../stores/RootStore";

/* mui documentation pages used:
https://mui.com/material-ui/api/form-control/
https://mui.com/material-ui/react-dialog/
https://mui.com/material-ui/react-select/
https://mui.com/material-ui/react-snackbar/#customization
*/

/**
 * Dialog for creating or editing a service
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ManageServiceDialog = (props) => {
    const {serviceStore} = useStore();

    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    const handleSubmit = async () => {
        serviceStore.requestServices(props.providerID);
        props.onClose();
        setSuccessAlertOpen(true);
    };

    const handleCloseSuccessAlert = (event) => {
        setSuccessAlertOpen(false);
    };

    const successMessageString = props.editingExistingService
        ? "Changes successfully saved"
        : "New service successfully created";

    return (
        <>
            <Snackbar open={successAlertOpen} autoHideDuration={7000} onClose={handleCloseSuccessAlert}>
                <Alert severity="success">{successMessageString}</Alert>
            </Snackbar>
            <Dialog open={props.open} maxWidth={false} fullWidth>
                {/* <DialogTitle>Add a new service</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>
            All new services have to be approved by admin first before they
            become visible to customers.
          </DialogContentText> */}
                    <EditServiceForm
                        store={props.store}
                        providerID={props.providerID}
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
