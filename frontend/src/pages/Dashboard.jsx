import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    getUserExpenses
} from "../services/expenseService";

import {
    FaWallet,
    FaArrowDown,
    FaArrowUp,
    FaPiggyBank,
    FaSave,
    FaExclamationTriangle
} from "react-icons/fa";

function Dashboard() {

    const [expenses, setExpenses] =
        useState([]);

    // Salary State
    const [salary, setSalary] =
        useState(
            localStorage.getItem(
                "salary"
            ) || ""
        );

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

    // Save Salary
    const handleSaveSalary = () => {

        if (!salary) {

            alert(
                "Please Enter Salary"
            );

            return;
        }

        localStorage.setItem(
            "salary",
            salary
        );

        alert(
            "Monthly Salary Saved"
        );

        window.location.reload();
    };

    // Total Expense
    const totalExpense =
        expenses.reduce(
            (total, item) =>
                total +
                Number(item.amount),
            0
        );

    // Balance
    const balanceAmount =
        Number(salary) -
        totalExpense;

    // Highest Expense
    const highestExpense =
        expenses.length > 0
            ? Math.max(
                ...expenses.map(
                    (item) =>
                        Number(item.amount)
                )
            )
            : 0;

    return (

        <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                {/* Heading */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        Financial Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Track your monthly expenses professionally

                    </p>

                </div>

                {/* Salary Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

                    <h2 className="text-2xl font-bold mb-5">

                        Monthly Salary / Budget

                    </h2>

                    {!localStorage.getItem("salary") ? (

                        <div className="flex flex-col md:flex-row gap-4">

                            <input
                                type="number"
                                placeholder="Enter Monthly Salary"
                                value={salary}
                                onChange={(e) =>
                                    setSalary(
                                        e.target.value
                                    )
                                }
                                className="border p-3 rounded-lg w-full"
                            />

                            <button
                                onClick={handleSaveSalary}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                            >

                                <FaSave />

                                Save

                            </button>

                        </div>

                    ) : (

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    Your Monthly Salary

                                </p>

                                <h2 className="text-4xl font-bold text-blue-500 mt-2">

                                    ₹ {salary}

                                </h2>

                            </div>

                            <button
                                onClick={() => {

                                    localStorage.removeItem(
                                        "salary"
                                    );

                                    window.location.reload();
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
                            >

                                Reset

                            </button>

                        </div>

                    )}

                </div>

                {/* Budget Warning */}
                {salary &&
                    totalExpense >
                    Number(salary) && (

                    <div className="bg-red-500 text-white p-5 rounded-xl mb-8 flex items-center gap-4 shadow-lg">

                        <FaExclamationTriangle className="text-3xl" />

                        <div>

                            <h2 className="text-xl font-bold">

                                Budget Limit Exceeded

                            </h2>

                            <p>

                                Your expenses crossed your salary limit.

                            </p>

                        </div>

                    </div>

                )}

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    {/* Total Budget */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    Total Budget

                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-blue-500">

                                    ₹ {salary || 0}

                                </h2>

                            </div>

                            <div className="bg-blue-100 p-4 rounded-full">

                                <FaWallet className="text-3xl text-blue-500" />

                            </div>

                        </div>

                    </div>

                    {/* Total Expense */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    Total Expense

                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-red-500">

                                    ₹ {totalExpense}

                                </h2>

                            </div>

                            <div className="bg-red-100 p-4 rounded-full">

                                <FaArrowDown className="text-3xl text-red-500" />

                            </div>

                        </div>

                    </div>

                    {/* Balance Amount */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    Balance Amount

                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-green-500">

                                    ₹ {balanceAmount}

                                </h2>

                            </div>

                            <div className="bg-green-100 p-4 rounded-full">

                                <FaPiggyBank className="text-3xl text-green-500" />

                            </div>

                        </div>

                    </div>

                    {/* Highest Expense */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">

                        <div className="flex justify-between items-center">

                            <div>

                                <p className="text-gray-500">

                                    Highest Expense

                                </p>

                                <h2 className="text-3xl font-bold mt-2 text-orange-500">

                                    ₹ {highestExpense}

                                </h2>

                            </div>

                            <div className="bg-orange-100 p-4 rounded-full">

                                <FaArrowUp className="text-3xl text-orange-500" />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Recent Expenses */}
                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">

                        Recent Expenses

                    </h2>

                    {expenses.length === 0 ? (

                        <p className="text-gray-500">

                            No expenses found

                        </p>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full border-collapse">

                                <thead>

                                    <tr className="bg-gray-200">

                                        <th className="border p-3">
                                            Title
                                        </th>

                                        <th className="border p-3">
                                            Amount
                                        </th>

                                        <th className="border p-3">
                                            Category
                                        </th>

                                        <th className="border p-3">
                                            Date
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {expenses.map((expense) => (

                                        <tr
                                            key={expense.id}
                                            className="hover:bg-gray-50"
                                        >

                                            <td className="border p-3">

                                                {expense.title}

                                            </td>

                                            <td className="border p-3 text-red-500 font-semibold">

                                                ₹ {expense.amount}

                                            </td>

                                            <td className="border p-3">

                                                {expense.category}

                                            </td>

                                            <td className="border p-3">

                                                {expense.date}

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
