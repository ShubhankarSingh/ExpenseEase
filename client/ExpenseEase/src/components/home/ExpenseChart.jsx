import React, { useEffect, useState } from 'react'
import {Bar} from "react-chartjs-2"
import { getAllExpenses } from "../utils/ApiFunctions"

export const ExpenseChart = () => {

    const initialChartState = {
        category: {categoryId: "", category: ""},
        amount: ""
    }

    const [expenses, setExpenses] = useState([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // Function to fetch all expenses
        const fetchAllExpenses = async () => {
            try {
                
                const apiResponse = await getAllExpenses();
                // console.log(apiResponse)
                // Transforming the API response to match the chart data structure
                const transformedData = apiResponse.map((expense) => ({
                    category: expense.category,
                    amount: expense.amount
                }));

                // console.log("transformed data: ", transformedData)
                setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchAllExpenses();
    }, []); 

    console.log(typeof(chartData))
    console.log(Array.isArray(chartData));
    console.log(chartData)
    // chartData.map((data, index)=>{
    //     console.log("Chart: ", data);
    // })

    return (
        <div>
            
            {/* <Bar 
                data={"data"}
                options={{
                    plugins: {
                        title:{
                            display: true,
                            text: "Top 5 spends"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            /> */}
        </div>
    )
}
