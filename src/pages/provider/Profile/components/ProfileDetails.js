import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {device, ROUTES as ROUTE} from "../../../../utils/helpers/constants";
import {ProfileImage} from "../../../../utils/components/ProfileImage";
import React, {useState} from "react";
import {Alert, useTheme} from "@mui/material";
import {faCheck, faEnvelope, faLocationDot, faXmark} from "@fortawesome/free-solid-svg-icons";
import {TextIcon} from "../../../../utils/components/TextIcon";
import ReadMore from "./ReadMore";
import {Line} from "../../../../utils/styles/pageStyles";
import IconButton from "../../../../utils/components/IconButton";
import axiosConfig from "../../../../utils/helpers/axiosConfig";
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../../stores/RootStore";
import LoginStore from "../../../../stores/LoginStore";

const ProfileDetails = (props) => {

    const { adminStore } = useStore();

    const admin = LoginStore.isAdmin();

    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const theme = useTheme();

    const handleApprove = async () => {
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            await axiosConfig().put(`/provider/${props.provider.id}/approve`)
            adminStore.requestUnapprovedProviders();
            navigate(ROUTE.admin.home)
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
            await axiosConfig().put(`/provider/${props.provider.id}/reject`)
            adminStore.requestUnapprovedProviders();
            navigate(ROUTE.admin.home)
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false);
            setErrorMessage(err.response.data.message)
            console.log(err)
        }
    }

    return (
        <Container>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <ProfileContainer>
                <DetailsContainer>
                    <ProfileImage size="large" image={props.provider.profileImage}/>
                    <NameContainer>
                        <Name>{props.provider.firstName} {props.provider.lastName}</Name>
                        <TextIcon color={theme.palette.info.main} text={props.provider.email} icon={faEnvelope}/>
                        <TextIcon color={theme.palette.info.main} text={props.provider.address} icon={faLocationDot}/>
                    </NameContainer>
                </DetailsContainer>
                {admin &&
                    <ButtonsContainer>
                        {!props.provider.isApproved && <IconButton
                            loadingCondition={isSubmitting}
                            icon={faCheck}
                            name="Approve"
                            onClick={handleApprove}
                            color="success"
                        />}
                        <IconButton
                            loadingCondition={isSubmitting}
                            icon={faXmark}
                            name={props.provider.isApproved ? 'Remove' : 'Reject'}
                            onClick={handleReject}
                            color="error"
                        />
                    </ButtonsContainer>
                }
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

  @media only screen and ${device.tablet} {
    flex-direction: column;
  }
`

const NameContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5px;

  @media only screen and ${device.tablet} {
    align-items: center;
    justify-content: center;
  }
`

const Name = styled.h1`
  margin: 0;
  padding: 0;

  @media only screen and ${device.tablet} {
    text-align: center;
  }
`

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and ${device.tablet} {
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and ${device.tablet} {
    padding: 20px;
  }
`



