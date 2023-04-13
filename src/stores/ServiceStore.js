// import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

export default class ServiceStore {
  services = [];

  constructor() {
    makeAutoObservable(this);
  }

  getServices(provider = null, category = null, area = null) {
    axiosConfig()
      .post("/service/services", arguments)
      .then((data) => {
        runInAction(() => {
          this.services = data.data;
        });
      });
  }
}
