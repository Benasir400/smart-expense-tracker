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

import {
    FaChartPie
} from "react-icons/fa";

function ExpensePieChart() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchExpenses = async () => {
            try {
                const response = await getExpenses();
                if (isMounted) setExpenses(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();

        return () => {
            isMounted = false;
        };
    }, []);

    const grouped = {};

    expenses.forEach((expense) => {
        if (grouped[expense.category]) {
            grouped[expense.category] += Number(expense.amount);
        } else {
            grouped[expense.category] = Number(expense.amount);
        }
    });

    const categoryData = [];

    for (let key in grouped) {
        categoryData.push({
            name: key,
            value: grouped[key]
        });
    }

    const COLORS = [
        "#06B6D4",
        "#3B82F6",
        "#8B5CF6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#EC4899",
        "#14B8A6"
    ];

    return (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
            p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl 
            mx-2 md:m-5">

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 md:mb-6">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 
                    p-2 md:p-3 rounded-xl">

                    <FaChartPie className="text-white text-lg md:text-xl" />

                </div>

                <div>

                    <h2 className="text-lg md:text-2xl font-bold text-white">
                        Expense Analytics
                    </h2>

                    <p className="text-slate-300 text-xs md:text-sm">
                        Category-wise spending distribution
                    </p>

                </div>

            </div>

            {/* Chart */}
            <div className="w-full h-[260px] md:h-[400px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            outerRadius={window.innerWidth < 768 ? 90 : 130}
                            innerRadius={window.innerWidth < 768 ? 40 : 60}
                            dataKey="value"
                            label={window.innerWidth > 768}
                        >

                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}

                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0F172A",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                color: "#fff"
                            }}
                        />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default ExpensePieChart;
