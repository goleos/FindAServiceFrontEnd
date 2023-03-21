import {Route, Routes} from 'react-router-dom';
import { ROUTES } from './utils/helpers/constants';
import ProviderLoginPage from './pages/provider/Login/ProviderLoginPage';
import ProviderRegisterPage from './pages/provider/Register/ProviderRegisterPage';
import ProviderHomePage from './pages/provider/Home/ProviderHomePage';
import {theme} from './utils/styles/themeConfig';
import {ThemeProvider} from "@mui/material";
import LoginStore from './stores/LoginStore';
import {observer} from "mobx-react";


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {
          // Route to Login and Register if user is not logged
          LoginStore.isAuth() ?
          <>
            <Route path={ROUTES.home} element={<ProviderHomePage/>} />
          </>
          :
          <>

            <Route path={ROUTES.provider.login} element={<ProviderLoginPage/>} />
            <Route path={ROUTES.provider.register} element={<ProviderRegisterPage />} />
          </>
        }
      </Routes>
    </ThemeProvider>
  );
}

export default observer(App);
