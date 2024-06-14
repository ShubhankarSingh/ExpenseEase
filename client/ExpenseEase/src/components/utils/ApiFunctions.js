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

async function addExpense(){
    console.log("Add Expense")

    try{

        const response = await api.post("/expense/add-expense");
        return response.data

    }catch(error){
        console.log("Error fetching data", error)
        return ''
    }
}

async function getAllExpenses(){
    console.log("Get all Expenses")

    try{
        const response = await api.get("/expense/all-expenses");
        return response.data

    }catch(error){
        console.log("Error fetching expenses", error)
        return ''
    }
}

export default api;
export { homePage, getAllExpenses };