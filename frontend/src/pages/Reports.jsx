import { useEffect, useState } from "react";
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
  FaReceipt,
  FaTable
} from "react-icons/fa";

function Reports() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchExpenses = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const res = await getUserExpenses(email);
        if (isMounted) setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryData = [];

  expenses.forEach((e) => {
    const existing = categoryData.find((c) => c.name === e.category);
    if (existing) existing.value += Number(e.amount);
    else categoryData.push({ name: e.category, value: Number(e.amount) });
  });

  const total = expenses.reduce((a, b) => a + Number(b.amount), 0);

  const download = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Title", "Category", "Amount", "Date"]],
      body: expenses.map((e) => [
        e.title,
        e.category,
        e.amount,
        e.date
      ])
    });

    doc.save("report.pdf");
  };

  const COLORS = ["#06B6D4", "#3B82F6", "#8B5CF6", "#10B981"];

  return (
    <div className="w-full space-y-5 p-4 sm:p-5 md:space-y-6 md:p-8">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
            <FaChartPie className="text-cyan-400" /> Reports
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Review category totals and export your expense summary.
          </p>
        </div>

        <button
          onClick={download}
          className="shrink-0 flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-white"
        >
          <FaDownload />
          <span className="hidden sm:inline">Download PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">

        <div className="rounded-xl border border-white/10 bg-white/10 p-3">
          <FaReceipt className="mb-2 text-lg text-cyan-400" />
          <p className="text-xs text-slate-300">Expenses</p>
          <h2 className="mt-1 text-lg font-bold">
            {expenses.length}
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-3">
          <FaLayerGroup className="mb-2 text-lg text-violet-400" />
          <p className="text-xs text-slate-300">Categories</p>
          <h2 className="mt-1 text-lg font-bold">
            {categoryData.length}
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 p-3">
          <FaWallet className="mb-2 text-lg text-green-400" />
          <p className="text-xs text-slate-300">Spending</p>
          <h2 className="mt-1 text-lg font-bold truncate">
            ₹{total}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Pie Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
          <h2 className="mb-4 text-lg font-semibold">
            Category Split
          </h2>

          <div className="h-[220px] sm:h-[280px] md:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  outerRadius={80}
                >
                  {categoryData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
          <h2 className="mb-4 text-lg font-semibold">
            Category Comparison
          </h2>

          <div className="h-[220px] sm:h-[280px] md:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#06B6D4"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/10 p-3 sm:p-4">
        <h2 className="mb-3 flex items-center gap-2 font-semibold">
          <FaTable className="text-cyan-400" />
          Category Summary
        </h2>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {categoryData.map((c, i) => (
            <div
              key={i}
              className="rounded-xl bg-slate-800 p-3 border border-white/10"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">
                  {c.name}
                </span>

                <span className="font-bold text-cyan-400">
                  Rs. {c.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Amount</th>
              </tr>
            </thead>

            <tbody>
              {categoryData.map((c, i) => (
                <tr key={i}>
                  <td className="border-t border-white/10 py-2">
                    {c.name}
                  </td>

                  <td className="border-t border-white/10 py-2">
                    Rs. {c.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
