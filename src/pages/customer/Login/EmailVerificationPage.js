import {observer} from "mobx-react";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import LoginStore from "../../../stores/LoginStore";
import {useNavigate, useParams} from "react-router-dom";
import verifiedImg from "../../../utils/images/verifiedCheck.png";
import notVerifiedImg from "../../../utils/images/nonVerifiedX.png";
import styled from "@emotion/styled";
import {border} from "../../../utils/styles/themeConfig";
import Button from "@mui/material/Button";
import {FormPage, StyledBox, StyledContainer} from "../../../utils/styles/formStyles";

const EmailVerificationPage = () => {

    const params = useParams();

    // For rerouting to Login Page
    let navigate = useNavigate();

    // Do email verification
    const verified = LoginStore.isVerified(params.customerId, params.token)

    // Loading
    if (verified === undefined) {
        return (
            <CircularLoading />
        )
    }

    let image;
    let text;

    if (verified) {
        image = verifiedImg
        text = "Email verified Successfully!"
    } else {
        image = notVerifiedImg
        text = "Verification Failed. Please try again."
    }

    const sendToLogin = () => {
        navigate('/customer/login?fromRegister');
    }

    return (
        <FormPage>
            <StyledContainer>
                <StyledBox>
                    <FormContainer>
                        <ImageContainer>
                            <Image image={image}/>
                        </ImageContainer>
                        <TextContainer>{text}</TextContainer>
                        {verified &&
                            <Button type="button" variant="contained" size="large" onClick={sendToLogin}>Log In</Button>
                        }
                    </FormContainer>
                </StyledBox>
            </StyledContainer>
        </FormPage>

    )
}

export default observer(EmailVerificationPage);

export const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 20px 0;
  align-items: center;
`

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
`

const Image = styled.div`
  background-image: url(${props => props.image});
  border-radius: ${border.borderRadius};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`

const TextContainer = styled.div`
`