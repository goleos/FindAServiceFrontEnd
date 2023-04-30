// import axios from "axios";
import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing services
 */
export default class ServiceStore {

    providerID = null;
    searchQuery = null;
    services = undefined;
    requested = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Get provider profile updates
    getServices(providerID= null) {
        if (this.services === undefined || this.providerID !== providerID) {
            this.requestServices(providerID);

            return undefined;
        } else {
            return this.services;
        }
    }

    requestServices(provider = null, category = null, area = null, searchQuery = null) {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            });
        } else {
            return;
        }

        axiosConfig()
            .get("/service/services", {
                params: {
                  provider: provider,
                  category: category,
                  area: area,
                  searchQuery: searchQuery
                },
            })
            .then((data) => {
                runInAction(() => {
                    this.services = data.data;
                    this.providerID = provider;
                    this.searchQuery = searchQuery;
                    this.requested = false;
                });
            });
    }

    updateService(service) {
        axiosConfig()
            .post("/service/update", service, { params: { service_id: service.serviceID } })
            .then((data) => {
                runInAction(() => {
                    console.log(data);
                });
            });
    }

    deleteService(serviceID) {
        axiosConfig()
            .delete("/service/delete", { params: { service_id: serviceID } })
            .then((data) => {
                runInAction(() => {
                    console.log(data);
                });
            });
    }
}
