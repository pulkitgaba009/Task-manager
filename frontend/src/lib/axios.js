import axios from "axios";

// in production there is no localhost so we have to make it dynamic
const BASE_URL = import.meta.env.MODE === "developement" ? "http://localhost:3000/api" : "/api"

const api = axios.create({
    baseURL : BASE_URL
})

export default api;