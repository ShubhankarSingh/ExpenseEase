import React, { useEffect, useState } from 'react'
import { addExpense, getExpenseCategories } from '../utils/ApiFunctions';
import { useNavigate, Link } from "react-router-dom";

export const AddExpense = () => {

  const initialFormState = {
    expenseName:"",
    amount:"",
    createdDate: "",
    description: "",
    category: {categoryId: "", category: ""}
  };  

  const [newExpense, setNewExpense] = useState(initialFormState)
  const[categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    getExpenseCategories().then((data)=>{
        // console.log("add data: ", data)
        // const allCategories = data.map(categoryObj => categoryObj.category)
        setCategories(data);
        if(data.length > 0){
          setNewExpense(prevState =>({
            ...prevState,
            category: data[0]
          }));
        }
    });
  },[])

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    setNewExpense({...newExpense, [name]:value})
  }  

  const handleCategoryChange = (e) =>{
    const selectedCategory = categories.find(category => category.category === e.target.value);
    setNewExpense({...newExpense, category: selectedCategory })
  }

  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    const [year, month, date] = newExpense.createdDate.split('-');
    const formattedDate = `${date}-${month}-${year}`;

    const result = await addExpense(newExpense.expenseName, newExpense.amount, formattedDate,
                                    newExpense.description, newExpense.category);
    if(result !== undefined){
        console.log("A new expense was added")
        setNewExpense(initialFormState)
        navigate("/all-expenses")

    }else{
        console.log("Error adding expense")
    }
  }

  // categories.map((category)=>{
  //   console.log("All: ", category);
  // })

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
                <label htmlFor="createdDate" className='form-label fs-5 text-start d-block'>Expense Date</label>
                <input type="date" name="createdDate" id="createdDate" className='form-control fs-5' value={newExpense.createdDate} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className='form-label fs-5 text-start d-block'>Description</label>
                <input type="text" name="description" id="description" className='form-control fs-5' value={newExpense.description} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
              <label htmlFor="category" className='form-label fs-5 text-start d-block'>Category</label>
              <select className="form-select" name="category" id="category" aria-label="Default select example" value={newExpense.category.category} onChange={handleCategoryChange} >
                {categories.map((category)=>(
                    <option key={category.categoryId} value={category.category}>{category.category}</option>
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