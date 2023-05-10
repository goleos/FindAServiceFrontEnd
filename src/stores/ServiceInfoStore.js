import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing the service information
 */
export default class ServiceInfoStore {

    serviceId = undefined
    service = undefined
    requested = false

    constructor(id) {
        makeAutoObservable(this);

        this.serviceId = id
    }

    // Get provider information
    getService() {
        if (this.service === undefined) {
            this.requestService();

            return undefined;
        } else {
            return this.service;
        }
    }

    // Request provider information from the backend
    requestService() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get(`/service/${this.serviceId}`).then(data => {
            runInAction(() => {
                this.service = data.data;
                this.requested = false
            })
        })
    }
}
