import axios from "axios"

const apis = {
    development: "http://localhost:4000",
    production: "Only after deploy"
}

const api = axios.create({
    baseURL: apis[process.env.NODE_ENV]
})

export default api