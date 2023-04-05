import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

/**
 * Class for managing Login functionality
 */
class LoginStore {

    authStatus = false;

    provider = false;

    admin = false;

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
        let token = this.parseToken();

        if (token !== false) {

            this.provider = token.status === "provider";
            this.admin = token.status === "admin";

            this.authStatus = true;

            return true;

        } else {
            this.authStatus = false;

            return false;
        }
    }

    // Check if token is ok
    parseToken() {
        try {
            return jwt_decode(this.getToken());
        } catch (err) {
            return false;
        }
    }

    isProvider() {
        return this.provider;
    }

    isAdmin() {
        return this.admin;
    }


}

const LoginStoreInstance = new LoginStore()
export default LoginStoreInstance;
