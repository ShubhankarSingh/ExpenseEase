import React, { useEffect, useState } from 'react'
import { addExpense, getExpenseCategories } from '../utils/ApiFunctions';
import { useNavigate, Link } from "react-router-dom";

export const AddExpense = () => {

  const initialFormState = {
    expenseName:"",
    amount:"",
    expenseDate: "",
    description: "",
    category: ""
  };  

  const [newExpense, setNewExpense] = useState(initialFormState)
  const[categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    getExpenseCategories().then((data)=>{
        setCategories(data);
    });
  },[])

  const handleInputChange = (e) =>{

    const {name, value} = e.target;
    setNewExpense({...newExpense, [name]:value})
  }  

  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    console.log("Inside handleform submit")

    const date = new Date(newExpense.expenseDate);
    const formattedDate = date.toISOString().split('T')[0];

    const result = await addExpense(newExpense.expenseName, newExpense.amount, formattedDate,
                                    newExpense.description, newExpense.categoryId);
    if(result !== undefined){
        console.log("A new expense was added")
        setNewExpense(initialFormState)
        navigate("/expense-dashboard")

    }else{
        console.log("Error adding expense")
    }
  }

  categories.map((category)=>{
    console.log(category);
  })

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="text-center">Add Expense</h2>
            <form action="/" onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="expenseName" className='form-label fs-5 text-start d-block'>Name</label>
                <input type="text" name="expenseName" id="expenseName" className='form-control fs-5' value={newExpense.expenseName} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className='form-label fs-5 text-start d-block'>Amount</label>
                <input type="number" name="amount" id="amount" className='form-control fs-5' value={newExpense.amount} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="expenseDate" className='form-label fs-5 text-start d-block'>Expense Date</label>
                <input type="date" name="expenseDate" id="expenseDate" className='form-control fs-5' value={newExpense.expenseDate} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className='form-label fs-5 text-start d-block'>Description</label>
                <input type="text" name="description" id="description" className='form-control fs-5' value={newExpense.description} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
              <label htmlFor="category" className='form-label fs-5 text-start d-block'>Category</label>
              <select className="form-select" name="category" id="category" aria-label="Default select example" value={newExpense.category} onChange={handleInputChange} >
                {categories.map((category)=>(
                    <option key={category.categoryId} value={category.category}>{category}</option>
                ))}
                </select>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="categoryId" className='form-label fs-5 text-start d-block'>Category Id</label>
                <input type="number" name="categoryId" id="categoryId" className='form-control fs-5' value={newExpense.categoryId} onChange={handleInputChange} />
              </div> */}
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-primary mx-2">Add Expense</button>
                <Link to={"/expense-dashboard"} className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  
}