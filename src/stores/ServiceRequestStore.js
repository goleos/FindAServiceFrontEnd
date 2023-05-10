import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing a particular service request
 */
export default class ServiceRequestStore {

  requestUpdates = undefined
  serviceRequest = undefined
  requested = false
  requestId = undefined

  constructor(id) {
    makeAutoObservable(this);

    this.requestId = id
  }

  // Get provider information
  getRequestUpdates() {
    if (this.requestUpdates === undefined) {
      this.requestRequestUpdates();

      return undefined;
    } else {
      return this.requestUpdates;
    }
  }

  // Request provider information from the backend
  requestRequestUpdates() {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }


    axiosConfig().get(`/serviceRequest/update/${this.requestId}`).then(data => {
      runInAction(() => {
        this.requestUpdates = data.data;
        this.requested = false
      })
    })
  }

  // Get provider information
  getServiceRequest() {
    if (this.serviceRequest === undefined) {
      this.requestServiceRequest();

      return undefined;
    } else {
      return this.serviceRequest;
    }
  }

  // Request provider information from the backend
  requestServiceRequest() {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }


    axiosConfig().get(`/serviceRequest/${this.requestId}`).then(data => {
      runInAction(() => {
        this.serviceRequest = data.data;
        this.requested = false
      })
    })
  }
}
