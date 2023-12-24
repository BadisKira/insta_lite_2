import axios from "axios"
import { getItem } from "../localStorage.util"

const token = getItem("token")

const config = {
    baseURL: "http://localhost:8080/api/",
    timeout: 1000,
}

const instaliteApi = axios.create(config)

if (token !== undefined) {
    instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
}

export default instaliteApi
