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
    <div className="w-full rounded-xl bg-white/10 p-3 shadow-lg sm:p-5">

      {/* Title */}
      <h2 className="mb-4 text-lg font-bold text-white sm:text-xl">
        Monthly Expense Trend
      </h2>

      {/* Chart Wrapper */}
      <div className="h-[240px] w-full sm:h-[280px]">

        <ResponsiveContainer width="100%" height="100%">

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
