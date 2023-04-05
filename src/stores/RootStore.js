import { createContext, useContext } from "react";
import UserStore from "./UserStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}