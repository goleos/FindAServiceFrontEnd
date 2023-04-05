import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";


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

    return (
        <div>
            Hi, {provider.firstName}
        </div>
    )
}

export default observer(ProviderHomePage);