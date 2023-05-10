import {makeAutoObservable} from "mobx";
import {formatDateStringISO} from "../utils/helpers/formatDate";

/**
 * Class for editing a service request
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
