import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080"
})

async function homePage(){

    try{
        const response = await api.get("/expense/home");
        return response.data
    }catch(error){
        console.log("Error fetching data", error)
        return ''
    }

}

async function addExpense(expenseName, amount, expenseDate, description, category){
    console.log("Inside Add Expense api call")

    const formData = new FormData()
    formData.append("expenseName", expenseName)
    formData.append("amount", amount)
    formData.append("expenseDate", expenseDate)
    formData.append("description", description)
    formData.append("category", category)

    console.log("Form: " + expenseDate)

    try{

        const response = await api.post("/expense/add-expense", formData);
        return response.status === 201;

    }catch(error){
        console.log("Error fetching data", error)
        return ''
    }
}

// API to fetch all the expenses from the DB
async function getAllExpenses(){

    try{
        const response = await api.get("/expense/all-expenses");
        return response.data

    }catch(error){
        console.log("Error fetching expenses", error)
        return ''
    }
}

async function deleteExpense(expenseId){

    console.log("Inside Delete Expense function")

    try{
        const result = await api.delete(`/expense/delete-expense/${expenseId}`)
        return result.data
    }catch(error){
        console.log("Error deleting expense", error)
    }
}

export default api;
export { homePage, addExpense, getAllExpenses, deleteExpense};