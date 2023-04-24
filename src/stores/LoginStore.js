import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing Login functionality
 */
class LoginStore {

    authStatus = false;

    provider = false;

    admin = false;

    emailVerified = false;

    constructor() {
        makeAutoObservable(this);
        this.setAuthStatus();
    }


    // Login user
    login(authToken) {
        localStorage.setItem("user", authToken);

        return this.setAuthStatus();
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

    isVerified(customerId, emailToken) {
        this.verifyEmail(customerId, emailToken);
        return this.emailVerified;
    }

    verifyEmail(customerId, emailToken) {
        axiosConfig().get(`/customer/verify/${customerId}/${emailToken}`).then(data => {
            this.emailVerified =  data.data.status
        })
    }

}

const LoginStoreInstance = new LoginStore()
export default LoginStoreInstance;
