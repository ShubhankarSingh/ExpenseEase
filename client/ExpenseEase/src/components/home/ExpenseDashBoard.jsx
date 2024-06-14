import React, { useEffect, useState } from 'react'
import { getAllExpenses } from '../utils/ApiFunctions'

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

  expenses.map((expense)=>{
    console.log("My: "+ expense.expenseId)
  });

  return (
    <> 
        {isLoading ? 
            ( <h1>Loading Expenses...</h1> ) : 
                ( 
            <table>
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {expenses.map((expense)=>(
                
                    <tr key={expense.expenseId}>
                        <td>{expense.expenseName}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                    </tr>

                ))}
                </tbody>
                
            </table>
        )}
    </>

  )
}

export default ExpenseDashBoard