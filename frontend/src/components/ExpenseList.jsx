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

        <div className="p-5">

            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">

                <h2 className="text-3xl font-bold">

                    Expense List

                </h2>

                <ExportPDF
                    expenses={filteredExpenses}
                />

            </div>

            {/* Search */}
            <div className="flex items-center border rounded p-3 mb-5 bg-white shadow">

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

                <div className="bg-white shadow rounded p-10 text-center text-gray-500 text-lg">

                    No expenses found

                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse bg-white shadow rounded overflow-hidden">

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

                                <th className="border p-3">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredExpenses.map((expense) => (

                                <tr
                                    key={expense.id}
                                    className="hover:bg-gray-50"
                                >

                                    {/* Title */}
                                    <td className="border p-3">

                                        {editingId === expense.id ? (

                                            <input
                                                type="text"
                                                value={editedExpense.title}
                                                placeholder="Eg: Pizza, Netflix, Shopping"
                                                onChange={(e) =>
                                                    setEditedExpense({
                                                        ...editedExpense,
                                                        title:
                                                            e.target.value
                                                    })
                                                }
                                                className="border p-2 rounded w-full"
                                            />

                                        ) : (

                                            expense.title
                                        )}

                                    </td>

                                    {/* Amount */}
                                    <td className="border p-3">

                                        {editingId === expense.id ? (

                                            <input
                                                type="number"
                                                value={editedExpense.amount}
                                                onChange={(e) =>
                                                    setEditedExpense({
                                                        ...editedExpense,
                                                        amount:
                                                            e.target.value
                                                    })
                                                }
                                                className="border p-2 rounded w-full"
                                            />

                                        ) : (

                                            `₹ ${expense.amount}`
                                        )}

                                    </td>

                                    {/* Category */}
                                    <td className="border p-3">

                                        {editingId === expense.id ? (

                                            <select
                                                value={editedExpense.category}
                                                onChange={(e) =>
                                                    setEditedExpense({
                                                        ...editedExpense,
                                                        category:
                                                            e.target.value
                                                    })
                                                }
                                                className="border p-2 rounded w-full"
                                            >

                                                <option value="Food">
                                                    🍔 Food
                                                </option>

                                                <option value="Travel">
                                                    ✈️ Travel
                                                </option>

                                                <option value="Shopping">
                                                    🛒 Shopping
                                                </option>

                                                <option value="Bills">
                                                    💡 Bills
                                                </option>

                                                <option value="Education">
                                                    📚 Education
                                                </option>

                                                <option value="Entertainment">
                                                    🎬 Entertainment
                                                </option>

                                                <option value="Health">
                                                    🏥 Health
                                                </option>

                                                <option value="Other">
                                                    📦 Other
                                                </option>

                                            </select>

                                        ) : (

                                            expense.category
                                        )}

                                    </td>

                                    {/* Date */}
                                    <td className="border p-3">

                                        {editingId === expense.id ? (

                                            <input
                                                type="date"
                                                value={editedExpense.date}
                                                onChange={(e) =>
                                                    setEditedExpense({
                                                        ...editedExpense,
                                                        date:
                                                            e.target.value
                                                    })
                                                }
                                                className="border p-2 rounded w-full"
                                            />

                                        ) : (

                                            expense.date
                                        )}

                                    </td>

                                    {/* Actions */}
                                    <td className="border p-3">

                                        <div className="flex gap-2 justify-center">

                                            {editingId === expense.id ? (

                                                <button
                                                    onClick={() =>
                                                        handleUpdate(
                                                            expense.id
                                                        )
                                                    }
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2"
                                                >

                                                    <FaSave />

                                                    Save

                                                </button>

                                            ) : (

                                                <button
                                                    onClick={() =>
                                                        handleEdit(
                                                            expense
                                                        )
                                                    }
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center gap-2"
                                                >

                                                    <FaEdit />

                                                    Edit

                                                </button>

                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        expense.id
                                                    )
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center gap-2"
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

                </div>

            )}

        </div>
    );
}

export default ExpenseList;
