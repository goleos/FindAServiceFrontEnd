import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import {faFrownOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

/**
 * Page to display for a provider that was removed by the admin
 * @returns {JSX.Element}
 * @constructor
 */
const UnavailablePage = () => {
    return (
        <Page>
            <Container>
                <IconContainer>
                    <FontAwesomeIcon className="fa-2xl" icon={faFrownOpen}/>
                </IconContainer>
                <Heading>Account Removed</Heading>
                <Text>Unfortunately you account was rejected or removed by the admin</Text>
            </Container>
        </Page>
    )
}

export default observer(UnavailablePage);

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