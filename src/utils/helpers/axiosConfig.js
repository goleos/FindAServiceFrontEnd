import axios from 'axios';
import LoginStore from '../../stores/LoginStore';

// Configure axios to send requests to backend API
// with the Authorization token included
export default function axiosConfig() {

    let options = {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: undefined
    }

    // Add token in the Authorization header
    let token = LoginStore.getToken()
    if (token !== null) {
        options.headers = {'Authorization': 'Bearer ' + token}
    }

    return axios.create(options);
}