import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import UnapprovedPage from "../Unapproved/UnapprovedPage";
import ProviderProfileStore from "../../../stores/ProviderProfileStore";
import Header from "./Header/index"
import CurrentServiceList from "./CurrentServices/index"


const ProviderHomePage = () => {
    const { userStore, serviceStore } = useStore();

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

    const services = serviceStore.getServices(provider.id);
    
    return (
        <Page>
            <h3>Hi, {provider.firstName}</h3>
            <Header />
            <CurrentServiceList/>
        </Page>
    )
}

export default observer(ProviderHomePage);