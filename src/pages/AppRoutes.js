import {observer} from "mobx-react";
import LoginStore from "../stores/LoginStore";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "../utils/helpers/constants";
import ProviderHomePage from "./provider/Home/ProviderHomePage";
import AdminHomePage from "./admin/Home/AdminHomePage";
import CustomerHomePage from "./customer/Home/CustomerHomePage";


const AppRoutes = () => {

    let provider = LoginStore.isProvider();
    let admin = LoginStore.isAdmin();

    if (provider) {
        return (
            <Routes>
                <Route path={ROUTES.provider.home}
                       element={<ProviderHomePage/>} />
            </Routes>
        )
    } else if (admin) {
        return (
            <Routes>
                <Route path={ROUTES.admin.home}
                       element={<AdminHomePage/>} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path={ROUTES.customer.home}
                       element={<CustomerHomePage/>} />
            </Routes>
        )
    }



}

export default observer(AppRoutes);