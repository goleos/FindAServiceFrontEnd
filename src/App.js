import {Route, Routes} from 'react-router-dom';
import { ROUTES } from './utils/helpers/constants';
import ProviderLoginPage from './pages/provider/Login/ProviderLoginPage';
import ProviderRegisterPage from './pages/provider/Register/ProviderRegisterPage';
import {theme} from './utils/styles/themeConfig';
import {ThemeProvider} from "@mui/material";
import {observer} from "mobx-react";
import CustomerLoginPage from "./pages/customer/Login/CustomerLoginPage";
import CustomerRegisterPage from "./pages/customer/Register/CustomerRegisterPage";
import AdminLoginPage from "./pages/admin/Login/AdminLoginPage";
import EmailVerificationPage from "./pages/customer/Login/EmailVerificationPage";
import Dashboard from "./pages/Dashboard";
import LoginStoreInstance from "./stores/LoginStore";

// Entrypoint of the app
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {
          // Route to Login and Register if user is not logged
          LoginStoreInstance.isAuth() ?
          <>
            <Route path={ROUTES.home} element={<Dashboard/>} />
          </>
          :
          <>
            <Route path={ROUTES.provider.login} element={<ProviderLoginPage/>} />
            <Route path={ROUTES.provider.register} element={<ProviderRegisterPage />} />
            <Route path={ROUTES.customer.login} element={<CustomerLoginPage/>} />
            <Route path={ROUTES.customer.register} element={<CustomerRegisterPage />} />
            <Route path={ROUTES.admin.login} element={<AdminLoginPage/>} />
            <Route path={ROUTES.customer.verify} element={<EmailVerificationPage/>} />
          </>
        }
      </Routes>
    </ThemeProvider>
  );
}

export default observer(App);
