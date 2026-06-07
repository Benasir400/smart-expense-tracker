import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";
import {
    FaArrowRight,
    FaExclamationTriangle,
    FaPlusCircle
} from "react-icons/fa";

import {
    getUserExpenses,
    getMonthlyChart
} from "../services/expenseService";

import {
    saveSalary,
    getSalary
} from "../services/salaryService";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [salaryData, setSalaryData] = useState(null);
    const [salaryInput, setSalaryInput] = useState("");

    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        if (!userEmail) return;

        let isMounted = true;

        const fetchDashboardData = async () => {
            const [expensesResult, chartResult, salaryResult] =
                await Promise.allSettled([
                    getUserExpenses(userEmail),
                    getMonthlyChart(userEmail),
                    getSalary(userEmail)
                ]);

            if (!isMounted) return;

            setExpenses(
                expensesResult.status === "fulfilled"
                    ? expensesResult.value.data || []
                    : []
            );
            setChartData(
                chartResult.status === "fulfilled"
                    ? chartResult.value.data || []
                    : []
            );
            setSalaryData(
                salaryResult.status === "fulfilled"
                    ? salaryResult.value.data || null
                    : null
            );
        };

        fetchDashboardData();

        return () => {
            isMounted = false;
        };
    }, [userEmail]);

    const totalExpense = useMemo(
        () => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
        [expenses]
    );

    const salary = salaryData?.amount || 0;
    const balance = salary - totalExpense;

    const percentage =
        salary > 0 ? Math.min((totalExpense / salary) * 100, 100) : 0;

    const isBudgetExceeded = salary > 0 && totalExpense > salary;

    const currentHour = new Date().getHours();
    const greeting =
        currentHour < 12
            ? "Good Morning"
            : currentHour < 18
                ? "Good Afternoon"
                : "Good Evening";

    const handleSaveSalary = async () => {
        if (!salaryInput) return alert("Enter salary");

        try {
            await saveSalary({
                email: userEmail,
                amount: salaryInput
            });

            setSalaryInput("");
            const res = await getSalary(userEmail);
            setSalaryData(res.data || null);
            alert("Salary saved");
        } catch {
            alert("Failed to save salary");
        }
    };

    return (
        <div className="w-full space-y-5 p-4 text-white sm:p-5 md:space-y-6 md:p-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold md:text-4xl">
                        Financial Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-cyan-400 sm:text-base">
                        {greeting}, {userName}
                    </p>
                </div>

                <Link
                    to="/add-expense"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] md:w-auto"
                >
                    <FaPlusCircle />
                    Add Expense
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 sm:p-5">
                <h2 className="font-bold mb-3">Monthly Salary</h2>

                {salary > 0 ? (
                    <div>
                        <p className="text-2xl font-bold sm:text-3xl">Rs. {salary}</p>
                        <p className="text-green-400 mt-1">Locked</p>
                    </div>
                ) : (
                    <div className="flex gap-2 flex-col md:flex-row">
                        <input
                            value={salaryInput}
                            onChange={(e) => setSalaryInput(e.target.value)}
                            placeholder="Enter salary"
                            className="p-2 rounded bg-black/30 border border-white/20 w-full"
                        />
                        <button
                            onClick={handleSaveSalary}
                            className="bg-blue-500 px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>

            {isBudgetExceeded && (
                <div className="bg-red-500 p-4 rounded-xl flex items-center gap-2">
                    <FaExclamationTriangle />
                    Budget Exceeded!
                </div>
            )}

            <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-5">
                <h2 className="font-bold">Financial Status</h2>
                <p>
                    {balance >= 0
                        ? "You are managing well"
                        : "Overspending detected"}
                </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 sm:p-5">
                <div className="flex justify-between mb-2">
                    <span>Budget Used</span>
                    <span>{percentage.toFixed(0)}%</span>
                </div>

                <div className="w-full bg-gray-700 h-3 rounded-full">
                    <div
                        className="h-3 bg-cyan-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white/10 p-3 sm:p-4">
                <MonthlyExpenseChart data={chartData} />
            </div>

            <div className="overflow-x-auto rounded-2xl bg-white/10 p-3 sm:p-4">
                <h2 className="mb-3 font-bold">Recent Expenses</h2>

                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="text-left border-b border-white/20">
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((e) => (
                            <tr key={e.id} className="border-b border-white/10">
                                <td>{e.title}</td>
                                <td>Rs. {e.amount}</td>
                                <td>{e.category}</td>
                                <td>{e.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
