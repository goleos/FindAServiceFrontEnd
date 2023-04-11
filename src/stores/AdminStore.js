import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing current user state and information
 */
export default class AdminStore {

    unapprovedProviders = undefined

    constructor() {
        makeAutoObservable(this);
    }

    // Get current user information
    getUnapprovedProviders() {
        if (this.unapprovedProviders === undefined) {
            this.requestUnapprovedProviders();

            return undefined;
        } else {
            return this.unapprovedProviders;
        }
    }

    // Request current user information from the backend
    requestUnapprovedProviders() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/provider/unapproved').then(data => {
            runInAction(() => {
                this.unapprovedProviders = data.data;
                this.requested = false
            })
        })
    }
}
