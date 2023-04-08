import React, { useState } from "react";
import styled from "@emotion/styled";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Component for displaying any component in a side menu
 * @param props
 * @constructor
 */
export const SideMenu = (props) => {

    // Is menu open?
    const [menuOpen, setMenuOpen] = useState(false);

    // Open/Close menu
    const toggleDrawer = () =>
        (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) {
                return;
            }

            setMenuOpen(!menuOpen);
        };

    return (
        <HamburgerContainer>
            {props.buttonElement ?
                <Container
                    onClick={toggleDrawer()}
                    color="inherit"
                    aria-label="menu"
                >
                    {props.buttonElement}
                </Container>
                :
                <StyledIconButton
                    onClick={toggleDrawer()}
                    size={props.buttonSize}
                    color="inherit"
                    aria-label="menu"
                >
                    <IconContainer color={props.color} fontSize={props.fontSize}><FontAwesomeIcon icon={props.icon}/></IconContainer>
                </StyledIconButton>
            }

            <SwipeableDrawer
                anchor={props.direction}
                open={menuOpen}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
            >
                {props.menu}
            </SwipeableDrawer>
        </HamburgerContainer>
    )
}

export default SideMenu;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  transition: color 0.5s;
  font-size: ${props => props.fontSize};
  
  :hover {
    color: ${props => props.theme.palette.secondary.main};
  }
`

const StyledIconButton = styled(IconButton)`
  :hover {
    background-color: inherit;
  }
`

const HamburgerContainer = styled.div`
`

const Container = styled.div`
`
