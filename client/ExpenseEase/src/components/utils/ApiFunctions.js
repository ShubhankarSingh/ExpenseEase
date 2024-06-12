import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080"
})

async function homePage(){

    console.log("Home API")
    try{
        const response = await api.get("/expense/home");
        return response.data
    }catch(error){
        console.log("Error fetching data", error)
        return ''
    }

}

export default api;
export { homePage };