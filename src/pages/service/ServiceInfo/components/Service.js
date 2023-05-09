import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";
import UnavailableServicePage from "../../UnavailableServicePage";
import {Alert, Chip, Dialog, DialogContent, Snackbar, useTheme} from "@mui/material";
import {ProfileImage} from "../../../../utils/components/ProfileImage";
import {TextIcon} from "../../../../utils/components/TextIcon";
import {
  faBellConcierge,
  faCalendar,
  faComments,
  faEnvelope,
  faLocationDot,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
import {Line, Price} from "../../../../utils/styles/pageStyles";
import ReadMore from "../../../provider/Profile/components/ReadMore";
import React, {useRef, useState} from "react";
import {device, SERVICE_IMAGE} from "../../../../utils/helpers/constants";
import {NavLink, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoginStore from "../../../../stores/LoginStore";
import IconButton from "../../../../utils/components/IconButton";
import {useStore} from "../../../../stores/RootStore";
import ServiceRequestForm from "./ServiceRequestForm";
import ReviewForm from "../../Reviews/ReviewForm";
import ServiceCategory from "../../../../utils/components/service/ServiceCategory";
import ServiceRequestList from "../../../../utils/components/service/ServiceRequestList";
import ManageServiceDialog from "../../../../utils/components/provider/ManageServiceDialog";
import ImageCarousel from "../../../../utils/components/ImageCarousel";
import ReviewStack from "../../Reviews/ReviewStack";

/**
 * Component that displays all profile information
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Service = (props) => {
  const params = useParams();

  const {userStore, uploadImagesStore} = useStore();

  const theme = useTheme();

  const service = props.store.getService();
  let count = 0;
  const provider = LoginStore.isProvider();
  const admin = LoginStore.isAdmin();

  const currentUser = userStore.getCurrentUser();
  const customer = !provider && !admin;

  const {serviceRequestsStore} = useStore();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successReviewOpen, setSuccessReviewOpen] = useState(false);
  // Loading
  if (service === undefined) {
    return <CircularLoading/>;
  }

  if (service === null) {
    return <UnavailableServicePage/>;
  }

  const serviceRequests = serviceRequestsStore.getServiceRequests(params.serviceId);

  if (serviceRequests === undefined) {
    return <CircularLoading/>;
  }

  const handleOpenDialog = () => {
    uploadImagesStore.setImageUrls(service.serviceImages);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenReview = () => {
    setReviewOpen(true);
  };

  const handleCloseReview = () => {
    setReviewOpen(false);
  };

  const handleSubmit = async () => {
    setDialogOpen(false);

    setSuccessAlertOpen(true);
  };

  const reviewSubmit = async () => {
    setReviewOpen(false);
    setSuccessReviewOpen(true);
  };

  const handleCloseSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };
  const reviewCloseSuccessAlert = () => {
    setSuccessReviewOpen(false);
  };

  const images = service.serviceImages && service.serviceImages.length > 0 ? service.serviceImages : [SERVICE_IMAGE];

  return (<>
    <Container>
      <ImageCarousel images={images}/>
      <Header>
        <ServiceDetails>
          <ServiceTitle>{service.title}</ServiceTitle>
          <DetailsContainer>
            <Price>£{service.price}</Price>
            <ServiceCategory category={service.category}/>
          </DetailsContainer>
          <AreasCoveredContainer>
            <FontAwesomeIcon
                className="fa-fw"
                icon={faLocationDot}
                color={theme.palette.secondary.main}
            />
            <TagsContainer>
              {service.areasCovered.map((area) => (<Chip key={area} tabIndex={-1} label={area}/>))}
            </TagsContainer>
          </AreasCoveredContainer>
          <AvailabilityContainer>
            <FontAwesomeIcon className="fa-fw" icon={faCalendar}
                             color={theme.palette.secondary.main}/>
            {service.availability.map((day) => (<Chip key={day} tabIndex={-1} label={day}/>))}
          </AvailabilityContainer>
        </ServiceDetails>
        <ActionsContainer>
          <NavLink to={`/provider/profile/${service.providerId}`}>
            <ProviderContainer>
              <ProfileImage size="small" image={service.providerProfileImage}/>
              <NameContainer>
                <Name>
                  {service.providerFirstName} {service.providerLastName}
                </Name>
                {/*TODO: Add provider rating*/}
                <TextIcon
                    color={theme.palette.info.main}
                    text={service.providerEmail}
                    icon={faEnvelope}
                />
              </NameContainer>
            </ProviderContainer>
          </NavLink>
          <ButtonsContainer>
            {!customer && currentUser.id === service.providerId && (
                <IconButton icon={faPencil} name="Manage" onClick={handleOpenDialog}/>)}
            {customer && (<IconButton icon={faBellConcierge} name="Request" onClick={handleOpenDialog}/>)}
            &emsp;
            {customer && (<IconButton color="success" icon={faComments} name="Review" onClick={handleOpenReview}/>)}
          </ButtonsContainer>
        </ActionsContainer>
      </Header>
      <Line/>
      <Description>
        <ReadMore text={service.description}/>
      </Description>
      {provider ? (<ManageServiceDialog
          providerID={service.providerId}
          open={dialogOpen}
          onClose={handleCloseDialog}
          editingExistingService={true}
          editService={service}
      />) : (<ServiceRequestDialog>
        <Snackbar open={successAlertOpen} autoHideDuration={7000}
                  onClose={handleCloseSuccessAlert}>
          <Alert severity="success">New service request successfully created</Alert>
        </Snackbar>
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth={false} fullWidth>
          <DialogContent>
            <ServiceRequestForm submit={handleSubmit}/>
          </DialogContent>
        </Dialog>
      </ServiceRequestDialog>)}
      {(<ReviewDialog>
        <Snackbar open={successReviewOpen} autoHideDuration={7000}
                  onClose={reviewCloseSuccessAlert}>
          <Alert severity="success">Review successful</Alert>
        </Snackbar>
        <Dialog open={reviewOpen} onClose={handleCloseReview} maxWidth={false} fullWidth>
          <DialogContent>
            <ReviewForm submit={reviewSubmit}/>
          </DialogContent>
        </Dialog>
      </ReviewDialog>)}
    </Container>
    {serviceRequests.length > 0 && (<>
      <Line/>
      <Subtitle>Requests</Subtitle>
      <ServiceRequestList serviceRequests={serviceRequests} byService={true}/>
    </>)}
    <Subtitle>Reviews</Subtitle>
    <ReviewStack serviceID={service.id}/>
  </>);
};

