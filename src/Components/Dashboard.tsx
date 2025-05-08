import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

interface Expense {
  name: string;
  amount: number;
}

interface Props {
  data: Expense[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

const PieChartView: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Expense Distribution</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
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
