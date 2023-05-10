import {observer} from "mobx-react";
import styled from "@emotion/styled";
import LoginStore from "../../stores/LoginStore";
import {NavLink } from "react-router-dom";
import {
    faComments,
    faHome,
    faGlobe,
    faCog,
    faScrewdriverWrench,
    faToolbox,
    faCertificate
} from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {device, ROUTES} from "../../utils/helpers/constants";

// List of menu links
const MenuBar = () => {

    let provider = LoginStore.isProvider();
    let admin = LoginStore.isAdmin();

    let items = []

    if (provider) {
        items.push(
            <NavLink to={ROUTES.provider.home} key={0}>
                <MenuItem icon={faHome} text="Home"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.service.myRequests} key={1}>
                <MenuItem icon={faComments} text="Service Requests"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.provider.myServices} key={2}>
                <MenuItem icon={faToolbox} text="My Services"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.provider.editProfile} key={3}>
                <MenuItem icon={faCog} text="Settings"/>
            </NavLink>)
    } else if (admin) {
        items.push(
            <NavLink to={ROUTES.admin.home} key={0}>
                <MenuItem icon={faHome} text="Home"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.admin.newProviders} key={1}>
                <MenuItem icon={faCertificate} text="New Providers"/>
            </NavLink>)
    } else {
        items.push(
            <NavLink to={ROUTES.customer.home} key={0}>
                <MenuItem icon={faHome} text="Home"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.customer.services} key={1}>
                <MenuItem icon={faGlobe} text="Explore Services"/>
            </NavLink>)
        items.push(
            <NavLink to={ROUTES.service.myRequests} key={2}>
                <MenuItem icon={faComments} text="Requests Made"/>
            </NavLink>)
    }

    return (
        <Container>
            <LogoContainer>
                <FontAwesomeIcon icon={faScrewdriverWrench} />
            </LogoContainer>
            <MenuContainer>
                <ItemContainer>
                    {items}
                </ItemContainer>
            </MenuContainer>
        </Container>
    )
}

export default observer(MenuBar);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  width: 250px;
  border-right: 1px solid ${props => props.theme.palette.primary.light};
  background-color: ${props => props.theme.palette.info.light};

  @media only screen and ${device.tablet} {
    width: 60vw;
  }
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${props => props.theme.palette.primary.main};
  padding: 30px;
  border-bottom: 1px solid ${props => props.theme.palette.primary.light};
`

const ItemContainer = styled.div`
    display: flex;
    flex-flow: column;
    gap: 20px;
    align-items: start;
    width: 100%;
`
const MenuContainer = styled.div`
  height: 100%;
  width: 80%;
`