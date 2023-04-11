import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";
import {Page} from "../../../utils/styles/pageStyles";
import ApprovalPending from "../ApprovalPending";


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

    // Unapproved Providers
    if (!provider.isApproved) {
        return (
            <ApprovalPending />
        )
    }

    return (
        <Page>
            Hi, {provider.firstName}
        </Page>
    )
}

export default observer(ProviderHomePage);