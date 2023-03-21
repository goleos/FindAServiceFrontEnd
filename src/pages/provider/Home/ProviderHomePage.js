import {observer} from "mobx-react";
import { useStore } from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";


const ProviderHomePage = () => {
    const { providerStore } = useStore();

    // Get current user
    let provider = providerStore.getCurrentProvider();

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