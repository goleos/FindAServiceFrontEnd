import {observer} from "mobx-react";
import {useStore} from "../../../stores/RootStore";
import {CircularLoading} from "../../../utils/components/CircularLoading";


const CustomerHomePage = () => {
    const { userStore } = useStore();

    // Get current user
    let customer = userStore.getCurrentUser();

    // Loading
    if (customer === undefined) {
        return (
            <CircularLoading />
        )
    }

    return (
        <div>
            Hi, {customer.firstName}
        </div>
    )
}

export default observer(CustomerHomePage);