// PieChartView.tsx
import React from "react";
import {PieChart, Pie, Tooltip, Cell, Legend} from "recharts";
import type {PieChartProps} from "../../Types/Types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

const PieChartView: React.FC<PieChartProps> = ({data}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div className="w-[400px]  h-full flex flex-col justify-center items-center ">
      <h2 className="mb-4 text-lg font-semibold text-cyan-600">Expense Distribution</h2>
      <PieChart width={280} height={280} className="relative right-3">
        <Pie data={data} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartView;
