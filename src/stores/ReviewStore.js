import { makeAutoObservable, runInAction } from "mobx";
import axiosConfig from "../utils/helpers/axiosConfig";

export default class ReviewStore {
    reviews = undefined;
    requested = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Get provider profile updates
    getReviews(serviceID = null) {
        if (this.reviews === undefined) {
            this.requestReviews(serviceID);

            return undefined;
        } else {
            return this.reviews;
        }
    }

    requestReviews(serviceID) {
        if (!this.requested) {
            runInAction(() => {
                this.requested = true;
            });
        } else {
            return;
        }

        axiosConfig()
            .get("/review/reviews", {
                params: {
                    service_id: serviceID,
                },
            })
            .then((data) => {
                runInAction(() => {
                    this.reviews = data.data;
                });
            });
    }
}
