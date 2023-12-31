import axios from "axios"

const config = {
    baseURL:  import.meta.env.VITE_REACT_APP_INSTALITE_API_BASE_URL,
    timeout: 5000,
}

const instaliteApi = axios.create(config);


export default instaliteApi
