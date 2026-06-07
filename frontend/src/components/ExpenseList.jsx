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
    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [editedExpense, setEditedExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
        userEmail: ""
    });

    const loadExpenses = async () => {
        const email = localStorage.getItem("userEmail");
        const response = await getUserExpenses(email);
        return response.data;
    };

    useEffect(() => {
        let isMounted = true;

        const fetchExpenses = async () => {
            try {
                const data = await loadExpenses();
                if (isMounted) setExpenses(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            alert("Expense Deleted Successfully");
            setExpenses(await loadExpenses());
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (expense) => {
        setEditingId(expense.id);
        setEditedExpense(expense);
    };

    const handleUpdate = async (id) => {
        try {
            await updateExpense(id, editedExpense);
            alert("Expense Updated Successfully");
            setEditingId(null);
            setExpenses(await loadExpenses());
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditedExpenseChange = (field, value) => {
        setEditedExpense((current) => ({
            ...current,
            [field]: value
        }));
    };

    const filteredExpenses = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-3 md:p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-xl md:text-3xl font-bold text-white">
                    Expense List
                </h2>

                <div className="shrink-0">
                    <ExportPDF expenses={filteredExpenses} />
                </div>
            </div>

            <div className="flex items-center border border-white/20 rounded-xl p-3 mb-5 bg-white/10">
                <FaSearch className="mr-3 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-none w-full bg-transparent text-white placeholder-gray-400"
                />
            </div>

            {filteredExpenses.length === 0 ? (
                <div className="bg-white/10 rounded-xl p-10 text-center text-gray-400 text-sm md:text-lg">
                    No expenses found
                </div>
            ) : (
                <>
                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {filteredExpenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="bg-slate-800 rounded-xl border border-slate-700 p-4"
                            >
                                <div className="space-y-3">

                                    <div>
                                        <p className="text-xs text-gray-400">Title</p>
                                        {editingId === expense.id ? (
                                            <input
                                                value={editedExpense.title}
                                                onChange={(e) =>
                                                    handleEditedExpenseChange(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded bg-slate-900 px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <p className="font-medium">
                                                {expense.title}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">Amount</p>
                                        {editingId === expense.id ? (
                                            <input
                                                type="number"
                                                value={editedExpense.amount}
                                                onChange={(e) =>
                                                    handleEditedExpenseChange(
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded bg-slate-900 px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <p className="font-bold text-red-400">
                                                Rs. {expense.amount}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">Category</p>
                                        {editingId === expense.id ? (
                                            <input
                                                value={editedExpense.category}
                                                onChange={(e) =>
                                                    handleEditedExpenseChange(
                                                        "category",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded bg-slate-900 px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <p>{expense.category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">Date</p>
                                        {editingId === expense.id ? (
                                            <input
                                                type="date"
                                                value={editedExpense.date}
                                                onChange={(e) =>
                                                    handleEditedExpenseChange(
                                                        "date",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded bg-slate-900 px-3 py-2 text-white"
                                            />
                                        ) : (
                                            <p>{expense.date}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        {editingId === expense.id ? (
                                            <button
                                                onClick={() => handleUpdate(expense.id)}
                                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-lg flex items-center justify-center gap-2"
                                            >
                                                <FaSave />
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(expense)}
                                                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 py-2 rounded-lg flex items-center justify-center gap-2"
                                            >
                                                <FaEdit />
                                                Edit
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg flex items-center justify-center gap-2"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-slate-700 text-white text-sm md:text-base">
                                    <th className="px-3 md:px-4 py-3">Title</th>
                                    <th className="px-3 md:px-4 py-3">Amount</th>
                                    <th className="px-3 md:px-4 py-3">Category</th>
                                    <th className="px-3 md:px-4 py-3">Date</th>
                                    <th className="px-3 md:px-4 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredExpenses.map((expense) => (
                                    <tr
                                        key={expense.id}
                                        className="bg-slate-800 text-gray-100 hover:bg-slate-700 transition"
                                    >
                                        <td className="px-3 md:px-4 py-3 border border-slate-600">
                                            {editingId === expense.id ? (
                                                <input
                                                    value={editedExpense.title}
                                                    onChange={(e) =>
                                                        handleEditedExpenseChange(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded bg-slate-900 px-2 py-1 text-white outline-none"
                                                />
                                            ) : (
                                                expense.title
                                            )}
                                        </td>

                                        <td className="px-3 md:px-4 py-3 border border-slate-600 text-red-400 font-semibold">
                                            {editingId === expense.id ? (
                                                <input
                                                    type="number"
                                                    value={editedExpense.amount}
                                                    onChange={(e) =>
                                                        handleEditedExpenseChange(
                                                            "amount",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded bg-slate-900 px-2 py-1 text-white outline-none"
                                                />
                                            ) : (
                                                <>Rs. {expense.amount}</>
                                            )}
                                        </td>

                                        <td className="px-3 md:px-4 py-3 border border-slate-600">
                                            {editingId === expense.id ? (
                                                <input
                                                    value={editedExpense.category}
                                                    onChange={(e) =>
                                                        handleEditedExpenseChange(
                                                            "category",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded bg-slate-900 px-2 py-1 text-white outline-none"
                                                />
                                            ) : (
                                                expense.category
                                            )}
                                        </td>

                                        <td className="px-3 md:px-4 py-3 border border-slate-600">
                                            {editingId === expense.id ? (
                                                <input
                                                    type="date"
                                                    value={editedExpense.date}
                                                    onChange={(e) =>
                                                        handleEditedExpenseChange(
                                                            "date",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded bg-slate-900 px-2 py-1 text-white outline-none"
                                                />
                                            ) : (
                                                expense.date
                                            )}
                                        </td>

                                        <td className="px-3 md:px-4 py-3 border border-slate-600">
                                            <div className="flex gap-2 justify-center">
                                                {editingId === expense.id ? (
                                                    <button
                                                        onClick={() => handleUpdate(expense.id)}
                                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                                                    >
                                                        <FaSave />
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEdit(expense)}
                                                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                                                    >
                                                        <FaEdit />
                                                        Edit
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(expense.id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
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
                </>
            )}
        </div>
    );
}

export default ExpenseList;
