import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../styles/themeConfig";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getServiceIcon} from "../../helpers/serviceFunctions";


const ServiceCategory = (props) => {
  return (
    <Container>
      <IconContainer>
        <FontAwesomeIcon className="fa-lg" icon={getServiceIcon(props.category)}/>
      </IconContainer>
      <Text>{props.category}</Text>
    </Container>
  )
}

export default observer(ServiceCategory);

export const Container = styled.div`
  color: ${props => props.theme.palette.primary.main};
  background-color: ${props => props.theme.palette.primary.light} ;
  margin: 0;
  padding: 5px 10px;
  border-radius: ${border.borderRadius};
  width: fit-content;
  display: flex;
  gap: 5px;
`

export const Text = styled.div`
  font-weight: bolder;
`


export const IconContainer = styled.div`
`
