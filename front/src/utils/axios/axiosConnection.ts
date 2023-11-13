import axios from "axios"

const instaliteUrl = "http://localhost:8080/api/"

export const instaliteApi = axios.create({
    baseURL: instaliteUrl,
    timeout: 1000,
})