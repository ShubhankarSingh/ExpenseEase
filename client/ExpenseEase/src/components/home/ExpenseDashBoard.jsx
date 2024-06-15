import React, { useEffect, useState } from 'react'
import { deleteExpense, getAllExpenses } from '../utils/ApiFunctions'
import Home from './Home'

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
     <button className='btn btn-md btn-primary mt-2'>Add Expense</button>
      {isLoading ? 
        (<h1>Loading Expenses...</h1>) : 
        ( 
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-12"> {/* Changed to col-md-12 for full width */}
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Expense</th>
                      <th>Amount</th>
                      <th>Description</th>
                      {/* <th>Created Date</th> */}
                      <th>Action Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.expenseId}>
                        <td>{expense.expenseId}</td>
                        <td>{expense.expenseName}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        {/* <td>{expense.createdDate}</td> */}
                        <td>
                            <button className='btn btn-outline-dark btn-md px-3 mx-2'>Edit</button>
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