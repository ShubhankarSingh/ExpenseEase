import React, { useEffect, useState } from 'react'
import { editExpense, getExpenseById, getExpenseCategories } from "../utils/ApiFunctions";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditExpense = () => {

    const initialFormState = {
        expenseName:"",
        amount:"",
        createdDate: "",
        description: "",
        category: {categoryId: "", category: ""}
      };  

      const [expense, setExpense] = useState(initialFormState);
      const[categories, setCategories] = useState([]);
      const {expenseId} = useParams();
      const navigate = useNavigate();
  
    useEffect(()=>{

        getExpenseById(expenseId).then((data)=>{
          const date = new Date(data.createdDate);
          const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
          data.createdDate = adjustedDate.toISOString().split('T')[0];
          setExpense(data);
        })
        getExpenseCategories().then((data)=>{
          setCategories(data);
        });
    }, [expenseId])

    const handleInputChange = (e) =>{

        const {name, value} = e.target;
        setExpense({...expense, [name]:value})

    }

    const handleCategoryChange = (e) =>{
        const selectedCategory = categories.find(category => category.category === e.target.value)
        console.log("SC: ", selectedCategory)
        setExpense({...expense, category: selectedCategory})
    }

    const handleFormSubmit = async (e) =>{
        console.log("Inside edit form submit")
        e.preventDefault()
        
        const [year, month, date] = expense.createdDate.split('-');
        const formattedDate = `${date}-${month}-${year}`;

        console.log("Expense category: ", expense.category)

        const result = await editExpense(expenseId, expense.expenseName, expense.amount, formattedDate,
                                        expense.description, expense.category)
        if(result === 200){
            navigate("/expense-dashboard")
        }
    }


  return (
    <>
    
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="text-center">Update Expense</h2>
            <form action="/" onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="expenseName" className='form-label fs-5 text-start d-block'>Name</label>
                <input type="text" name="expenseName" id="expenseName" className='form-control fs-5' value={expense.expenseName} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className='form-label fs-5 text-start d-block'>Amount</label>
                <input type="number" name="amount" id="amount" className='form-control fs-5' value={expense.amount} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="createdDate" className='form-label fs-5 text-start d-block'>Expense Date</label>
                <input type="date" name="createdDate" id="createdDate" className='form-control fs-5' value={expense.createdDate} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className='form-label fs-5 text-start d-block'>Description</label>
                <input type="text" name="description" id="description" className='form-control fs-5' value={expense.description} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
              <label htmlFor="category" className='form-label fs-5 text-start d-block'>Category</label>
              <select className="form-select" name="category" id="category" aria-label="Default select example" value={expense.category.category} onChange={handleCategoryChange} >
              <option key={expense.category.categoryId} value={expense.category.category}>{expense.category.category}</option>
                {categories.map((category)=>(
                    <option key={category.categoryId} value={category.category}>{category.category}</option>
                ))}
                </select>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="categoryId" className='form-label fs-5 text-start d-block'>Category Id</label>
                <input type="number" name="categoryId" id="categoryId" className='form-control fs-5' value={expense.categoryId} onChange={handleInputChange} />
              </div> */}
              <div className="d-flex justify-content-start">
                <button type="submit" className="btn btn-primary mx-2">Update Expense</button>
                <Link to={"/expense-dashboard"} className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditExpense