import { createContext, useContext } from "react";
import UserStore from "./UserStore";
import AdminStore from "./AdminStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
    userStore: new UserStore(),
    adminStore: new AdminStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}