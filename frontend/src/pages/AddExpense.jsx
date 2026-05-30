import { useState } from "react";

import { addExpense }
from "../services/expenseService";

import {
    FaMoneyBillWave,
    FaTags,
    FaCalendarAlt,
    FaPlusCircle,
    FaPhone,
    FaWallet
} from "react-icons/fa";

function AddExpense() {

    const [expense, setExpense] =
        useState({
            title: "",
            amount: "",
            category: "",
            date: "",
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

            await addExpense(expense);

            alert(
                "Expense Added Successfully"
            );

            setExpense({
                title: "",
                amount: "",
                category: "",
                date: "",
                budget: "",
                phoneNumber: ""
            });

        } catch (error) {

            console.log(error);

            alert("Error Adding Expense");
        }
    };

    return (

        <div className="p-5 bg-white shadow rounded m-5">

            {/* Heading */}
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">

                <FaPlusCircle
                    className="text-blue-500"
                />

                Add Expense

            </h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

                {/* Title */}
                <div className="flex items-center border rounded p-3">

                    <FaTags
                        className="mr-3 text-gray-500"
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Eg: Pizza, Bus Ticket, Netflix"
                        value={expense.title}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

                {/* Amount */}
                <div className="flex items-center border rounded p-3">

                    <FaMoneyBillWave
                        className="mr-3 text-green-500"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

                {/* Category */}
                <div className="flex items-center border rounded p-3">

                    <FaTags
                        className="mr-3 text-purple-500"
                    />

                    <select
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        className="outline-none w-full"
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
                <div className="flex items-center border rounded p-3">

                    <FaCalendarAlt
                        className="mr-3 text-orange-500"
                    />

                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

               

                {/* Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded md:col-span-2 flex items-center justify-center gap-2 text-lg"
                >

                    <FaPlusCircle />

                    Add Expense

                </button>

            </form>

        </div>
    );
}

export default AddExpense;
