import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {useStore} from "../stores/RootStore";
import SideMenu from "../utils/components/SideMenu";
import {SearchBar} from "../utils/components/SearchBar";
import {ProfileImage} from "../utils/components/ProfileImage";
import {border, theme} from "../utils/styles/themeConfig";
import {faBars, faBell} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {device} from "../utils/helpers/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import LoginStore from "../stores/LoginStore";
import {CircularLoading} from "../utils/components/CircularLoading";
import MenuBar from "./menu/MenuBar";
import Menu from '@mui/material/Menu';

const Header = () => {

    // Get stores
    const { userStore } = useStore();

    let user = userStore.getCurrentUser();

    // User Menu
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        LoginStore.logout();
        handleCloseUserMenu();
    };

    // Loading
    if (user === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <Container>
            <HamburgerContainer>
                <SideMenu color={theme.palette.primary.main} fontSize="1.7rem" direction="left" icon={faBars} buttonSize="large" menu={<MenuBar />}/>
            </HamburgerContainer>
            <SearchBar
                // value={query}
                // onChange={(e) => {
                //     setQuery(e.target.value);
                //     searchStore.setQuery(e.target.value);
                // }}
                // onKeyDown={(e) => {
                //     handleSubmit(e);
                // }}
            />
            <TopRightContainer>
                <SideMenu
                    buttonElement={
                    <NotificationContainer>
                        <FontAwesomeIcon icon={faBell}/>
                    </NotificationContainer>
                    }
                    color={theme.palette.info.main}
                    fontSize="1.6rem"
                    buttonSize="medium"
                    icon={faBell}
                    direction="right"
                    menu={<div>notifications</div>} />
                <Box sx={{ flexGrow: 0 }}>
                    <ProfileImage size="small" onClick={handleOpenUserMenu} image={user.profileImage}/>
                    <StyledMenu
                        sx={{ mt: '60px' }}
                        id="user-menu"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <UserName>{user.firstName} {user.lastName}</UserName>
                        <MenuItem onClick={handleLogOut}>
                            <NavLink to={"/"}><SettingText>Logout</SettingText></NavLink>
                        </MenuItem>
                    </StyledMenu>
                </Box>
            </TopRightContainer>
        </Container>
    )
}

export default observer(Header);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  @media only screen and ${device.tablet} {
    padding: 15px 10px;
  }
`

const TopRightContainer = styled.div`
  display: flex;
  gap: 30px;
`

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.palette.info.main};
  background-color: ${props => props.theme.palette.info.light};
  padding: 15px;
  font-size: 1.5rem;
  border-radius: ${border.borderRadius};
  transition: color 0.5s;
  cursor: pointer;
  
  :hover {
    color: ${props => props.theme.palette.primary.main};
  }
`

const SettingText = styled.div`
`

const StyledMenu = styled(Menu)`
  padding: 0;
  > div {
    border-radius: ${border.borderRadius};
  }
`

const UserName = styled.h4`
  padding: 15px 16px;
  font-size: 1.1rem;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.palette.primary.light};
`

const HamburgerContainer = styled.div`
  display: none;
  
  @media only screen and ${device.tablet} {
    display: flex;
  }
`