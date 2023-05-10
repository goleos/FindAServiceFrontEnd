import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {Grid} from "@mui/material";
import {Line, Name, NameContainer, Price, PriceContainer, RequestNumber, UserDetails} from "../../styles/pageStyles";
import {TextIcon} from "../TextIcon";
import {
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "@mui/system";
import {formatDate} from "../../helpers/formatDate";
import {border} from "../../styles/themeConfig";
import ReadMore from "../../../pages/provider/Profile/components/ReadMore";
import LoginStoreInstance from "../../../stores/LoginStore";
import {ProfileImage} from "../ProfileImage";
import {device} from "../../helpers/constants";
import ServiceCategory from "./ServiceCategory";
import {NavLink} from "react-router-dom";
import {getRequestStatusInfo} from "../../helpers/serviceFunctions";

/**
 * List of service requests
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ServiceRequestList = (props) => {

  const theme = useTheme();

  const provider = LoginStoreInstance.isProvider();

  const serviceRequestNodes = []

  props.serviceRequests.forEach((elem, index) => {

    let {color, icon, statusText} = getRequestStatusInfo(elem.status, provider, theme)

    // const size = props.byService ? 6 : 12

    serviceRequestNodes.push(
      <Grid item lg={12} md={12} s={12} xs={12} key={index}>
        <NavLink to={`/service-requests/${elem.id}`}>
          <Item>
            <RequestNumber>
              Req. Num. #{elem.id}
            </RequestNumber>
            <Description>
              <ReadMore text={elem.description}/>
            </Description>
            <Line />
            <DetailsContainer>
              {!props.byService &&
                <ServiceDetails>
                  <Subtitle>{elem.title}</Subtitle>
                  <PriceContainer>
                    <ServiceCategory category={elem.category} />
                    <Price>£{elem.price}</Price>
                  </PriceContainer>
                </ServiceDetails>
              }
              <FlexContainer byService={props.byService}>
                <RequestDetails>
                  <TextIcon color={theme.palette.info.main} icon={faCalendar} text={formatDate(elem.bookingTime)}/>
                  <TextIcon color={theme.palette.info.main} icon={faLocationDot} text={elem.customerAddress}/>
                  {provider &&
                    <UserDetails>
                      <ProfileImage size="xs" image={elem.customerProfileImage}/>
                      <NameContainer>
                        <Name>{elem.customerFirstName} {elem.customerLastName}</Name>
                      </NameContainer>
                    </UserDetails>
                  }
                </RequestDetails>
                <TextIcon color={color} icon={icon} text={statusText}/>
              </FlexContainer>
            </DetailsContainer>
          </Item>
        </NavLink>
      </Grid>
    )
  })

  return (
    <Container byService={props.byService}>
      <Grid container spacing={2}>
        {serviceRequestNodes}
      </Grid>
    </Container>
  )
}

export default observer(ServiceRequestList);

const Container = styled.div`
  padding: 0 10px;
  min-height: ${props => props.byService && '20vh'};
  max-height: ${props => props.byService && '50vh'};
  overflow: ${props => props.byService && 'auto'};
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