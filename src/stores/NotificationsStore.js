import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";


export default class NotificationsStore {

  notifications = undefined
  unreadCount = undefined

  constructor() {
    makeAutoObservable(this);
  }

  // Get provider information
  getNotifications() {
    if (this.notifications === undefined) {
      this.requestNotifications();

      return undefined;
    } else {
      return this.notifications;
    }
  }

  // Request provider information from the backend
  requestNotifications() {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }


    axiosConfig().get(`/notification`).then(data => {
      runInAction(() => {
        this.notifications = data.data;
        this.requested = false
      })
    })
  }

  // Get provider information
  getUnreadCount() {
    if (this.unreadCount === undefined) {
      this.requestUnreadCount();

      return undefined;
    } else {
      return this.unreadCount;
    }
  }

  // Request provider information from the backend
  requestUnreadCount() {
    if (!this.requested) {
      runInAction(() => {
        this.requested = true;
      })
    } else {
      return;
    }


    axiosConfig().get(`/notification/unreadCount`).then(data => {
      runInAction(() => {
        this.unreadCount = Number(data.data);
        this.requested = false
      })
    })
  }
}
