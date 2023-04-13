import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing the profile of a provider
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

    // Get provider information
    getProvider() {
        if (this.provider === undefined) {
            this.requestProvider();

            return undefined;
        } else {
            return this.provider;
        }
    }

    // Request provider information from the backend
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

    // Get provider profile updates
    getProfileUpdates() {
        if (this.profileUpdates === undefined) {
            this.requestProfileUpdates();

            return undefined;
        } else {
            return this.profileUpdates;
        }
    }

    // Request provider profile updates from the backend
    requestProfileUpdates() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/profile-update/${this.providerId}/`).then(data => {
            runInAction(() => {
                this.profileUpdates = data.data;
                this.requested = false
            })
        })
    }
}
