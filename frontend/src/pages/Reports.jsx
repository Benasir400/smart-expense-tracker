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
    FaDownload
} from "react-icons/fa";

function Reports() {

    const [expenses, setExpenses] =
        useState([]);

    // Fetch Expenses
    const fetchExpenses = async () => {

        try {

            const email =
                localStorage.getItem(
                    "userEmail"
                );

            const response =
                await getUserExpenses(
                    email
                );

            setExpenses(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    // Category Data
    const categoryData = [];

    expenses.forEach((expense) => {

        const existing =
            categoryData.find(
                (item) =>
                    item.name ===
                    expense.category
            );

        if (existing) {

            existing.value +=
                Number(
                    expense.amount
                );

        } else {

            categoryData.push({
                name:
                    expense.category,
                value:
                    Number(
                        expense.amount
                    )
            });
        }
    });

    // Download PDF
    const downloadReport = () => {

        const doc =
            new jsPDF();

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

            const rowData = [

                expense.title,

                expense.category,

                `₹ ${expense.amount}`,

                expense.date
            ];

            tableRows.push(
                rowData
            );
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

    // Colors
    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#A020F0",
        "#FF4560",
        "#00E396"
    ];

    return (

        <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                {/* Heading */}
                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Expense Reports

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Visual analytics of your expenses

                        </p>

                    </div>

                    {/* Download Button */}
                    <button
                        onClick={downloadReport}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                    >

                        <FaDownload />

                        Download Report

                    </button>

                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-2xl font-bold mb-6">

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
                                        (
                                            entry,
                                            index
                                        ) => (

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
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <h2 className="text-2xl font-bold mb-6">

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
                                    fill="#3B82F6"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Summary Table */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

                    <h2 className="text-2xl font-bold mb-6">

                        Expense Summary

                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-gray-200">

                                    <th className="border p-3">

                                        Category

                                    </th>

                                    <th className="border p-3">

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
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="border p-3">

                                                {item.name}

                                            </td>

                                            <td className="border p-3 text-red-500 font-semibold">

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
    );
}

export default Reports;