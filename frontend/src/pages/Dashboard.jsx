import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUserExpenses } from "../services/expenseService";
import { saveSalary, getSalary } from "../services/salaryService";

import MonthlyExpenseChart
    from "../components/MonthlyExpenseChart";

import {
    getMonthlyChart
}
    from "../services/chartService";

import {
    FaWallet,
    FaArrowDown,
    FaArrowUp,
    FaPiggyBank,
    FaExclamationTriangle,
    FaLayerGroup,
    FaReceipt
} from "react-icons/fa";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [salary, setSalary] = useState("");
    const [salaryData, setSalaryData] = useState(null);

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    // =======================
    // SALARY LOCK LOGIC
    // =======================

    const currentMonth = new Date().getMonth() + 1;

    const currentYear = new Date().getFullYear();

    const isLocked =
        salaryData &&
        salaryData.month === currentMonth &&
        salaryData.year === currentYear;

    const displaySalary =
        salaryData?.amount || 0;

    // =======================
    // FETCH EXPENSES
    // =======================
    const fetchSalary = async () => {

        try {

            const response = await getSalary(userEmail);

            console.log(response.data);

            if (response.data) {
                setSalaryData(response.data);
            }

        } catch (error) {

            setSalaryData(null);

        }
    };
    const fetchExpenses = async () => {

        try {

            const response =
                await getUserExpenses(userEmail);

            setExpenses(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {

        fetchExpenses();
        fetchSalary();

    }, []);

    // =======================
    // SAVE SALARY (LOCK MONTH)
    // =======================
    const handleSaveSalary = async () => {

        if (!salary) {

            alert("Enter Salary");
            return;

        }

        try {

            const response = await saveSalary({
                email: userEmail,
                amount: salary
            });

            alert(response.data);

            setSalary("");

            fetchSalary(); // important

        } catch (error) {

            alert("Failed to save salary");

        }

    };
    // =======================
    // CALCULATIONS
    // =======================
    const totalExpense = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const balance =
        Number(displaySalary) - totalExpense;

    const percentage =
        displaySalary > 0
            ? Math.min(
                (totalExpense / displaySalary) * 100,
                100
            )
            : 0;

    const highestExpense =
        expenses.length > 0
            ? Math.max(
                ...expenses.map(
                    item => Number(item.amount)
                )
            )
            : 0;

    const transactionCount =
        expenses.length;

    const categoryCount = {};

    expenses.forEach((expense) => {

        categoryCount[expense.category] =
            (categoryCount[expense.category] || 0) + 1;

    });

    const topCategory =
        Object.keys(categoryCount).length > 0
            ? Object.keys(categoryCount).reduce(
                (a, b) =>
                    categoryCount[a] >
                        categoryCount[b]
                        ? a
                        : b
            )
            : "N/A";
    const hour =
        new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";


    const [chartData, setChartData] = useState([]);

    const loadChart = async () => {
        try {
            const email = localStorage.getItem("userEmail");

            const response = await getMonthlyChart(email);

            console.log("CHART API RESPONSE:", response.data); // DEBUG

            setChartData(response.data || []);  // FIX
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadChart();
    }, []); // MUST be empty dependency array
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
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl mb-6">

                    <h2 className="text-xl font-bold">
                        Financial Health
                    </h2>

                    <p>
                        {balance >= 0
                            ? "You are managing your expenses well."
                            : "Your spending exceeded your budget."
                        }
                    </p>

                </div>
                {/* ================= SALARY SECTION ================= */}
                <div className="bg-white/10 p-6 rounded-2xl mb-8">

                    <h2 className="text-2xl font-bold text-white mb-4">
                        Monthly Salary / Budget
                    </h2>

                    {!isLocked ? (

                        <div className="flex gap-4">

                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Enter Salary"
                                className="w-full p-3 rounded bg-white/10 text-white border border-white/20"
                            />

                            <button
                                onClick={handleSaveSalary}
                                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 text-white rounded"
                            >
                                Save Salary
                            </button>

                        </div>

                    ) : (

                        <div className="flex justify-between items-center bg-white/5 p-5 rounded-xl">

                            <div>

                                <p className="text-gray-400">
                                    Monthly Salary
                                </p>

                                <h2 className="text-4xl text-cyan-400">
                                    ₹ {displaySalary}
                                </h2>

                                <p className="text-green-400">
                                    🔒 Locked For This Month
                                </p>

                            </div>

                            <button
                                disabled
                                className="bg-gray-500 px-5 py-3 rounded text-white"
                            >
                                Locked
                            </button>

                        </div>

                    )}

                </div>
                {totalExpense > displaySalary && displaySalary > 0 && (

                    <div className="bg-red-500 text-white p-4 rounded-xl mb-6 flex items-center gap-3">

                        <FaExclamationTriangle size={24} />

                        <div>

                            <h2 className="font-bold">
                                Budget Exceeded
                            </h2>

                            <p>
                                You crossed your monthly salary limit.
                            </p>

                        </div>

                    </div>

                )}
                <div className="bg-white/10 p-5 rounded-2xl mb-8">

                    <div className="flex justify-between text-white mb-2">

                        <span>Budget Used</span>

                        <span>{percentage.toFixed(0)}%</span>

                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-4">

                        <div
                            className={`h-4 rounded-full ${percentage >= 90
                                    ? "bg-red-500"
                                    : percentage >= 70
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                            style={{
                                width: `${percentage}%`
                            }}
                        ></div>

                    </div>

                </div>
                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Budget</p>
                        <h2 className="text-2xl">₹ {displaySalary}</h2>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Expense</p>
                        <h2 className="text-2xl">₹ {totalExpense}</h2>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Balance</p>
                        <h2 className="text-2xl">₹ {balance}</h2>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Highest</p>
                        <h2 className="text-2xl">₹ {highestExpense}</h2>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Transactions</p>
                        <h2 className="text-2xl">
                            {transactionCount}
                        </h2>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg text-white">
                        <p>Top Category</p>
                        <h2 className="text-2xl">
                            {topCategory}
                        </h2>
                    </div>

                </div>
                <MonthlyExpenseChart
                    data={chartData}
                />

                {/* EXPENSE TABLE */}
                <div className="bg-white/10 p-6 rounded text-white">

                    <h2 className="text-xl mb-4">Recent Expenses</h2>

                    {expenses.length === 0 ? (
                        <p>No expenses found</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="border-b border-white/20 text-cyan-400">
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {expenses.map((e) => (
                                    <tr
                                        key={e.id}
                                        className="border-b border-white/10 hover:bg-white/5"
                                    >
                                        <td className="py-3">
                                            {e.title}
                                        </td>

                                        <td className="py-3 text-red-400 font-semibold">
                                            ₹ {e.amount}
                                        </td>

                                        <td className="py-3">
                                            {e.category}
                                        </td>

                                        <td className="py-3">
                                            {e.date}
                                        </td>
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