import { useState } from "react";
import Sidebar from "../components/Sidebar";
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

            const expenseData = {
                title: expense.title,
                amount: Number(expense.amount),   // FIX 1
                category: expense.category,
                date: expense.date || null,       // FIX 2
                userEmail: userEmail
            };

            console.log("Sending Expense:", expenseData); // DEBUG

            await addExpense(expenseData);

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
        <div className="flex flex-col md:flex-row">
            {/* <div className="hidden md:flex w-72 bg-slate-950 border-r border-slate-800"> */}
            <Sidebar />
            {/* </div> */}

            <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden p-4 md:p-8">

                {/* Background Effects (UNCHANGED) */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">

                    {/* Header (UNCHANGED CONTENT) */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg">

                        <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-3">
                            <FaPlusCircle className="text-cyan-400" />
                            Add Expense
                        </h1>

                        <p className="text-slate-300 mt-2">
                            Record and manage your daily expenses
                        </p>

                    </div>

                    {/* Form (ONLY LAYOUT FIX) */}
                    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-8 shadow-2xl">

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                        >

                            {/* TITLE (UNCHANGED ICON + CONTENT) */}
                            <div>
                                <label className="text-slate-200 mb-2 flex items-center gap-2">
                                    <FaTags />
                                    Expense Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Pizza,Book,Ticket,.."
                                    value={expense.title}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
                                    required
                                />
                            </div>

                            {/* AMOUNT */}
                            <div>
                                <label className="text-slate-200 mb-2 flex items-center gap-2">
                                    <FaMoneyBillWave />
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={expense.amount}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
                                    required
                                />
                            </div>

                            {/* CATEGORY */}
                            <div>
                                <label className="text-slate-200 mb-2 flex items-center gap-2">
                                    <FaTags />
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={expense.category}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
                                    required
                                >
                                    <option value="" className="text-black">Select Category</option>
                                    <option value="Food" className="text-black">🍔 Food</option>
                                    <option value="Travel" className="text-black">✈️ Travel</option>
                                    <option value="Shopping" className="text-black">🛒 Shopping</option>
                                    <option value="Bills" className="text-black">💡 Bills</option>
                                    <option value="Education" className="text-black">📚 Education</option>
                                    <option value="Entertainment" className="text-black">🎬 Entertainment</option>
                                    <option value="Health" className="text-black">🏥 Health</option>
                                    <option value="Other" className="text-black">📦 Other</option>
                                </select>
                            </div>

                            {/* DATE */}
                            <div>
                                <label className="text-slate-200 mb-2 flex items-center gap-2">
                                    <FaCalendarAlt />
                                    Expense Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={expense.date}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl bg-white/10 text-white border border-white/20"
                                    required
                                />
                            </div>

                            {/* BUTTON (UNCHANGED ICON) */}
                            <button
                                type="submit"
                                className="md:col-span-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl flex items-center justify-center gap-3"
                            >
                                <FaPlusCircle />
                                Add Expense
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default AddExpense;