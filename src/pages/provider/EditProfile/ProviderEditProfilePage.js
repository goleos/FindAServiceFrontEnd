import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import EditForm from "./components/EditForm";
import {Title} from "../../../utils/components/Title";


const ProviderEditProfilePage = () => {

    const { userStore, providerProfileEditStore } = useStore();

    // Get current user
    let provider = userStore.getCurrentUser();

    // Loading
    if (provider === undefined) {
        return (
            <CircularLoading />
        )
    }

    providerProfileEditStore.setProviderInfo(provider)

    return (
        <Page>
            <Title text="Edit Profile" />
            <EditForm providerId={provider.id}/>
        </Page>
    )
}

export default observer(ProviderEditProfilePage);