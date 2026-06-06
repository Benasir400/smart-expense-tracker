import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import { getUserExpenses } from "../services/expenseService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FaDownload,
  FaChartPie,
  FaWallet,
  FaLayerGroup,
  FaReceipt
} from "react-icons/fa";

function Reports() {
  const [expenses, setExpenses] = useState([]);

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

  const categoryData = [];

  expenses.forEach((expense) => {
    const existing = categoryData.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += Number(expense.amount);
    } else {
      categoryData.push({
        name: expense.category,
        value: Number(expense.amount)
      });
    }
  });

  const totalAmount = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Expense Report", 14, 20);

    const tableColumn = ["Title", "Category", "Amount", "Date"];
    const tableRows = [];

    expenses.forEach((expense) => {
      tableRows.push([
        expense.title,
        expense.category,
        `₹ ${expense.amount}`,
        expense.date
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save("Expense_Report.pdf");
  };

  const COLORS = [
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899"
  ];

  return (
    <div className="flex flex-col md:flex-row">

      {/* Sidebar */}
       {/* <div className="hidden md:flex w-72 bg-slate-950 border-r border-slate-800"> */}
        <Sidebar />
      

      {/* Main */}
      <div className="flex-1 min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10">

          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6 mb-6 md:mb-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center shadow-lg">

            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-3">
                <FaChartPie className="text-cyan-400" />
                Expense Reports
              </h1>

              <p className="text-slate-300 mt-2 text-sm md:text-base">
                Visual analytics of your expenses
              </p>
            </div>

            <button
              onClick={downloadReport}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition text-sm md:text-base"
            >
              <FaDownload />
              Download
            </button>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6">
              <FaReceipt className="text-cyan-400 text-2xl md:text-3xl mb-3" />
              <p className="text-slate-300 text-sm md:text-base">Total Expenses</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                {expenses.length}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6">
              <FaLayerGroup className="text-purple-400 text-2xl md:text-3xl mb-3" />
              <p className="text-slate-300 text-sm md:text-base">Categories</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                {categoryData.length}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-6">
              <FaWallet className="text-green-400 text-2xl md:text-3xl mb-3" />
              <p className="text-slate-300 text-sm md:text-base">Total Spending</p>
              <h2 className="text-2xl md:text-3xl font-bold text-green-400 mt-2">
                ₹ {totalAmount}
              </h2>
            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Pie */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Category Wise Expenses
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                Expense Comparison
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#06B6D4" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Table */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-3xl shadow-lg mt-8 overflow-x-auto">

            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              Expense Summary
            </h2>

            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-3 text-white">Category</th>
                  <th className="p-3 text-white">Total Amount</th>
                </tr>
              </thead>

              <tbody>
                {categoryData.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition">
                    <td className="p-3 text-slate-200">{item.name}</td>
                    <td className="p-3 text-cyan-400 font-semibold">
                      ₹ {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Reports;