import React from 'react'
import { Bar } from "react-chartjs-2";

export const ExpenseBarChart = ({chartData}) => {
    return (
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "ExpenseChart"
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      );
}
