import { useState } from "react";
import { addExpense } from "../services/expenseService";

import {
    FaMoneyBillWave,
    FaTags,
    FaCalendarAlt,
    FaPlusCircle
} from "react-icons/fa";

function AddExpense() {
    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        date: ""
    });

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userEmail = localStorage.getItem("userEmail");

            if (!userEmail) {
                alert("User not logged in");
                return;
            }

            await addExpense({
                title: expense.title,
                amount: Number(expense.amount),
                category: expense.category,
                date: expense.date || null,
                userEmail
            });

            alert("Expense Added Successfully");

            setExpense({
                title: "",
                amount: "",
                category: "",
                date: ""
            });
        } catch (error) {
            console.log("ERROR:", error?.response?.data || error.message);
            alert("Error Adding Expense");
        }
    };

    return (
        <div className="min-h-screen w-full p-4 sm:p-5 md:p-8">
            <div className="mx-auto w-full max-w-5xl space-y-5 md:space-y-8">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl sm:p-5 md:rounded-3xl md:p-6">
                    <h1 className="flex items-center gap-3 text-2xl font-bold text-white md:text-4xl">
                        <FaPlusCircle className="shrink-0 text-cyan-400" />
                        Add Expense
                    </h1>

                    <p className="mt-2 text-sm text-slate-300 sm:text-base">
                        Record and manage your daily expenses
                    </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:rounded-3xl md:p-8">
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                    >
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200 sm:text-base">
                                <FaTags />
                                Expense Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Pizza, Book, Ticket..."
                                value={expense.title}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200 sm:text-base">
                                <FaMoneyBillWave />
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={expense.amount}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200 sm:text-base">
                                <FaTags />
                                Category
                            </label>

                            <select
                                name="category"
                                value={expense.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none"
                                required
                            >
                                <option value="" disabled hidden>
                                    Select Category
                                </option>
                                <option value="Food" className="text-black">Food</option>
                                <option value="Travel" className="text-black">Travel</option>
                                <option value="Shopping" className="text-black">Shopping</option>
                                <option value="Bills" className="text-black">Bills</option>
                                <option value="Education" className="text-black">Education</option>
                                <option value="Entertainment" className="text-black">Entertainment</option>
                                <option value="Health" className="text-black">Health</option>
                                <option value="Other" className="text-black">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm text-slate-200 sm:text-base">
                                <FaCalendarAlt />
                                Expense Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={expense.date}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-white transition hover:scale-[1.01] md:col-span-2 md:py-4"
                        >
                            <FaPlusCircle />
                            Add Expense
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddExpense;
