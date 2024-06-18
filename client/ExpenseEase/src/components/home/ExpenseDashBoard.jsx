import React, { useEffect, useState } from 'react'
import { deleteExpense, getAllExpenses } from '../utils/ApiFunctions'
import Home from './Home'
import {Link} from 'react-router-dom'

const ExpenseDashBoard = () => {

  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    fetchAllExpenses();
  },[])  

  const fetchAllExpenses = async () =>{
    setIsLoading(true)
    const result = await getAllExpenses()
    setExpenses(result)
    setIsLoading(false)
  }

  const handleClick = async (expenseId) =>{
        console.log("Inside hande delete expense")
        const result = await deleteExpense(expenseId)
        if(result ==""){
            console.log(`Expense with id ${expenseId} deleted`)
            fetchAllExpenses()
        }else{
            console.log("Error deleting expenses")
        }

  }

  return (
    <> 
    <Home/>
     <Link to={"/add-expense"} className='btn btn-md btn-primary mt-2 p-2'>Add Expense</Link>
      {isLoading ? 
        (<h1>Loading Expenses...</h1>) : 
        ( 
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-12"> 
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
                            <Link to={`/edit-expense/${expense.expenseId}`} className='btn btn-outline-dark btn-md px-3 mx-2' >Edit</Link>
                            <button className='btn btn-danger btn-md px-3' onClick={()=> handleClick(expense.expenseId)}>Delete</button>
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


export default ExpenseDashBoard