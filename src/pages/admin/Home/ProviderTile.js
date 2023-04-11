import React from "react";
import styled from "@emotion/styled";
import {ProfileImage} from "../../../utils/components/ProfileImage";
import {border} from "../../../utils/styles/themeConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faPaperPlane, faHourglassHalf} from "@fortawesome/free-solid-svg-icons";
import {useTheme} from "@mui/material";
import {TextIcon} from "../../../utils/components/TextIcon";

/**
 * User name and image
 * @param props
 * @constructor
 */
const ProviderTile = (props) => {

    const theme = useTheme();

    let color;
    let icon;
    let statusText;

    switch (props.provider.status) {
        case "pending":
            color = theme.palette.info.main;
            icon = faPaperPlane;
            statusText = "Update Sent";
            break;
        default:
            color = theme.palette.error.main;
            icon = faHourglassHalf;
            statusText = "To Review";
            break;
    }

    return (
        <Container>
            <Header>
                <ProfileImage size="medium" image={props.provider.profileImage} />
                <InfoContainer>
                    <Name>{props.provider.firstName} {props.provider.lastName}</Name>
                    <AddressContainer>
                        <IconContainer><FontAwesomeIcon className="fa-fw" icon={faLocationDot}/></IconContainer>
                        <Address>{props.provider.address}</Address>
                    </AddressContainer>
                </InfoContainer>
            </Header>
            <TextIcon color={color} icon={icon} text={statusText}/>
        </Container>
    )
}

export default ProviderTile;

const Container = styled.div`
  display: flex;
  flex-flow: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: ${props => props.theme.palette.info.light};
  border-radius: ${border.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: box-shadow 0.5s;
  
  :hover {
    box-shadow: rgba(0, 0, 0, 0.05) 1.95px 1.95px 2.6px;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  justify-content: start;
`


const Header = styled.div`
  display: flex;
  flex-flow: row;
  gap: 20px;
  align-items: start;
  justify-content: center;
  padding: 20px;
`

const Name = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0;
`
const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.palette.info.main};
`

const IconContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
`

const Address = styled.div`
`
