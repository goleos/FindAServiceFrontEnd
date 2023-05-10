import { observer } from "mobx-react";
import LoginStore from "../stores/LoginStore";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../utils/helpers/constants";
import ProviderHomePage from "./provider/Home/ProviderHomePage";
import AdminUnapprovedProvidersPage from "./admin/UnapprovedProviders/AdminUnapprovedProvidersPage";
import CustomerHomePage from "./customer/Home/CustomerHomePage";
import ProviderMyServicesPage from "./provider/MyServices/ProviderMyServicesPage";
import ProviderProfile from "./provider/Profile/ProviderProfilePage";
import ProviderEditProfilePage from "./provider/EditProfile/ProviderEditProfilePage";
import {useStore} from "../stores/RootStore";
import UnavailablePage from "./provider/Unavailable/UnavailablePage";
import {CircularLoading} from "../utils/components/CircularLoading";
import ServiceInfoPage from "./service/ServiceInfo/ServiceInfoPage";
import CustomerExploreServicesPage from "./customer/ExploreServices/CustomerExploreServicesPage";
import ServiceRequestInfoPage from "./service/ServiceRequest/ServiceRequestInfoPage";
import ServiceRequestsPage from "./service/ServiceRequests/ServiceRequestsPage";
import SearchPage from "./search/SearchPage";
import AdminHomePage from "./admin/Home/AdminHomePage";

/**
 * Routing for logged in users
 * @returns {JSX.Element}
 * @constructor
 */
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
              element={<ProviderProfile/>} key={"profile_page"}/>
  )

  routeNodes.push(
    <Route path={ROUTES.service.serviceInfo}
           element={<ServiceInfoPage/>} key={"service_info_page"}/>
  )

  routeNodes.push(
    <Route path={ROUTES.search}
           element={<SearchPage/>} key={"search_page"}/>
  )

  if (provider) {
      if (!user.isAvailable) {
          routeNodes.push(
              <Route path="*"
                      element={<UnavailablePage/>} key={"unavailable_page"}/>
          )
      } else {
          routeNodes.push(
              <Route path={ROUTES.provider.home}
                      element={<ProviderHomePage/>} key={"provider_home"}/>
          )

          routeNodes.push(
              <Route path={ROUTES.provider.editProfile}
                      element={<ProviderEditProfilePage/>} key={"edit_profile"}/>
          )

          if (user.isApproved) {
            routeNodes.push(
              <Route path={ROUTES.provider.myServices}
                     element={<ProviderMyServicesPage key={"myServices_page"} />}
              />
            )

            routeNodes.push(
              <Route path={ROUTES.service.myRequests}
                     element={<ServiceRequestsPage/>} key={"myRequests_page"}/>
            )

            routeNodes.push(
              <Route path={ROUTES.service.serviceRequest}
                     element={<ServiceRequestInfoPage/>} key={"service_request_page"}/>
            )
          } else {
            routeNodes.push(
              <Route path={ROUTES.provider.myServices}
                     element={<ProviderHomePage key={"unapproved_myServices"} />}
              />
            )

            routeNodes.push(
              <Route path={ROUTES.service.myRequests}
                     element={<ProviderHomePage/>} key={"unapproved_myRequests"}/>
            )

            routeNodes.push(
              <Route path={ROUTES.service.serviceRequest}
                     element={<ProviderHomePage/>} key={"unapproved_home"}/>
            )
          }

      }

  } else if (admin) {
      routeNodes.push(
          <Route path={ROUTES.admin.home}
                  element={<AdminHomePage/>} key={"admin_home"}/>
      )

      routeNodes.push(
          <Route path={ROUTES.admin.newProviders}
                  element={<AdminUnapprovedProvidersPage/>} key={"admin_new_providers"}/>
      )
  } else {
      routeNodes.push(
          <Route path={ROUTES.customer.home}
                  element={<CustomerHomePage/>} key={"customer_home"}/>
      )

      routeNodes.push(
          <Route path={ROUTES.customer.services}
                 element={<CustomerExploreServicesPage/>} key={"customer_explore"}/>
      )

      routeNodes.push(
          <Route path={ROUTES.service.myRequests}
                 element={<ServiceRequestsPage/>} key={"customer_myRequests"}/>
      )

      routeNodes.push(
        <Route path={ROUTES.service.serviceRequest}
               element={<ServiceRequestInfoPage/>} key={"customer_request_info"}/>
      )
  }

  return (
      <Routes>
          {routeNodes}
      </Routes>
  )
}

export default observer(AppRoutes);
