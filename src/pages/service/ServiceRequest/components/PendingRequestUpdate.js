import {observer} from "mobx-react";
import React, {useState} from "react";
import {formatDate} from "../../../../utils/helpers/formatDate";
import {Alert, Checkbox, Dialog, DialogContent, Snackbar} from "@mui/material";
import {faCircleCheck, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import IconButton from "../../../../utils/components/IconButton";
import {
  Container,
  CreatedAt,
  DetailsContainer, Reason,
  SectionTitle,
  UpdateInfoContainer
} from "../../../../utils/styles/updateStyles";
import {useStore} from "../../../../stores/RootStore";
import styled from "@emotion/styled";
import UpdateRequestForm from "./UpdateRequestForm";
import {ROUTES as ROUTE} from "../../../../utils/helpers/constants";
import {useNavigate} from "react-router-dom";


const PendingRequestUpdate = (props) => {

  const {serviceRequestsStore} = useStore();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    setDialogOpen(false);
    setSuccessAlertOpen(true);
  };

  const handleCloseSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };

  const handleWithdraw = async () => {
    try {
      await axiosConfig().put(`/serviceRequest/${props.requestId}/status`, {status: 'withdrawn'})
      serviceRequestsStore.requestServiceRequests();
      navigate(ROUTE.service.myRequests)
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data.message);
    }
  }

  const handleCheck = async (event) => {
    const status = event.target.checked ? 'completed' : 'pending';

    try {
      const res = await axiosConfig().put(`/serviceRequest/update/${props.update.id}/changeStatus`, {status: status});

      if (res.data.status) {
        serviceRequestsStore.requestServiceRequests();
        props.store.requestServiceRequest();
        props.store.requestRequestUpdates();
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Container>
        <SectionTitle>Update Information</SectionTitle>
        <DetailsContainer>
          <UpdateInfoContainer>
            <Checkbox
              size="large"
              color="success"
              icon={<FontAwesomeIcon className="fa-fw" icon={faCircle}/>}
              checkedIcon={<FontAwesomeIcon className="fa-fw" icon={faCircleCheck}/>}
              onChange={handleCheck}
            />
            <Reason>{props.update.reason}</Reason>
          </UpdateInfoContainer>
          <CreatedAt>{formatDate(props.update.createdAt)} </CreatedAt>
        </DetailsContainer>
        <ButtonsContainer>
          <IconButton
            icon={faPen}
            name="Edit Request"
            color="primary"
            onClick={handleOpenDialog}
          />
          <IconButton
            icon={faTrash}
            name="Withdraw Request"
            color="error"
            onClick={handleWithdraw}
          />
        </ButtonsContainer>
        <ServiceRequestDialog>
          <Snackbar
            open={successAlertOpen}
            autoHideDuration={7000}
            onClose={handleCloseSuccessAlert}
          >
            <Alert severity="success">
              Service request successfully updated
            </Alert>
          </Snackbar>
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth={false} fullWidth>
            <DialogContent>
              <UpdateRequestForm store={props.store} submit={handleSubmit}/>
            </DialogContent>
          </Dialog>
        </ServiceRequestDialog>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Container>
    </>
  )
}

export default observer(PendingRequestUpdate);

const ServiceRequestDialog = styled.div`
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 30px;
  
  button {
    width: 180px;
    padding: 5px;
  }
`

