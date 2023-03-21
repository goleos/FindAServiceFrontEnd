import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

/**
 * Class for managing Login functionality
 */
class LoginStore {

    authStatus = false;

    constructor() {
        makeAutoObservable(this);
        this.setAuthStatus();
    }


    // Login user
    login(authToken) {
        localStorage.setItem("user", authToken);

        this.setAuthStatus();
    }

    // Logout user
    logout() {
        localStorage.removeItem("user");

        this.authStatus = false;
    }

    // Check if user is logged in
    isAuth() {
        return this.authStatus;
    }

    // Return token
    getToken() {
        return localStorage.getItem('user');
    }

    // Set authentication status
    setAuthStatus() {
        let tokenOk = this.checkToken();
        if (tokenOk) {
            this.authStatus = true;

            return true;

        } else {
            this.authStatus = false;

            return false;
        }
    }

    // Check if token is ok
    checkToken() {
        try {
            jwt_decode(this.getToken());
            return true;
        } catch (err) {
            return false;
        }
    }
}

const LoginStoreInstance = new LoginStore()
export default LoginStoreInstance;
