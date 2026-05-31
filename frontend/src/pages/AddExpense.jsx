import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { addExpense }
from "../services/expenseService";

import {
    FaMoneyBillWave,
    FaTags,
    FaCalendarAlt,
    FaPlusCircle
} from "react-icons/fa";

function AddExpense() {

    const [expense, setExpense] =
        useState({
            title: "",
            amount: "",
            category: "",
            date: ""
        });

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const userEmail =
                localStorage.getItem(
                    "userEmail"
                );

            const expenseData = {

                ...expense,

                userEmail
            };

            await addExpense(
                expenseData
            );

            alert(
                "Expense Added Successfully"
            );

            setExpense({
                title: "",
                amount: "",
                category: "",
                date: ""
            });

        } catch (error) {

            console.log(error);

            alert(
                "Error Adding Expense"
            );
        }
    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen p-8">

                <div className="bg-white p-8 rounded-xl shadow-md">

                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">

                        <FaPlusCircle className="text-blue-500" />

                        Add Expense

                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* Title */}
                        <div className="flex items-center border rounded-lg p-3 bg-gray-50">

                            <FaTags className="mr-3 text-gray-500" />

                            <input
                                type="text"
                                name="title"
                                placeholder="Eg: Pizza, Netflix, Bus Ticket"
                                value={expense.title}
                                onChange={handleChange}
                                className="outline-none w-full bg-transparent"
                                required
                            />

                        </div>

                        {/* Amount */}
                        <div className="flex items-center border rounded-lg p-3 bg-gray-50">

                            <FaMoneyBillWave className="mr-3 text-green-500" />

                            <input
                                type="number"
                                name="amount"
                                placeholder="Enter Amount"
                                value={expense.amount}
                                onChange={handleChange}
                                className="outline-none w-full bg-transparent"
                                required
                            />

                        </div>

                        {/* Category */}
                        <div className="border rounded-lg p-3 bg-gray-50">

                            <select
                                name="category"
                                value={expense.category}
                                onChange={handleChange}
                                className="outline-none w-full bg-transparent"
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

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

                        </div>

                        {/* Date */}
                        <div className="flex items-center border rounded-lg p-3 bg-gray-50">

                            <FaCalendarAlt className="mr-3 text-orange-500" />

                            <input
                                type="date"
                                name="date"
                                value={expense.date}
                                onChange={handleChange}
                                className="outline-none w-full bg-transparent"
                                required
                            />

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-lg md:col-span-2"
                        >

                            Add Expense

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddExpense;
