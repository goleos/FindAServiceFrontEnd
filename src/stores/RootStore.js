import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import ServiceStore from "./ServiceStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
  userStore: new UserStore(),
  serviceStore: new ServiceStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
