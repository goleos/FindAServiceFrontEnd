import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {border} from "../../utils/styles/themeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem = (props) => {

    return (
        <MenuLink>
            <MenuLinkContent>
                <IconContainer><FontAwesomeIcon className="fa-fw" icon={props.icon}/></IconContainer>
                <MenuText>{props.text}</MenuText>
            </MenuLinkContent>
        </MenuLink>
    )
}

export default observer(MenuItem);


const MenuLink = styled.div`
  display: flex;
  align-items: center;
`

const MenuLinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.palette.info.main};
  transition: color 0.5s, background 0.5s;
  border-radius: ${border.borderRadius};
  padding: 10px;
  width: 200px;
  :hover {
    color: ${props => props.theme.palette.primary.main};
    background-color: ${props => props.theme.palette.primary.light};
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuText = styled.div`
`