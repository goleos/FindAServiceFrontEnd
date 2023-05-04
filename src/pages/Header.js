import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {useStore} from "../stores/RootStore";
import SideMenu from "../utils/components/SideMenu";
import {SearchBar} from "../utils/components/SearchBar";
import {ProfileImage} from "../utils/components/ProfileImage";
import {border, theme} from "../utils/styles/themeConfig";
import {faBars, faBell} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {device, ROUTES, SERVICE_CATEGORIES} from "../utils/helpers/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {MenuItem} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {CircularLoading} from "../utils/components/CircularLoading";
import MenuBar from "./menu/MenuBar";
import Menu from '@mui/material/Menu';
import LoginStoreInstance from "../stores/LoginStore";
import NotificationsBar from "../utils/components/notifications/NotificationsBar";
import axiosConfig from "../utils/helpers/axiosConfig";

const Header = () => {

    // Get stores
    const { userStore, serviceStore, notificationsStore } = useStore();
    const navigate = useNavigate();

    let user = userStore.getCurrentUser();

    const unreadCount = notificationsStore.getUnreadCount();

    let provider = LoginStoreInstance.isProvider();
    let admin = LoginStoreInstance.isAdmin();
    let customer = !provider && !admin;

    // Search query
    const [query, setQuery] = useState('');

    // User Menu
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        LoginStoreInstance.logout();
        handleCloseUserMenu();
    };


    const handleSubmit = (event) => {
      if (query && event.key === "Enter") {
        if (query in SERVICE_CATEGORIES) {
          serviceStore.requestServices(null, query, null, query);
        } else {
          serviceStore.requestServices(null, null, null, query);
        }
        setQuery('');
        navigate(`/search`);
      }
    };

    // Make requests red
    const handleRead = async () => {
      if (unreadCount > 0) {
        try {
          await axiosConfig().post("/notification/read");
          notificationsStore.requestUnreadCount();
        } catch (err) {
          console.log(err)
        }
      }
    }

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
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                    handleSubmit(e);
                }}
            />
            <TopRightContainer>
              {customer && <SideMenu
                    buttonElement={
                    <NotificationContainer onClick={handleRead}>
                        <FontAwesomeIcon icon={faBell}/>
                        { unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
                    </NotificationContainer>
                    }
                    color={theme.palette.info.main}
                    fontSize="1.6rem"
                    buttonSize="medium"
                    icon={faBell}
                    direction="right"
                    menu={<NotificationsBar />} />}
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

                        {provider &&
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink to={`/provider/profile/${user.id}`}><SettingText>My Profile</SettingText></NavLink>
                            </MenuItem>
                        }

                        {provider &&
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink to={ROUTES.provider.editProfile}><SettingText>Settings</SettingText></NavLink>
                            </MenuItem>
                        }

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
  position: relative;
  
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

const UnreadBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  background-color:  red;
  color:  ${props => props.theme.palette.info.light};
  
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  text-align: center;
  padding: 2px 0;
`