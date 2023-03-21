import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing current user state and information
 */
export default class ProviderStore {

    currentProvider = undefined

    requested = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Get current user information
    getCurrentProvider() {
        if (this.currentProvider === undefined) {
            this.requestCurrentProvider();

            return undefined;
        } else {
            return this.currentProvider;
        }
    }

    // Request current user information from the backend
    requestCurrentProvider() {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            })
        } else {
            return;
        }

        axiosConfig().get('/provider/currentProvider').then(data => {
            runInAction(() => {
                this.currentProvider = data.data;
                this.requested = false
            })
        })
    }
}
