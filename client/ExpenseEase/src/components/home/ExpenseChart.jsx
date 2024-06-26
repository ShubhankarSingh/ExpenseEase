import React, { useEffect, useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { getAllExpenses } from "../utils/ApiFunctions";
import { ExpenseBarChart } from "./ExpenseBarChart";

Chart.register(CategoryScale);

export const ExpenseChart = () => {
    const [data, setData] = useState([]);

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

    useEffect(() => {
        const map = new Map();

        data.forEach(({ amount, category: { categoryId, category } }) => {
            if (map.has(categoryId)) {
                map.get(categoryId).amount += amount;
            } else {
                map.set(categoryId, { categoryId, category, amount });
            }
        });

        var result = Array.from(map.values());
        result.sort((a,b) => b.amount - a.amount)  //sort the result by amount
        result = result.slice(0,5)     // slice the array to display only top 5 expenses
        const labels = result.map((data) => data.category);
        const amount = result.map((data) => data.amount);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Expense Chart",
                    data: amount,
                    backgroundColor: ["red", "green", "blue", "orange", "yellow"],
                    borderWidth: 2,
                    barThickness: 100,
                }
            ]
        });

    }, [data]); // Add data as a dependency to run this effect whenever data changes

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Expense Chart",
                data: [],
                backgroundColor: ["red", "green", "blue", "orange", "brown", "yellow"],
                borderWidth: 2
            }
        ]
    });

    return (
        <div>
            <ExpenseBarChart chartData={chartData}/>
        </div>
    );
};
