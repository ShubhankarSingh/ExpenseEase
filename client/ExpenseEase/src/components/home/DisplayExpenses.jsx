import React, { useEffect, useState } from 'react'
import { getExpensesByMonth, deleteExpense, getAllExpenses } from "../utils/ApiFunctions";
import {Link} from "react-router-dom"

export const DisplayExpenses = () => {

    const[expenses, setExpenses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const[month, setMonth] = useState("0");
    const [months, setMonths] = useState([]);

    useEffect(()=>{
        const currentMonth = new Date().getMonth() + 1; 
        const monthOptions = [
            { value: 0, name: "This Year" },
            { value: 1, name: "January" },
            { value: 2, name: "February" },
            { value: 3, name: "March" },
            { value: 4, name: "April" },
            { value: 5, name: "May" },
            { value: 6, name: "June" },
            { value: 7, name: "July" },
            { value: 8, name: "August" },
            { value: 9, name: "September" },
            { value: 10, name: "October" },
            { value: 11, name: "November" },
            { value: 12, name: "December" }
        ];

        setMonths(monthOptions.filter(option => option.value ===0 || option.value <= currentMonth))
    }, []);

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
                            {months.map((month) => (
                               <option key={month.value} value={month.value}>{month.name}</option>
                            ))}
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
