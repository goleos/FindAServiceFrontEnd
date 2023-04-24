import {makeAutoObservable} from "mobx";

/**
 * Class for managing the profile of a provider
 */
export default class ProviderProfileEditStore {

    firstName = undefined;
    lastName = undefined;
    email = undefined;
    address = undefined;
    description = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }


    getAddress() {
        return this.address;
    }

    getDescription() {
        return this.description;
    }

    setProviderInfo(provider) {
        this.firstName = provider.firstName
        this.lastName = provider.lastName
        this.email = provider.email
        this.address = provider.address
        this.description = provider.description
    }
}
