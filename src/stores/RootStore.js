import { createContext, useContext } from "react";
import ProviderStore from "./ProviderStore";

/**
 * Initializing all the stores used for managing app state
 */
export const store = {
    providerStore: new ProviderStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}