export default observer(Service);

const Subtitle = styled.h3`
  padding-left: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-bottom: 4px solid ${(props) => props.theme.palette.primary.light};
  border-radius: ${border.borderRadius};
  background-color: ${(props) => props.theme.palette.info.light};
`;

const Header = styled.div`
  padding: 0 30px;
  display: flex;
  gap: 5px;
  justify-content: space-between;

  button {
    width: 120px;
    height: 50px;
  }

  @media only screen and ${device.tablet} {
    gap: 20px;
    flex-direction: column;
  }
`;

const ServiceTitle = styled.h1`
  color: ${(props) => props.theme.palette.secondary.dark};
  margin: 0;
  padding: 0;

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`;

const ServiceDetails = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;

  @media only screen and ${device.tablet} {
    gap: 20px;
  }
`;
const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and ${device.tablet} {
    justify-content: center;
  }
`;

const AreasCoveredContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;

  @media only screen and ${device.tablet} {
    justify-content: center;
  }
`;

const AvailabilityContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and ${device.tablet} {
    justify-content: center;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;

  @media only screen and ${device.tablet} {
    align-items: center;
    justify-content: center;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-self: center;

  @media only screen and ${device.tablet} {
    justify-content: center;
    align-items: center;
  }
`;

const Name = styled.p`
  margin: 0;
  padding: 0;

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`;

const ProviderContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    justify-content: center;
  }
`;

const Description = styled.div`
  padding: 10px 20px;
`;

const ButtonsContainer = styled.div``;

const ServiceRequestDialog = styled.div``;

const ReviewDialog = styled.div``;