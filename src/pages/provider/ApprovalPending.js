import {observer} from "mobx-react";
import {Page} from "../../utils/styles/pageStyles";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "@emotion/styled";


const ApprovalPending = () => {
    return (
        <Page>
            <Container>
                <IconContainer>
                    <FontAwesomeIcon className="fa-2xl" icon={faClock}/>
                </IconContainer>
                <Heading>Approval pending</Heading>
                <Text>An admin is reviewing you account</Text>
            </Container>
        </Page>
    )
}

export default observer(ApprovalPending);

const Text = styled.p`
`

const Heading = styled.h2`
    margin-bottom: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`

const IconContainer = styled.div`
  color: ${props => props.theme.palette.primary.main};
`