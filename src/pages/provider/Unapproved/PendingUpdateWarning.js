import {observer} from "mobx-react";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";


const PendingUpdateWarning = () => {
    return (
        <Container>
            <IconContainer>
                <FontAwesomeIcon className="fa-2xl" icon={faTriangleExclamation}/>
            </IconContainer>
            <Heading>Update Requested</Heading>
            <Text>Please review the admin request below and make updates accordingly. </Text>
            <Text>Make sure to mark the request as completed when finished.</Text>
        </Container>
    )
}

export default observer(PendingUpdateWarning);

const Text = styled.div`
    margin: 2px 0;
`

const Heading = styled.h2`
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