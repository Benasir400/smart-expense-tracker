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

        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden p-8">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-lg">

                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">

                            <FaPlusCircle className="text-cyan-400" />

                            Add Expense

                        </h1>

                        <p className="text-slate-300 mt-2">
                            Record and manage your daily expenses
                        </p>

                    </div>

                    {/* Form Card */}
                    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >

                            {/* Title */}
                            <div>

                                <label className="text-slate-200 mb-2 flex items-center gap-2">

                                    <FaTags />

                                    Expense Title

                                </label>

                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">

                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Pizza, Netflix, Bus Ticket..."
                                        value={expense.title}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                        required
                                    />

                                </div>

                            </div>

                            {/* Amount */}
                            <div>

                                <label className="text-slate-200 mb-2 flex items-center gap-2">

                                    <FaMoneyBillWave />

                                    Amount

                                </label>

                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">

                                    <input
    type="number"
    name="amount"
    value={expense.amount}
    onChange={handleChange}
    className="w-full bg-transparent outline-none text-white"
    required
/>

                                </div>

                            </div>

                            {/* Category */}
                            <div>

                                <label className="text-slate-200 mb-2 flex items-center gap-2">

                                    <FaTags />

                                    Category

                                </label>

                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">

                                    <select
                                        name="category"
                                        value={expense.category}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-white"
                                        required
                                    >

                                        <option className="text-black" value="">
                                            Select Category
                                        </option>

                                        <option className="text-black" value="Food">
                                            🍔 Food
                                        </option>

                                        <option className="text-black" value="Travel">
                                            ✈️ Travel
                                        </option>

                                        <option className="text-black" value="Shopping">
                                            🛒 Shopping
                                        </option>

                                        <option className="text-black" value="Bills">
                                            💡 Bills
                                        </option>

                                        <option className="text-black" value="Education">
                                            📚 Education
                                        </option>

                                        <option className="text-black" value="Entertainment">
                                            🎬 Entertainment
                                        </option>

                                        <option className="text-black" value="Health">
                                            🏥 Health
                                        </option>

                                        <option className="text-black" value="Other">
                                            📦 Other
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* Date */}
                            <div>

                                <label className="text-slate-200 mb-2 flex items-center gap-2">

                                    <FaCalendarAlt />

                                    Expense Date

                                </label>

                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">

                                   <input
    type="date"
    name="date"
    value={expense.date}
    onChange={handleChange}
    required
    className="w-full bg-transparent outline-none text-white"
    
/>

                                </div>

                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="
                                md:col-span-2
                                bg-gradient-to-r
                                from-cyan-500
                                to-blue-600
                                text-white
                                py-4
                                rounded-xl
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-3
                                hover:scale-[1.02]
                                transition-all
                                duration-300
                                shadow-lg
                                "
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