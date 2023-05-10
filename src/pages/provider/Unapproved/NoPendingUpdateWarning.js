import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

/**
 * Text and icon to display when provider is
 * waiting for admin approval
 * @returns {JSX.Element}
 * @constructor
 */
const NoPendingUpdateWarning = () => {
    return (
        <Page>
            <Container>
                <IconContainer>
                    <FontAwesomeIcon className="fa-2xl" icon={faClock}/>
                </IconContainer>
                <Heading>Approval pending</Heading>
                <Text>An admin is reviewing you account. Please check in later.</Text>
            </Container>
        </Page>
    )
}

export default observer(NoPendingUpdateWarning);

const Text = styled.p`
`

const Heading = styled.h2`
    margin-bottom: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const IconContainer = styled.div`
  color: ${props => props.theme.palette.primary.main};
`