import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserExpenses } from "../services/expenseService";

import {
    FaWallet,
    FaArrowDown,
    FaArrowUp,
    FaPiggyBank,
    FaSave,
    FaExclamationTriangle,
    FaLayerGroup,
    FaReceipt
} from "react-icons/fa";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);

    // ✅ USER NAME
    const userName = localStorage.getItem("userName");

    // -------------------------------
    // ✅ MONTHLY SALARY LOCK LOGIC
    // -------------------------------
    const salaryData = JSON.parse(localStorage.getItem("salaryData"));

    const currentMonth = new Date().getMonth();

    const isSameMonth =
        salaryData && salaryData.month === currentMonth;

    const [salary, setSalary] = useState(
        isSameMonth ? salaryData.value : ""
    );

    // Fetch Expenses
    const fetchExpenses = async () => {
        try {
            const email = localStorage.getItem("userEmail");
            const response = await getUserExpenses(email);
            setExpenses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // Save Salary (ONLY ONCE PER MONTH)
    const handleSaveSalary = () => {

        if (!salary) {
            alert("Please Enter Salary");
            return;
        }

        const salaryData = {
            value: salary,
            month: currentMonth
        };

        localStorage.setItem("salaryData", JSON.stringify(salaryData));

        alert("Monthly Salary Saved for this month");
        window.location.reload();
    };

    // Total Expense
    const totalExpense = expenses.reduce(
        (total, item) => total + Number(item.amount),
        0
    );

    // Balance
    const balanceAmount = Number(salary || 0) - totalExpense;
    const percentage =
    salary > 0
        ? Math.min(
              (totalExpense / Number(salary)) * 100,
              100
          )
        : 0;

const hour = new Date().getHours();

const greeting =
    hour < 12
        ? "Good Morning"
        : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

const categoryCount = {};

expenses.forEach((expense) => {
    categoryCount[expense.category] =
        (categoryCount[expense.category] || 0) + 1;
});

const topCategory =
    Object.keys(categoryCount).length > 0
        ? Object.keys(categoryCount).reduce((a, b) =>
              categoryCount[a] > categoryCount[b]
                  ? a
                  : b
          )
        : "N/A";

    // Highest Expense
    const highestExpense =
        expenses.length > 0
            ? Math.max(...expenses.map(item => Number(item.amount)))
            : 0;

    return (
        <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
             <div className="relative z-10">
    
                {/* Heading */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8">

    <h1 className="text-4xl font-bold text-white">
        Financial Dashboard
    </h1>

    <h2 className="text-xl font-semibold text-cyan-400 mt-2">
        {greeting}, {userName} 👋
    </h2>

    <p className="text-slate-300 mt-2">
        Track your monthly expenses professionally
    </p>

</div>

              {/* Salary Section */}
<div className="bg-white/10 p-6 rounded-2xl shadow-lg mb-8">

    <h2 className="text-2xl font-bold mb-3">
        Monthly Salary / Budget
    </h2>

    {/* ⚠️ WARNING MESSAGE */}
    {!isSameMonth && (
        <div className="bg-yellow-20 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded mb-4">
            ⚠️ Important: This salary will be locked for the current month.
            You can only change it next month or by using Reset Month option.
        </div>
    )}
    <div className="bg-gradient-to-r from-blue-20 to-purple-200 text-white p-6 rounded-2xl shadow-lg mb-8">

    <h2 className="text-2xl font-bold">
        Financial Health
    </h2>

    <p className="mt-2 text-blue-100">
        {
            balanceAmount >= 0
                ? "You are managing your expenses well this month."
                : "Your spending has exceeded your budget."
        }
    </p>

</div>
<div className="bg-white/10 p-6 rounded-2xl shadow-lg mb-8">

    <div className="flex justify-between mb-3">

        <h2 className="font-semibold text-lg">
            Budget Usage
        </h2>

        <span className="font-bold">
            {percentage.toFixed(0)}%
        </span>

    </div>

    <div className="w-full bg-gray-200 rounded-full h-4">

        <div
            className={`h-4 rounded-full transition-all duration-500 ${
                percentage < 50
                    ? "bg-green-500"
                    : percentage < 80
                    ? "bg-yellow-500"
                    : "bg-red-500"
            }`}
            style={{
                width: `${percentage}%`
            }}
        />

    </div>

</div>
    {/* INPUT SECTION */}
    {!isSameMonth ? (

        <div className="flex flex-col md:flex-row gap-4">

            <input
                type="number"
                placeholder="Enter Monthly Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border p-3 rounded-lg w-full focus:border-blue-500 outline-none"
            />

            <button
                onClick={handleSaveSalary}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition">
                Save Salary
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

                {/* small info */}
                <p className="text-sm text-gray-400 mt-2">
                    🔒 Locked for this month
                </p>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("salaryData");
                    window.location.reload();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
            >
                Reset Month
            </button>

        </div>

    )}

</div>

                {/* Budget Warning */}
                {salary && totalExpense > Number(salary) && (
                    <div className="bg-red-500 text-white p-5 rounded-xl mb-8 flex items-center gap-4 shadow-lg">

                        <FaExclamationTriangle className="text-3xl" />

                        <div>
                            <h2 className="text-xl font-bold">
                                Budget Limit Exceeded
                            </h2>
                            <p>Your expenses crossed your salary limit.</p>
                        </div>

                    </div>
                )}

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">

                    {/* Budget */}
                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                        <p className="text-gray-500">Total Budget</p>
                        <h2 className="text-3xl font-bold text-blue-500 mt-2">
                            ₹ {salary || 0}
                        </h2>
                        <FaWallet className="text-blue-500 text-3xl mt-3" />
                    </div>

                    {/* Expense */}
                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                        <p className="text-gray-500">Total Expense</p>
                        <h2 className="text-3xl font-bold text-red-500 mt-2">
                            ₹ {totalExpense}
                        </h2>
                        <FaArrowDown className="text-red-500 text-3xl mt-3" />
                    </div>

                    {/* Balance */}
                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                        <p className="text-gray-500">Balance</p>
                        <h2 className="text-3xl font-bold text-green-500 mt-2">
                            ₹ {balanceAmount}
                        </h2>
                        <FaPiggyBank className="text-green-500 text-3xl mt-3" />
                    </div>

                    {/* Highest */}
                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">
                        <p className="text-gray-500">Highest Expense</p>
                        <h2 className="text-3xl font-bold text-orange-500 mt-2">
                            ₹ {highestExpense}
                        </h2>
                        <FaArrowUp className="text-orange-500 text-3xl mt-3" />
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl shadow-lg">

    <p className="text-gray-500">
        Transactions
    </p>

    <h2 className="text-3xl font-bold text-purple-500 mt-2">
        {expenses.length}
    </h2>

    <FaReceipt className="text-purple-500 text-3xl mt-3" />

</div>
<div className="bg-white/10 p-6 rounded-2xl shadow-lg">

    <p className="text-gray-500">
        Top Category
    </p>

    <h2 className="text-2xl font-bold text-indigo-500 mt-2">
        {topCategory}
    </h2>

    <FaLayerGroup className="text-indigo-500 text-3xl mt-3" />

</div>

                </div>

                {/* Recent Expenses */}
                <div className="bg-white/10 rounded-2xl shadow-lg p-6">

                    <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold">
        Recent Expenses
    </h2>

    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
        {expenses.length} Records
    </span>

</div>

                    {expenses.length === 0 ? (
                        <div className="text-center py-12">

    <FaWallet className="text-6xl text-gray-300 mx-auto mb-4" />

    <h3 className="text-xl font-semibold text-gray-500">
        No Expenses Found
    </h3>

    <p className="text-gray-400 mt-2">
        Start adding expenses to track your spending.
    </p>

</div>
                    ) : (
                        <table className="w-full border-collapse">

                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-3">Title</th>
                                    <th className="border p-3">Amount</th>
                                    <th className="border p-3">Category</th>
                                    <th className="border p-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50">

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
                    )}

                </div>

            </div>

        </div>
    </div>
    );
}

export default Dashboard;