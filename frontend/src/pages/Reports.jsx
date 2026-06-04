import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
    getUserExpenses
} from "../services/expenseService";

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
    FaReceipt
} from "react-icons/fa";

function Reports() {

    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {

        try {

            const email =
                localStorage.getItem("userEmail");

            const response =
                await getUserExpenses(email);

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    const categoryData = [];

    expenses.forEach((expense) => {

        const existing =
            categoryData.find(
                item =>
                    item.name === expense.category
            );

        if (existing) {

            existing.value +=
                Number(expense.amount);

        } else {

            categoryData.push({
                name: expense.category,
                value: Number(expense.amount)
            });
        }
    });

    const totalAmount =
        expenses.reduce(
            (sum, item) =>
                sum + Number(item.amount),
            0
        );

    const downloadReport = () => {

        const doc = new jsPDF();

        doc.setFontSize(20);

        doc.text(
            "Expense Report",
            14,
            20
        );

        const tableColumn = [
            "Title",
            "Category",
            "Amount",
            "Date"
        ];

        const tableRows = [];

        expenses.forEach((expense) => {

            tableRows.push([
                expense.title,
                expense.category,
                `₹ ${expense.amount}`,
                expense.date
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30
        });

        doc.save(
            "Expense_Report.pdf"
        );
    };

    const COLORS = [
        "#06B6D4",
        "#3B82F6",
        "#8B5CF6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#EC4899"
    ];

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden p-8">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 flex justify-between items-center shadow-lg">

                        <div>

                            <h1 className="text-4xl font-bold text-white flex items-center gap-3">

                                <FaChartPie className="text-cyan-400" />

                                Expense Reports

                            </h1>

                            <p className="text-slate-300 mt-2">

                                Visual analytics of your expenses

                            </p>

                        </div>

                        <button
                            onClick={downloadReport}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
                        >

                            <FaDownload />

                            Download Report

                        </button>

                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

                            <FaReceipt className="text-cyan-400 text-3xl mb-3" />

                            <p className="text-slate-300">
                                Total Expenses
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {expenses.length}
                            </h2>

                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

                            <FaLayerGroup className="text-purple-400 text-3xl mb-3" />

                            <p className="text-slate-300">
                                Categories
                            </p>

                            <h2 className="text-3xl font-bold text-white mt-2">
                                {categoryData.length}
                            </h2>

                        </div>

                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

                            <FaWallet className="text-green-400 text-3xl mb-3" />

                            <p className="text-slate-300">
                                Total Spending
                            </p>

                            <h2 className="text-3xl font-bold text-green-400 mt-2">
                                ₹ {totalAmount}
                            </h2>

                        </div>

                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Pie Chart */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-lg">

                            <h2 className="text-2xl font-bold text-white mb-6">

                                Category Wise Expenses

                            </h2>

                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        dataKey="value"
                                        label
                                    >

                                        {categoryData.map(
                                            (entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-lg">

                            <h2 className="text-2xl font-bold text-white mb-6">

                                Expense Comparison

                            </h2>

                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >

                                <BarChart
                                    data={categoryData}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="value"
                                        fill="#06B6D4"
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Summary Table */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-lg mt-10">

                        <h2 className="text-2xl font-bold text-white mb-6">

                            Expense Summary

                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full border-collapse">

                                <thead>

                                    <tr className="bg-white/10">

                                        <th className="border border-white/20 p-3 text-white">
                                            Category
                                        </th>

                                        <th className="border border-white/20 p-3 text-white">
                                            Total Amount
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {categoryData.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <tr
                                                key={index}
                                                className="hover:bg-white/5 transition"
                                            >

                                                <td className="border border-white/20 p-3 text-slate-200">

                                                    {item.name}

                                                </td>

                                                <td className="border border-white/20 p-3 text-cyan-400 font-semibold">

                                                    ₹ {item.value}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Reports;