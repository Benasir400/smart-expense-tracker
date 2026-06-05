import { useEffect, useState } from "react";

import {
    getUserExpenses,
    deleteExpense,
    updateExpense
} from "../services/expenseService";

import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaSave
} from "react-icons/fa";

import ExportPDF from "./ExportPDF";

function ExpenseList() {

    // States
    const [expenses, setExpenses] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [editedExpense, setEditedExpense] =
        useState({
            title: "",
            amount: "",
            category: "",
            date: "",
            userEmail: ""
        });

    // Fetch User Expenses
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

    // useEffect
    useEffect(() => {

        fetchExpenses();

    }, []);

    // Delete Expense
    const handleDelete = async (id) => {

        try {

            await deleteExpense(id);

            alert(
                "Expense Deleted Successfully"
            );

            fetchExpenses();

        } catch (error) {

            console.log(error);
        }
    };

    // Edit Expense
    const handleEdit = (expense) => {

        setEditingId(expense.id);

        setEditedExpense({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            userEmail: expense.userEmail
        });
    };

    // Update Expense
    const handleUpdate = async (id) => {

        try {

            await updateExpense(
                id,
                editedExpense
            );

            alert(
                "Expense Updated Successfully"
            );

            setEditingId(null);

            fetchExpenses();

        } catch (error) {

            console.log(error);
        }
    };

    // Search Filter
    const filteredExpenses =
        expenses.filter((expense) =>

            expense.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            expense.category
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="p-6">

            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">

                <h2 className="text-3xl ">

                    Expense List

                </h2>

                <ExportPDF
                    expenses={filteredExpenses}
                />

            </div>

            {/* Search */}
            <div className="flex items-center border rounded p-3 mb-5 bg-white/10 shadow">

                <FaSearch
                    className="mr-3 text-gray-500"
                />

                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="outline-none w-full"
                />

            </div>

            {/* Empty State */}
            {filteredExpenses.length === 0 ? (

                <div className="bg-white/10 shadow rounded p-10 text-center text-gray-500 text-lg">

                    No expenses found

                </div>

            ) : (
<table className="w-full border-collapse overflow-hidden rounded-xl">

    <thead>
         <tr className="bg-slate-700 text-white">
            <th className="px-4 py-4 font-semibold">Title</th>
            <th className="px-4 py-4 font-semibold">Amount</th>
            <th className="px-4 py-4 font-semibold">Category</th>
            <th className="px-4 py-4 font-semibold">Date</th>
            <th className="px-4 py-4 font-semibold">Actions</th>
        </tr>
    </thead>

    <tbody>
        {filteredExpenses.map((expense) => (
            <tr
                key={expense.id}
                className="bg-slate-800 text-gray-100 hover:bg-slate-700 transition-all duration-200"
            >
                <td className="border border-slate-600 px-4 py-4">
                    {expense.title}
                </td>

                <td className="border border-slate-600 px-4 py-4 text-red-400 font-semibold">
                    ₹ {expense.amount}
                </td>

                <td className="border border-slate-600 px-4 py-4">
                    {expense.category}
                </td>

                <td className="border border-slate-600 px-4 py-4">
                    {expense.date}
                </td>

                <td className="border border-slate-600 px-4 py-4">
                    <div className="flex justify-center gap-2">

                        <button
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
                        >
                            <FaEdit />
                            Edit
                        </button>

                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        >
                            <FaTrash />
                            Delete
                        </button>

                    </div>
                </td>
            </tr>
        ))}
    </tbody>

</table>

            )}

        </div>
    );
}

export default ExpenseList;
