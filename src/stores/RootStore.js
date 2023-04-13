import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import ServiceStore from "./ServiceStore";
import AdminStore from "./AdminStore";
import ProviderProfileEditStore from "./ProviderProfileEditStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
  serviceStore: new ServiceStore(),
  userStore: new UserStore(),
  adminStore: new AdminStore(),
  providerProfileEditStore: new ProviderProfileEditStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
};
