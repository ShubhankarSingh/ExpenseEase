import React, { useEffect, useState } from 'react'
import { getExpensesByMonth, deleteExpense, getAllExpenses } from "../utils/ApiFunctions";
import {Link} from "react-router-dom"

export const DisplayExpenses = () => {

    const[expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const[month, setMonth] = useState("0");

    useEffect(()=>{
        if(month != 0){
            fetchAllExpensesByMonth(month);
        }else{
            fetchAllExpenses();
        }
    },[month])

    const fetchAllExpensesByMonth = async(month)=>{
        setIsLoading(true)
        const result = await getExpensesByMonth(month)
                    
        const updatedExpense = result.map((expense)=>{

            if(typeof expense.createdDate === 'number'){
                const date = new Date(expense.createdDate)
                //padStart(2,'0) ensures it is at least two characters long. Pads the day with leading zeros if it's one character
                const formmatedDate = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`
                return {...expense, createdDate: formmatedDate}
              }
              return expense
        })
                
        setExpenses(updatedExpense)  
        setIsLoading(false)
    }

    const fetchAllExpenses = async () =>{
        setIsLoading(true)
        const result = await getAllExpenses()
    
        const updatedExpense = result.map((expense)=>{
          if(typeof expense.createdDate === 'number'){
            const date = new Date(expense.createdDate)
            const formmatedDate = `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`
            return {...expense, createdDate: formmatedDate}
          }
          return expense
        }) 
    
        setExpenses(updatedExpense)
        setIsLoading(false)
    }

    const handleChange = (e) =>{
        setMonth(e.target.value);
    }

    const handleClick = async (expenseId) =>{
        console.log("Inside hande delete expense")
        const result = await deleteExpense(expenseId)
        if(result ==""){
            console.log(`Expense with id ${expenseId} deleted`)
            if(month==0){
                fetchAllExpenses()
            }else{
                fetchAllExpensesByMonth(month)
            }
        }else{
            console.log("Error deleting expenses")
        }
  }

  return (
    <>
      <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mt-5">
                <div>
                    <Link to={"/add-expense"} className='btn btn-md btn-primary m-2 p-2 rounded-0'>Add Expense</Link>
                    <Link to={`/expense-chart/${month}`} className='btn btn-md btn-success m-2 p-2 rounded-0'>Expense Report</Link>
                </div>
                <div className="d-flex align-items-center">
                    <form className="d-flex align-items-center">
                        <label htmlFor="month" className='form-label fs-5 text-start me-3'>Select</label>
                        <select className="form-select custom-select" size={1} name="month" id="month" onChange={handleChange} value={month}>
                            <option value="0">This Year</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
      {isLoading ? 
        (<h1>Loading Expenses...</h1>) : 
        ( 
          <div className="container mt-2">
            <div className="row justify-content-center">
              <div className="col-12"> 
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Expense</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Created Date</th>
                      <th>Category</th>
                      <th>Action Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.expenseId}>
                        <td>{expense.expenseName}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{expense.createdDate}</td>
                        <td>{expense.category.category}</td>
                        <td>
                            <Link to={`/edit-expense/${expense.expenseId}`} className='btn btn-outline-dark btn-md px-3 mx-2 rounded-0' >Edit</Link>
                            <button className='btn btn-danger btn-md px-3 rounded-0' onClick={()=> handleClick(expense.expenseId)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}
