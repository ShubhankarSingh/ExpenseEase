import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080"
})

async function homePage(){

    console.log("Home API")
    const response = await api.get("/expense/")
    return response.data
}

export default api;
export { homePage };