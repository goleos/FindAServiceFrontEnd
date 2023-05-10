import {observer} from "mobx-react";
import styled from "@emotion/styled";
import MenuBar from "./MenuBar";
import {device} from "../../utils/helpers/constants";

// Menu displayed on larger screens
const DesktopMenu = () => {

    return (
        <Container>
            <MenuBar />
        </Container>
    )
}

export default observer(DesktopMenu);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;

  @media only screen and ${device.tablet} {
    display: none;
  }
`