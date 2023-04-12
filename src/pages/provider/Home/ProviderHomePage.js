import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import UnapprovedPage from "../Unapproved/UnapprovedPage";
import ProviderProfileStore from "../../../stores/ProviderProfileStore";


const ProviderHomePage = () => {
    const { userStore } = useStore();

    // Get current user
    let provider = userStore.getCurrentUser();

    // Loading
    if (provider === undefined) {
        return (
            <CircularLoading />
        )
    }

    const providerProfileStore = new ProviderProfileStore(provider.id);

    // Unapproved Providers
    if (!provider.isApproved) {
        return (
            <UnapprovedPage store={providerProfileStore}/>
        )
    }

    return (
        <Page>
            Hi, {provider.firstName}
        </Page>
    )
}

export default observer(ProviderHomePage);