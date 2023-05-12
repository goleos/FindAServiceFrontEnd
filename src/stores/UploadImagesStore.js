
import { makeAutoObservable, runInAction } from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

/**
 * Class for uploading multiple service images
 */
export default class UploadImagesStore {

  // The actual image data
  images = undefined

  // The url of the image for displaying a
  // preview of it on the frontend
  imageUrls = undefined

  constructor() {
    makeAutoObservable(this);
  }

  getImageUrls() {
    return this.imageUrls
  }

  setImageUrls(imageUrls) {
    runInAction(() => {
      this.imageUrls = imageUrls;
    })
  }

  setImages(images) {
    runInAction(() => {
      this.images = images;
    })
  }

  resetImages() {
    this.images = undefined
    this.imageUrls = undefined
  }

  async uploadImages (serviceId) {
    const filesData = new FormData();

    if (this.images) {
      let i = 1;

      for (const image of this.images) {
        filesData.append(`photo${i}`, image)
        i++;
      }

      return axiosConfig().post(
        `/service/${serviceId}/upload`,
        filesData
      );
    }
  }

}
