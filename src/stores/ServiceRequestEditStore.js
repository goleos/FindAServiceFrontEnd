import {makeAutoObservable} from "mobx";
import {formatDateStringISO} from "../utils/helpers/formatDate";

/**
 * Class for managing the profile of a provider
 */
export default class ServiceRequestEditStore {

  description = undefined;
  bookingTime = undefined;
  customerAddress = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getDescription() {
    return this.description;
  }

  getBookingTime() {
    return this.bookingTime;
  }

  getCustomerAddress() {
    return this.customerAddress;
  }

  setUpdateInfo(serviceRequest) {
    this.description = serviceRequest.description
    this.bookingTime = formatDateStringISO(serviceRequest.bookingTime)
    this.customerAddress = serviceRequest.customerAddress
  }
}
