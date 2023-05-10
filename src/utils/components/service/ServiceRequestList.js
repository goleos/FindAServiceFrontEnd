import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {Alert, Dialog, DialogContent, Grid, Snackbar} from "@mui/material";
import {Line, Name, NameContainer, Price, PriceContainer, RequestNumber, UserDetails} from "../../styles/pageStyles";
import {TextIcon} from "../TextIcon";
import {
  faCalendar, faComments, faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "@mui/system";
import {formatDate} from "../../helpers/formatDate";
import {border} from "../../styles/themeConfig";
import ReadMore from "../../../pages/provider/Profile/components/ReadMore";
import LoginStoreInstance from "../../../stores/LoginStore";
import {ProfileImage} from "../ProfileImage";
import {device} from "../../helpers/constants";
import ServiceCategory from "./ServiceCategory";
import {NavLink, useParams} from "react-router-dom";
import {getRequestStatusInfo} from "../../helpers/serviceFunctions";
import IconButton from "../IconButton";
import React, {useState} from "react";
import ReviewForm from "../../../pages/service/Reviews/ReviewForm";

const ServiceRequestList = (props) => {

  const theme = useTheme();

  const provider = LoginStoreInstance.isProvider();
  const admin = LoginStoreInstance.isAdmin();
  const serviceRequestNodes = []

  const [reviewOpen, setReviewOpen] = useState(false);
  const [successReviewOpen, setSuccessReviewOpen] = useState(false);
  const [serviceId, setServiceId] = useState(0);


  const handleOpenReview = (e) => {
    // console.log(e.target.getAttribute("serviceId"));
    e.preventDefault();
    setServiceId(e.target.getAttribute("serviceId"))
    setReviewOpen(true);
  };

  const handleCloseReview = () => {
    setReviewOpen(false);
  };

  const reviewSubmit = () => {
    setReviewOpen(false);
    setSuccessReviewOpen(true);
  };

  const reviewCloseSuccessAlert = () => {
    setSuccessReviewOpen(false);
  };


  props.serviceRequests.forEach((elem, index) => {
    let {color, icon, statusText} = getRequestStatusInfo(elem.status, provider, theme)
    console.log(elem);
    // const size = props.byService ? 6 : 12

    serviceRequestNodes.push(<Grid item lg={12} md={12} s={12} xs={12} key={index}>
          <NavLink to={`/service-requests/${elem.id}`}>
            <Item>
              <RequestNumber>
                Req. Num. #{elem.id}
              </RequestNumber>
              <Description>
                <ReadMore text={elem.description}/>
              </Description>
              <Line/>
              <DetailsContainer>
                {!props.byService && <ServiceDetails>
                  <Subtitle>{elem.title}</Subtitle>
                  <PriceContainer>
                    <ServiceCategory category={elem.category}/>
                    <Price>£{elem.price}</Price>
                  </PriceContainer>
                </ServiceDetails>}
                <FlexContainer byService={props.byService}>
                  <RequestDetails>
                    <TextIcon color={theme.palette.info.main} icon={faCalendar}
                              text={formatDate(elem.bookingTime)}/>
                    <TextIcon color={theme.palette.info.main} icon={faLocationDot}
                              text={elem.customerAddress}/>
                    {provider && <UserDetails>
                      <ProfileImage size="xs" image={elem.customerProfileImage}/>
                      <NameContainer>
                        <Name>{elem.customerFirstName} {elem.customerLastName}</Name>
                      </NameContainer>
                    </UserDetails>}
                  </RequestDetails>
                  <TextIcon color={color} icon={icon} text={statusText}/>
                  {statusText == 'Completed' && !provider && !admin && (
                      <IconButton color="success" serviceId={elem.service_id} icon={faComments} name="Review" onClick={handleOpenReview}/>)}
                </FlexContainer>
              </DetailsContainer>
            </Item>
          </NavLink>
        </Grid>,)
  })

  return (<Container>
    <Grid container spacing={2}>
      {serviceRequestNodes}
    </Grid>
    <ReviewDialog>
      <Snackbar open={successReviewOpen} autoHideDuration={7000}
                onClose={reviewCloseSuccessAlert}>
        <Alert severity="success">Review successful</Alert>
      </Snackbar>
      <Dialog open={reviewOpen} onClose={handleCloseReview} maxWidth={false} fullWidth>
        <DialogContent>
          <ReviewForm serviceId={serviceId} submit={reviewSubmit}/>
        </DialogContent>
      </Dialog>
    </ReviewDialog>
  </Container>)
}

export default observer(ServiceRequestList);

const Container = styled.div`
  padding: 0 10px;
  height: 50vh;
  overflow-y: scroll;
`

const ServiceDetails = styled.div`
`

const Subtitle = styled.h3`
  margin: 0
`

const Description = styled.div`
  margin: 2px;
`

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and ${device.tablet} {
    flex-flow: column;
    justify-content: center;
  }
`


const FlexContainer = styled.div`
  width: ${props => props.byService ? '100%' : '50%'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and ${device.tablet} {
    width: 100%;
  }
`

// box-shadow from https://getcssscan.com/css-box-shadow-examples
const Item = styled.div`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
  transition: box-shaodw 0.5s;
  display: flex;
  flex-direction: column;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.05) 1.95px 1.95px 2.6px;
  }
`
const ReviewDialog = styled.div``;