import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {device} from "../../../../utils/helpers/constants";
import {ProfileImage} from "../../../../utils/components/ProfileImage";
import React from "react";
import {useTheme} from "@mui/material";
import {faEnvelope, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {TextIcon} from "../../../../utils/components/TextIcon";
import ReadMore from "./ReadMore";
import {Line} from "../../../../utils/styles/pageStyles";


const ProfileDetails = (props) => {

    const theme = useTheme();

    return (
        <Container>
            <ProfileContainer>
                <DetailsContainer>
                    <ProfileImage size="large" image={props.provider.profileImage}/>
                    <NameContainer>
                        <Name>{props.provider.firstName} {props.provider.lastName}</Name>
                        <TextIcon color={theme.palette.info.main} text={props.provider.email} icon={faEnvelope}/>
                        <TextIcon color={theme.palette.info.main} text={props.provider.address} icon={faLocationDot}/>
                    </NameContainer>
                </DetailsContainer>
            </ProfileContainer>
            <Line />
            <Description>
                <ReadMore text={props.provider.description} />
            </Description>
        </Container>
    )
}

export default observer(ProfileDetails);

const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  
  button {
    width: 120px;
    height: 50px;
  }

  @media only screen and ${device.mobileL} {
    flex-flow: column;
  }
`

const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;

  @media only screen and ${device.mobileL} {
    align-items: center;
    justify-content: center;
  }
`

const Name = styled.h1`
  margin: 0;
  padding: 0;

  @media only screen and ${device.mobileL} {
    text-align: center;
  }
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and ${device.mobileL} {
    flex-flow: column;
    justify-content: center; 
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  padding: 30px;
  border-bottom: 4px solid ${props => props.theme.palette.primary.light};
`

const Description = styled.div`
  padding: 10px;
`



