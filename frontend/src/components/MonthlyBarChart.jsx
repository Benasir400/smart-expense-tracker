import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { getExpenses } from "../services/expenseService";

function MonthlyBarChart() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await getExpenses();

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // Group by month
    const grouped = {};

    expenses.forEach((expense) => {

        const month =
            new Date(expense.date)
            .toLocaleString("default", {
                month: "short"
            });

        if (grouped[month]) {

            grouped[month] += Number(expense.amount);

        } else {

            grouped[month] = Number(expense.amount);
        }
    });

    const chartData = [];

    for (let key in grouped) {

        chartData.push({
            month: key,
            amount: grouped[key]
        });
    }

    return (

        <div className="bg-white p-5 rounded shadow m-5">

            <h2 className="text-2xl font-bold mb-5">
                Monthly Expense Report
            </h2>

            <ResponsiveContainer width="100%" height={400}>

                <BarChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="amount"
                        fill="#3B82F6"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default MonthlyBarChart;
