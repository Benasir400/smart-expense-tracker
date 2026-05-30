import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { getExpenses } from "../services/expenseService";

function ExpensePieChart() {

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

    // Group expenses by category
    const categoryData = [];

    const grouped = {};

    expenses.forEach((expense) => {

        if (grouped[expense.category]) {

            grouped[expense.category] += Number(expense.amount);

        } else {

            grouped[expense.category] = Number(expense.amount);
        }
    });

    for (let key in grouped) {

        categoryData.push({
            name: key,
            value: grouped[key]
        });
    }

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A020F0",
        "#FF4560"
    ];

    return (

        <div className="bg-white p-5 rounded shadow m-5">

            <h2 className="text-2xl font-bold mb-5">
                Expense Analytics
            </h2>

            <ResponsiveContainer width="100%" height={400}>

                <PieChart>

                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >

                        {categoryData.map((entry, index) => (

                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />
                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ExpensePieChart;
