// import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

export default class ServiceStore {
  services = undefined;

  requested = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Get provider profile updates
  getServices(providerID) {
    if (this.services === undefined) {
      this.requestServices(providerID);

      return undefined;
    } else {
      return this.services;
    }
  }

  requestServices(provider = null, category = null, area = null) {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }

    axiosConfig()
      .get("/service/services", {
        params: { provider: provider, category: category, area: area },
      })
      .then((data) => {
        runInAction(() => {
          this.services = data.data;
          this.requested = false
        });
      });
  }

  createService(service) {
    axiosConfig()
      .post("/service/create", service)
      .then((data) => {
        runInAction(() => {
          console.log(data);
        });
      });
  }
}
