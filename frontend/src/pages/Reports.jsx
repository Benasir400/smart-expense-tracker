import { useEffect, useState } from "react";
import { getUserExpenses } from "../services/expenseService";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    FaDownload,
    FaChartPie,
    FaWallet,
    FaLayerGroup,
    FaReceipt,
    FaTable
} from "react-icons/fa";

function Reports() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchExpenses = async () => {
            try {
                const email = localStorage.getItem("userEmail");
                const res = await getUserExpenses(email);
                if (isMounted) setExpenses(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchExpenses();

        return () => {
            isMounted = false;
        };
    }, []);

    const categoryData = [];

    expenses.forEach((e) => {
        const existing = categoryData.find((c) => c.name === e.category);
        if (existing) existing.value += Number(e.amount);
        else categoryData.push({ name: e.category, value: Number(e.amount) });
    });

    const total = expenses.reduce((a, b) => a + Number(b.amount), 0);

    const download = () => {
        const doc = new jsPDF();
        doc.text("Expense Report", 14, 15);

        autoTable(doc, {
            startY: 25,
            head: [["Title", "Category", "Amount", "Date"]],
            body: expenses.map((e) => [
                e.title,
                e.category,
                e.amount,
                e.date
            ])
        });

        doc.save("report.pdf");
    };

    const COLORS = ["#06B6D4", "#3B82F6", "#8B5CF6", "#10B981"];

    return (
        <div className="w-full space-y-5 p-4 sm:p-5 md:space-y-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5 md:flex-row md:items-center">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
                        <FaChartPie className="text-cyan-400" /> Reports
                    </h1>
                    <p className="mt-2 text-sm text-slate-300">
                        Review category totals and export your expense summary.
                    </p>
                </div>

                <button
                    onClick={download}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 md:w-auto"
                >
                    <FaDownload /> Download
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <FaReceipt className="mb-3 text-2xl text-cyan-400" />
                    <p className="text-sm text-slate-300">Total Expenses</p>
                    <h2 className="mt-1 text-2xl font-bold">{expenses.length}</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <FaLayerGroup className="mb-3 text-2xl text-violet-400" />
                    <p className="text-sm text-slate-300">Categories</p>
                    <h2 className="mt-1 text-2xl font-bold">{categoryData.length}</h2>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 sm:col-span-2 md:col-span-1">
                    <FaWallet className="mb-3 text-2xl text-green-400" />
                    <p className="text-sm text-slate-300">Total Spending</p>
                    <h2 className="mt-1 text-2xl font-bold">Rs. {total}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="h-[280px] w-full rounded-2xl border border-white/10 bg-white/10 p-3 sm:h-[320px]">
                    <h2 className="mb-2 font-semibold">Category Split</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={categoryData} dataKey="value" outerRadius={80}>
                                {categoryData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="h-[280px] w-full rounded-2xl border border-white/10 bg-white/10 p-3 sm:h-[320px]">
                    <h2 className="mb-2 font-semibold">Category Comparison</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                            <CartesianGrid />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#06B6D4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4">
                <h2 className="mb-3 flex items-center gap-2 font-semibold">
                    <FaTable className="text-cyan-400" />
                    Category Summary
                </h2>
                <table className="w-full min-w-[500px] text-sm">
                    <thead>
                        <tr>
                            <th className="py-2 text-left">Category</th>
                            <th className="py-2 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.map((c, i) => (
                            <tr key={i}>
                                <td className="border-t border-white/10 py-2">{c.name}</td>
                                <td className="border-t border-white/10 py-2">Rs. {c.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports;
