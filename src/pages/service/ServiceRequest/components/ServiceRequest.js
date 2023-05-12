import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import {Title} from "../../../../utils/components/Title";
import ServiceCategory from "../../../../utils/components/service/ServiceCategory";
import {
  ApprovalButtonsContainer,
  Line,
  Name,
  NameContainer,
  Price,
  PriceContainer, RequestNumber,
  UserDetails
} from "../../../../utils/styles/pageStyles";
import {ProfileImage} from "../../../../utils/components/ProfileImage";
import LoginStoreInstance from "../../../../stores/LoginStore";
import {NavLink, useNavigate} from "react-router-dom";
import {TextIcon} from "../../../../utils/components/TextIcon";
import {faCalendar, faCheck, faCheckCircle, faLocationDot, faXmark} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "../../../../utils/helpers/formatDate";
import {useTheme} from "@emotion/react";
import ReadMore from "../../../provider/Profile/components/ReadMore";
import IconButton from "../../../../utils/components/IconButton";
import React, {useState} from "react";
import {device, ROUTES as ROUTE} from "../../../../utils/helpers/constants";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useStore} from "../../../../stores/RootStore";
import {getRequestStatusInfo} from "../../../../utils/helpers/serviceFunctions";
import PendingRequestUpdate from "./PendingRequestUpdate";
import UpdateHistory from "../../../../utils/components/UpdateHistory";
import Alert from "@mui/material/Alert";

/**
 * Service Request Details and options for approval / rejection
 * or requesting an update
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServiceRequest = (props) => {

  const { serviceRequestsStore, serviceRequestEditStore } = useStore();

  const navigate = useNavigate()

  const theme = useTheme();

  const serviceRequest = props.store.getServiceRequest();
  const requestUpdates = props.store.getRequestUpdates();

  const provider = LoginStoreInstance.isProvider();
  const admin = LoginStoreInstance.isAdmin();
  const customer = !provider && !admin;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (serviceRequest === undefined) {
    return (
      <CircularLoading />
    )
  }

  // Loading
  if (requestUpdates === undefined) {
    return (
      <CircularLoading />
    )
  }

  serviceRequestEditStore.setUpdateInfo(serviceRequest)

  const handleAccept = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await axiosConfig().put(`/serviceRequest/${serviceRequest.id}/status`, {status: 'accepted'})
      serviceRequestsStore.requestServiceRequests();
      navigate(ROUTE.service.myRequests)
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.response.data.message)
      console.log(err)
    }
  }

  const handleReject = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await axiosConfig().put(`/serviceRequest/${serviceRequest.id}/status`, {status: 'rejected'})
      serviceRequestsStore.requestServiceRequests();
      navigate(ROUTE.service.myRequests)
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.response.data.message)
      console.log(err)
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await axiosConfig().put(`/serviceRequest/${serviceRequest.id}/status`, {status: 'completed'})
      serviceRequestsStore.requestServiceRequests();
      navigate(ROUTE.service.myRequests)
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.response.data.message)
      console.log(err)
    }
  }


  const userDetailsNode = (
    <UserDetails>
      <ProfileImage size="xs" image={serviceRequest.profileImage}/>
      <NameContainer>
        <Name>{serviceRequest.firstName} {serviceRequest.lastName}</Name>
      </NameContainer>
    </UserDetails>
  )

  let {color, statusText, icon, info} = getRequestStatusInfo(serviceRequest.status, provider, theme)

  return (
    <Container>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <RowContainer>
        <div>
          <RequestNumber>
            Req. Num. #{serviceRequest.id}
          </RequestNumber>
          <NavLink to={`/service/${serviceRequest.serviceId}`}>
            <Title text={serviceRequest.title} />
          </NavLink>
          <PriceContainer>
            <Price>£{serviceRequest.price}/h</Price>
            <ServiceCategory category={serviceRequest.category} />
            {provider ?
              <>
                {userDetailsNode}
              </> :
              <NavLink to={`/provider/profile/${serviceRequest.providerId}`}>
                {userDetailsNode}
              </NavLink>
            }
          </PriceContainer>
        </div>
        {provider && serviceRequest.status === 'accepted' &&
          <IconButton
            loadingCondition={isSubmitting}
            icon={faCheckCircle}
            name="Completed"
            onClick={handleComplete}
            color="success"
          />
        }
        {provider && serviceRequest.status === 'pending' &&
          <ApprovalButtonsContainer>
            <IconButton
              loadingCondition={isSubmitting}
              icon={faCheck}
              name="Accept"
              onClick={handleAccept}
              color="success"
            />
            <IconButton
              loadingCondition={isSubmitting}
              icon={faXmark}
              name={'Reject'}
              onClick={handleReject}
              color="error"
            />
          </ApprovalButtonsContainer>
        }
      </RowContainer>
      <Line />
      <Description>
        <ReadMore text={serviceRequest.description} length={300}/>
      </Description>
      <BookingDetails>
        Booking Details:
        {provider && <TextIcon color={color} icon={icon} text={statusText}/>}
        <TextIcon color={theme.palette.info.main} icon={faCalendar} text={formatDate(serviceRequest.bookingTime)}/>
        <TextIcon color={theme.palette.info.main} icon={faLocationDot} text={serviceRequest.customerAddress}/>
      </BookingDetails>
      <Line />
      {customer &&
        <UpdatesContainer>
          <StatusContainer>
            <TextIcon color={color} icon={icon} text={statusText}/>
          </StatusContainer>
          <Info>{info}</Info>
          {serviceRequest.status === 'request_further_details' && <PendingRequestUpdate store={props.store} update={requestUpdates[0]} requestId={serviceRequest.id}/>}
          <Line />
          <UpdateHistory updates={requestUpdates}/>
        </UpdatesContainer>
      }
    </Container>
  )
}

export default observer(ServiceRequest);

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 4px solid ${props => props.theme.palette.primary.light};
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
`

const BookingDetails = styled.div`
`

const Description = styled.div`
  margin: 2px;
`

const RowContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  button {
    width: 120px;
    height: 50px;
  }

  @media only screen and ${device.tablet} {
    flex-direction: column;
  }
`

const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StatusContainer = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  align-self: center;
`

const Info = styled.div`
  align-self: center;
`
