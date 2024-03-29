import {observer} from "mobx-react";
import {Page} from "../../utils/styles/pageStyles";
import {faFrownOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";

/**
 * Page to display if a service was deleted or its provider
 * removed
 * @returns {JSX.Element}
 * @constructor
 */
const UnavailableServicePage = () => {
    return (
        <Page>
            <Container>
                <IconContainer>
                    <FontAwesomeIcon className="fa-2xl" icon={faFrownOpen}/>
                </IconContainer>
                <Heading>Service Unavailable</Heading>
                <Text>Unfortunately this service is not available at the moment</Text>
            </Container>
        </Page>
    )
}

export default observer(UnavailableServicePage);

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