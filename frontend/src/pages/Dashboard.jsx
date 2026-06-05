import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserExpenses } from "../services/expenseService";

import { FaExclamationTriangle } from "react-icons/fa";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    // =======================
    // SALARY LOCK LOGIC
    // =======================
    const currentMonthKey =
        new Date().getFullYear() + "-" + new Date().getMonth();

    const salaryData = JSON.parse(localStorage.getItem("salaryData"));

    const isLocked =
        salaryData && salaryData.monthKey === currentMonthKey;

    const [salary, setSalary] = useState(
        isLocked ? salaryData.value : ""
    );

    const displaySalary = isLocked ? salaryData.value : salary;

    // =======================
    // FETCH EXPENSES
    // =======================
    const fetchExpenses = async () => {
        try {
            const res = await getUserExpenses(userEmail);
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    // =======================
    // SAVE SALARY (LOCK MONTH)
    // =======================
    const handleSaveSalary = () => {

        if (!salary) {
            alert("Enter salary");
            return;
        }

        const data = {
            value: salary,
            monthKey: currentMonthKey
        };

        localStorage.setItem("salaryData", JSON.stringify(data));

        alert("Salary locked for this month");
        window.location.reload();
    };

    // =======================
    // CALCULATIONS
    // =======================
    const totalExpense = expenses.reduce(
        (sum, e) => sum + Number(e.amount),
        0
    );

    const balance = Number(displaySalary || 0) - totalExpense;

    const percentage =
        displaySalary > 0
            ? Math.min((totalExpense / Number(displaySalary)) * 100, 100)
            : 0;

    const highestExpense =
        expenses.length > 0
            ? Math.max(...expenses.map(e => Number(e.amount)))
            : 0;

    const greeting =
        new Date().getHours() < 12
            ? "Good Morning"
            : new Date().getHours() < 18
            ? "Good Afternoon"
            : "Good Evening";

    // =======================
    // UI
    // =======================
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

                {/* HEADER */}
                <div className="bg-white/10 p-6 rounded-3xl mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Financial Dashboard
                    </h1>
                    <h2 className="text-xl text-cyan-400 mt-2">
                        {greeting}, {userName}
                    </h2>
                </div>

                {/* ================= SALARY SECTION ================= */}
                <div className="bg-white/10 p-6 rounded-2xl mb-8">

                    <h2 className="text-2xl font-bold text-white mb-4">
                        Monthly Salary / Budget
                    </h2>

                    {/* WARNING */}
                    {!isLocked && (
                        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
                            ⚠️ Salary can be set only once per month
                        </div>
                    )}

                    {/* FINANCIAL HEALTH */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded-xl mb-6">
                        <h2 className="font-bold">Financial Health</h2>
                        <p>
                            {balance >= 0
                                ? "You are managing well 👍"
                                : "Overspending detected ⚠️"}
                        </p>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mb-6">
                        <div className="flex justify-between text-white mb-2">
                            <span>Budget Usage</span>
                            <span>{percentage.toFixed(0)}%</span>
                        </div>

                        <div className="w-full bg-gray-300 h-3 rounded-full">
                            <div
                                className={`h-3 rounded-full ${
                                    percentage < 50
                                        ? "bg-green-500"
                                        : percentage < 80
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* INPUT / DISPLAY */}
                    {!isLocked ? (
                        <div className="flex gap-4">

                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Enter Salary"
                                className="w-full p-3 rounded bg-white/10 text-white"
                            />

                            <button
                                onClick={handleSaveSalary}
                                className="bg-cyan-500 px-6 py-3 text-white rounded"
                            >
                                Save
                            </button>

                        </div>
                    ) : (
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded">

                            <div>
                                <p className="text-gray-400">Monthly Salary</p>
                                <h2 className="text-3xl text-cyan-400">
                                    ₹ {displaySalary}
                                </h2>
                                <p className="text-green-400">🔒 Locked</p>
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("salaryData");
                                    window.location.reload();
                                }}
                                className="bg-red-500 px-4 py-2 text-white rounded"
                            >
                                Reset
                            </button>

                        </div>
                    )}

                </div>

                {/* WARNING */}
                {totalExpense > displaySalary && (
                    <div className="bg-red-500 text-white p-4 rounded mb-6 flex gap-3 items-center">
                        <FaExclamationTriangle size={24} />
                        <div>
                            <h2 className="font-bold">Budget Exceeded</h2>
                            <p>You crossed your monthly limit</p>
                        </div>
                    </div>
                )}

                {/* CARDS */}
                <div className="grid grid-cols-4 gap-6 mb-10 text-white">

                    <div className="bg-white/10 p-5 rounded">
                        <p>Budget</p>
                        <h2 className="text-2xl">₹ {displaySalary}</h2>
                    </div>

                    <div className="bg-white/10 p-5 rounded">
                        <p>Expense</p>
                        <h2 className="text-2xl">₹ {totalExpense}</h2>
                    </div>

                    <div className="bg-white/10 p-5 rounded">
                        <p>Balance</p>
                        <h2 className="text-2xl">₹ {balance}</h2>
                    </div>

                    <div className="bg-white/10 p-5 rounded">
                        <p>Highest</p>
                        <h2 className="text-2xl">₹ {highestExpense}</h2>
                    </div>

                </div>

                {/* EXPENSE TABLE */}
                <div className="bg-white/10 p-6 rounded text-white">

                    <h2 className="text-xl mb-4">Recent Expenses</h2>

                    {expenses.length === 0 ? (
                        <p>No expenses found</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                </tr>
                            </thead>

                            <tbody>
                                {expenses.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.title}</td>
                                        <td>₹ {e.amount}</td>
                                        <td>{e.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Dashboard;