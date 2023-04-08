import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";
import LoginStore from "./LoginStore";
import {PROFILE_IMAGE} from "../utils/helpers/constants";

/**
 * Class for managing current user state and information
 */
export default class UserStore {

    currentUser = undefined

    requested = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Get current user information
    getCurrentUser() {
        if (this.currentUser === undefined) {
            this.requestCurrentUser();

            return undefined;
        } else {
            return this.currentUser;
        }
    }

    // Request current user information from the backend
    requestCurrentUser() {
        if (LoginStore.isAdmin()) {
            this.currentUser = {
                firstName: "Admin",
                lastName: "",
                profileImage: PROFILE_IMAGE
            }
            return
        }

        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        let route = LoginStore.isProvider() ? '/provider/currentProvider' : 'customer/currentCustomer'

        axiosConfig().get(route).then(data => {
            runInAction(() => {
                this.currentUser = data.data;
                this.requested = false
            })
        })
    }
}
