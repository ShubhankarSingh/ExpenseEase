import React, { useState } from 'react'
import { addExpense } from '../utils/ApiFunctions';

export const AddExpense = () => {

  const [newExpense, setNewExpense] = useState({
    expenseName:"",
    amount:"",
    expenseDate: "",
    description: "",
    category: ""
  })

  const handleInputChange = (e) =>{

    const {name, value} = e.target;
    setNewExpense({...newExpense, [name]:value})
  }  

  const handleFormSubmit = async () =>{

    const result = await addExpense(newExpense.expenseName, newExpense.amount, newExpense.expenseDate,
                                    newExpense.description, newExpense.category);
    
  }

  return (
    <>
    <div>AddExpense</div>

    <form action="/" onSubmit={handleFormSubmit}>

        <div className="mb-3">
            <label htmlFor="expenseName" className='form-label'>Name</label>
            <input type="text" name="Expense Name" id="expenseName" className='form-control' onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="Amount" className='form-label'>Amount</label>
            <input type="number" name="Amount" id="Amount" className='form-control' onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="expenseDate" className='form-label'>Expense Date</label>
            <input type="date" name="Expense Date" id="expenseDate" className='form-control' onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className='form-label'>Description</label>
            <input type="text" name="Description" id="description" className='form-control' onChange={handleInputChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="category" className='form-label'>Category Id</label>
            <input type="number" name="expense" id="category" className='form-control' onChange={handleInputChange}/>
        </div>

    </form>

    </>

  )
}
