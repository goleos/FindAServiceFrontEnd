import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import ServiceStore from "./ServiceStore";
import AdminStore from "./AdminStore";
import ProviderProfileEditStore from "./ProviderProfileEditStore";
import ServiceRequestsStore from "./ServiceRequestsStore";
import ServiceRequestEditStore from "./ServiceRequestEditStore";
import UploadImagesStore from "./UploadImagesStore";
import NotificationsStore from "./NotificationsStore";
import ReviewStore from "./ReviewStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
    serviceStore: new ServiceStore(),
    userStore: new UserStore(),
    adminStore: new AdminStore(),
    providerProfileEditStore: new ProviderProfileEditStore(),
    serviceRequestsStore: new ServiceRequestsStore(),
    serviceRequestEditStore: new ServiceRequestEditStore(),
    uploadImagesStore: new UploadImagesStore(),
    notificationsStore: new NotificationsStore(),
    reviewStore: new ReviewStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
