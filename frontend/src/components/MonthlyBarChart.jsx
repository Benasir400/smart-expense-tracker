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

import {
    FaChartBar
} from "react-icons/fa";

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

    // Group Expenses By Month
    const grouped = {};

    expenses.forEach((expense) => {

        const month = new Date(expense.date)
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

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-xl m-5">

            {/* Heading */}

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl">

                    <FaChartBar className="text-white text-xl" />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white">

                        Monthly Expense Report

                    </h2>

                    <p className="text-slate-300 text-sm">

                        Monthly spending analytics

                    </p>

                </div>

            </div>

            {/* Chart */}

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <BarChart data={chartData}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#334155"
                    />

                    <XAxis
                        dataKey="month"
                        stroke="#CBD5E1"
                    />

                    <YAxis
                        stroke="#CBD5E1"
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0F172A",
                            border: "1px solid #334155",
                            borderRadius: "12px",
                            color: "#fff"
                        }}
                    />

                    <Bar
                        dataKey="amount"
                        fill="#06B6D4"
                        radius={[10, 10, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default MonthlyBarChart;