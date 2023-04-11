import {observer} from "mobx-react";
import {CircularLoading} from "../../../../utils/components/CircularLoading";
import ProfileDetails from "./ProfileDetails";
import styled from "@emotion/styled";
import {border} from "../../../../utils/styles/themeConfig";


const Profile = (props) => {

    const provider = props.store.getProvider();

    // Loading
    if (provider === undefined) {
        return (
            <CircularLoading />
        )
    }

    if (provider === null) {
        return (
            <p>Provider no longer available</p>
        )
    }

    return (
        <Container>
            <ProfileDetails provider={provider}/>
        </Container>
    )
}

export default observer(Profile);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
  border-radius: ${border.borderRadius};
  background-color: ${props => props.theme.palette.info.light};
`

