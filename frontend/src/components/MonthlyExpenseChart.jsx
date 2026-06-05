import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function MonthlyExpenseChart({ data }) {
  console.log("Chart Data:", data); // DEBUG

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-lg mt-6">

      <h2 className="text-xl font-bold mb-4 text-white">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data?.length ? data : []}>

          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            stroke="#ffffff"
          />

          {/* Y Axis */}
          <YAxis stroke="#ffffff" />

          {/* Tooltip */}
          <Tooltip />

          {/* Line Chart */}
          <Line
            type="monotone"
            dataKey="amount"   // IMPORTANT: must match backend key
            stroke="#a855f7"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyExpenseChart;
