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

  console.log("Chart Data:", data);

  return (
    <div className="bg-white/10 p-4 sm:p-6 rounded-xl shadow-lg mt-6 w-full">

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-white">
        Monthly Expense Trend
      </h2>

      {/* Chart Wrapper */}
      <div className="w-full overflow-x-auto">

        <ResponsiveContainer width="100%" height={280}>

          <LineChart data={data?.length ? data : []}>

            <CartesianGrid strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              stroke="#ffffff"
              tick={{ fontSize: 12 }}
            />

            {/* Y Axis */}
            <YAxis
              stroke="#ffffff"
              tick={{ fontSize: 12 }}
            />

            {/* Tooltip */}
            <Tooltip />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default MonthlyExpenseChart;