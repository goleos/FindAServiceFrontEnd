import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";


export default class ServiceRequestsStore {

  serviceRequests = undefined
  requested = false
  serviceId = null

  constructor() {
    makeAutoObservable(this);
  }

  // Get provider information
  getServiceRequests(serviceId = null) {
    if (this.serviceRequests === undefined || this.serviceId !== serviceId) {
      this.requestServiceRequests(serviceId);

      return undefined;
    } else {
      return this.serviceRequests;
    }
  }

  // Request provider information from the backend
  requestServiceRequests(serviceId) {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }

    const path = serviceId ? `/serviceRequest?serviceId=${serviceId}` : '/serviceRequest'

    axiosConfig().get(path).then(data => {
      runInAction(() => {
        this.serviceRequests = data.data;
        this.serviceId = serviceId;
        this.requested = false
      })
    })
  }
}
