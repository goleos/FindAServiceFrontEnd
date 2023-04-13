import { observer } from "mobx-react";
import LoginStore from "../stores/LoginStore";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/helpers/constants";
import ProviderHomePage from "./provider/Home/ProviderHomePage";
import AdminUnapprovedProvidersPage from "./admin/Home/AdminUnapprovedProvidersPage";
import CustomerHomePage from "./customer/Home/CustomerHomePage";
import ProviderMyServicesPage from "./provider/MyServices/ProviderMyServicesPage";
import ProviderProfile from "./provider/Profile/ProviderProfilePage";
import ProviderEditProfilePage from "./provider/EditProfile/ProviderEditProfilePage";
import {useStore} from "../stores/RootStore";
import UnavailablePage from "./provider/Unavailable/UnavailablePage";
import {CircularLoading} from "../utils/components/CircularLoading";


const AppRoutes = () => {

  const { userStore } = useStore();

  let provider = LoginStore.isProvider();
  let admin = LoginStore.isAdmin();

  // Get current user
  let user = userStore.getCurrentUser();

  // Loading
  if (user === undefined) {
      return (
          <CircularLoading />
      )
  }

  let routeNodes = []

  // Routes available for all
  routeNodes.push(
      <Route path={ROUTES.provider.profile}
              element={<ProviderProfile/>} key={0}/>
  )

  if (provider) {
      if (!user.isAvailable) {
          routeNodes.push(
              <Route path="*"
                      element={<UnavailablePage/>} key={1}/>
          )
      } else {
          routeNodes.push(
              <Route path={ROUTES.provider.home}
                      element={<ProviderHomePage/>} key={1}/>
          )

          routeNodes.push(
              <Route path={ROUTES.provider.editProfile}
                      element={<ProviderEditProfilePage/>} key={2}/>
          )

          routeNodes.push(
            <Route
              path={ROUTES.provider.myServices}
              element={<ProviderMyServicesPage key={3} />}
            />
          )
      }

  } else if (admin) {
      routeNodes.push(
          <Route path={ROUTES.admin.home}
                  element={<AdminUnapprovedProvidersPage/>} key={1}/>
      )

      routeNodes.push(
          <Route path={ROUTES.admin.newProviders}
                  element={<AdminUnapprovedProvidersPage/>} key={2}/>
      )
  } else {
      routeNodes.push(
          <Route path={ROUTES.customer.home}
                  element={<CustomerHomePage/>} key={1}/>
      )
  }

  return (
      <Routes>
          {routeNodes}
      </Routes>
  )
}

export default observer(AppRoutes);
