import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing current user state and information
 */
export default class ProviderProfileStore {

    providerId = undefined
    provider = undefined
    requested = false
    profileUpdates = undefined

    constructor(id) {
        makeAutoObservable(this);

        this.providerId = id
    }

    // Get current user information
    getProvider() {
        if (this.provider === undefined) {
            this.requestProvider();

            return undefined;
        } else {
            return this.provider;
        }
    }

    // Request current user information from the backend
    requestProvider() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/provider/${this.providerId}`).then(data => {
            runInAction(() => {
                this.provider = data.data;
                this.requested = false
            })
        })
    }

    // Get current user information
    getProfileUpdates() {
        if (this.profileUpdates === undefined) {
            this.requestProfileUpdates();

            return undefined;
        } else {
            return this.profileUpdates;
        }
    }

    // Request current user information from the backend
    requestProfileUpdates() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/profile_update/${this.providerId}/`).then(data => {
            runInAction(() => {
                this.profileUpdates = data.data;
                this.requested = false
            })
        })
    }
}
