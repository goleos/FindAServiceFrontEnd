import {observer} from "mobx-react";
import {Page} from "../../../utils/styles/pageStyles";
import {useParams} from "react-router-dom";
import ProviderProfileStore from "../../../stores/ProviderProfileStore";
import Profile from "./components/Profile";
import ProfileUpdates from "./components/ProfileUpdates";
import styled from "@emotion/styled";
import LoginStoreInstance from "../../../stores/LoginStore";

/**
 * Profile page of a provider
 * @returns {JSX.Element}
 * @constructor
 */
const ProviderProfilePage = () => {

    let params = useParams();
    let providerId = Number(params.providerId);

    const providerProfileStore = new ProviderProfileStore(providerId);

    const admin = LoginStoreInstance.isAdmin();

    return (
        <Page>
            <Container>
                <Profile store={providerProfileStore} />
                {admin && <ProfileUpdates store={providerProfileStore}/>}
            </Container>
        </Page>
    )
}

export default observer(ProviderProfilePage);

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`