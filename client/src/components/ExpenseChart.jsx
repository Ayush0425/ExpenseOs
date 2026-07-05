import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f97316",
  "#eab308",
  "#a855f7",
  "#ef4444",
];

function ExpenseChart({ data }) {
  const chartData = data.map((item) => ({
    name: item._id,
    value: item.total,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Expense By Category
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;