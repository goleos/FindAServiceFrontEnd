import {makeAutoObservable, runInAction} from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for managing the profile of a provider
 */
export default class ProviderProfileEditStore {

    firstName = undefined;
    lastName = undefined;
    email = undefined;
    address = undefined;
    description = undefined;
    profileImage = undefined;
    profileImageUrl = undefined;

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

    getProfileImageUrl() {
      return this.profileImageUrl;
    }

    setProviderInfo(provider) {
      runInAction(() => {
        this.firstName = provider.firstName
        this.lastName = provider.lastName
        this.email = provider.email
        this.address = provider.address
        this.description = provider.description
        this.profileImageUrl = provider.profileImage
      })
    }

    setProfileImageUrl(profileImageUrl) {
      runInAction(() => {
        this.profileImageUrl = profileImageUrl;
      })
    }

    setProfileImage(profileImage) {
      runInAction(() => {
        this.profileImage = profileImage;
      })
    }

    uploadProfileImage () {
      const filesData = new FormData();
      filesData.append('profileImage', this.profileImage)
      return axiosConfig().post( '/provider/editProfile/upload', filesData);
    }
}
