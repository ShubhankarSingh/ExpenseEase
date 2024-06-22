import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getAllExpenses } from "../utils/ApiFunctions"
import { ExpenseBarChart } from "./ExpenseBarChart"


Chart.register(CategoryScale);

export const ExpenseChart = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        // Function to fetch all expenses
        const fetchAllExpenses = async () => {
            try {
                
                const apiResponse = await getAllExpenses();

                // Transforming the API response to match the chart data structure
                const transformedData = apiResponse.map((expense) => ({
                    category: expense.category,
                    amount: expense.amount
                }));

                // Converting Object data to Array
                setData(Object.values(transformedData));
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchAllExpenses();
    }, []); 

    
    // useEffect(()=>{
    //     setChartData({
    //         labels: data.map((data) => data.category.category),
    //         datasets: [
    //             {
    //                 label: "Expense Chart",
    //                 data: data.map((data)=> data.amount),
    //                 borderWidth: 2
    //             }
    //         ] 
    //     });
    // },[data]);

    const [chartData, setChartData] = useState({
        labels: ['Transportation', 'Food', 'Food', 'Travel', 'Rent', 'Transportation', 'Groceries', 'Clothing'],
        datasets: [
            {
                label: "Expense Chart",
                data: [78, 450, 3498, 8500, 12500, 500, 665, 2400],
                backgroundColor: ["red", "green","blue","orange","brown","yellow","black","pink"],
                borderWidth: 2
            }
        ]
    });

    // const labels = data.map((data) => data.amount)

    console.log(chartData.labels)

    return (
        <div>
            {/* <ul>
                {data.map((data, index) => (
                    <li key={index}>
                        <p>Category: {data.category.category}</p>
                        <p>Amount: {data.amount}</p>
                    </li>
                ))}
            </ul> */}
        
            <ExpenseBarChart chartData={chartData}/>
        </div>
    )
}
