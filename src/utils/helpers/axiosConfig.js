import axios, {AxiosRequestHeaders} from 'axios';
import LoginStore from '../../stores/LoginStore';
import {BACKEND_URL} from "./constants";

// Configure axios to send requests to backend API
// with the Authorization token included
export default function axiosConfig() {
    let options = {
        baseURL: BACKEND_URL,
        headers: undefined
    }

    // Add token in the Authorization header
    let token = LoginStore.getToken()
    if (token !== null) {
        options.headers = {'Authorization': 'Bearer ' + token}
    }

    return axios.create(options);
}