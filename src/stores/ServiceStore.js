import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

class Service {
  title = null;
  category = null;
  description;
  price;
  availability;
  areas;
  photos;
}

export default class ServiceStore {
  services = [];

  constructor() {
    makeAutoObservable(this);
  }

  updateMyServicesProvider() {
    axiosConfig()
      .get("/provider/currentproviderservices")
      .then((data) => {
        runInAction(() => {
          this.services = data.data;
          console.log("now");
        });
      });
  }
}
