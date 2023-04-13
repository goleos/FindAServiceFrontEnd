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

    constructor(id) {
        makeAutoObservable(this);
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    setProviderInfo(provider) {
        this.firstName = provider.firstName
        this.lastName = provider.lastName
        this.email = provider.email
        this.address = provider.address
        this.description = provider.description
    }
}
