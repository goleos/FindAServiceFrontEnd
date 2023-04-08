import {observer} from "mobx-react";
import styled from "@emotion/styled";
import AppRoutes from "./AppRoutes";
import Header from "./Header";
import DesktopMenu from "./menu/DesktopMenu";

const Dashboard = () => {

    return (
        <Container>
            <DesktopMenu />
            <Page>
                <Header />
                <AppRoutes />
            </Page>
        </Container>
    )
}

export default observer(Dashboard);

const Container = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.info.light};
`

const Page = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-flow: column;
  margin: 0;
  background-color: ${props => props.theme.palette.primary.light};
`