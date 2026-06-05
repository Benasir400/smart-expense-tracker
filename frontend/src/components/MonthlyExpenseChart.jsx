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

  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-lg mt-6">

      <h2 className="text-xl font-bold mb-4">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#141414"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyExpenseChart;