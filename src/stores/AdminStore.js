import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing admin actions
 */
export default class AdminStore {

    unapprovedProviders = undefined

    constructor() {
        makeAutoObservable(this);
    }

    // Get unapproved providers
    getUnapprovedProviders() {
        if (this.unapprovedProviders === undefined) {
            this.requestUnapprovedProviders();

            return undefined;
        } else {
            return this.unapprovedProviders;
        }
    }

    // Request unapproved providers from backend
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
