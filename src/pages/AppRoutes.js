import {observer} from "mobx-react";
import LoginStore from "../stores/LoginStore";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "../utils/helpers/constants";
import ProviderHomePage from "./provider/Home/ProviderHomePage";
import AdminHomePage from "./admin/Home/AdminHomePage";
import CustomerHomePage from "./customer/Home/CustomerHomePage";
import ProviderProfile from "./provider/Profile/ProviderProfilePage";


const AppRoutes = () => {

    let provider = LoginStore.isProvider();
    let admin = LoginStore.isAdmin();

    let routeNodes = []

    // Routes available for all
    routeNodes.push(
        <Route path={ROUTES.provider.profile}
               element={<ProviderProfile/>} />
    )

    if (provider) {
        routeNodes.push(
            <Route path={ROUTES.provider.home}
                   element={<ProviderHomePage/>} />
        )
    } else if (admin) {
        routeNodes.push(
            <Route path={ROUTES.admin.home}
                   element={<AdminHomePage/>} />
        )
    } else {
        routeNodes.push(
            <Route path={ROUTES.customer.home}
                   element={<CustomerHomePage/>} />
        )
    }

    return (
        <Routes>
            {routeNodes}
        </Routes>
    )
}

export default observer(AppRoutes);