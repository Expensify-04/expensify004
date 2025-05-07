import React, { useState } from 'react';
import Form from './Components/Form';
import PieChartView from './Components/Dashboard';

interface SingleExpense {
  name: string;
  amount: number;
}

interface PersonExpenses {
  personName: string;
  expenses: SingleExpense[];
}

const App: React.FC = () => {
  const [peopleExpenses, setPeopleExpenses] = useState<PersonExpenses[]>([]);

  const handleAddExpense = (
    personName: string,
    expense: SingleExpense
  ) => {
    setPeopleExpenses((prev) => {
      const person = prev.find(
        (p) => p.personName.toLowerCase() === personName.toLowerCase()
      );

      if (person) {
        const existingExpense = person.expenses.find(
          (e) => e.name.toLowerCase() === expense.name.toLowerCase()
        );

        if (existingExpense) {
          return prev.map((p) =>
            p.personName.toLowerCase() === personName.toLowerCase()
              ? {
                  ...p,
                  expenses: p.expenses.map((e) =>
                    e.name.toLowerCase() === expense.name.toLowerCase()
                      ? { ...e, amount: e.amount + expense.amount }
                      : e
                  ),
                }
              : p
          );
        } else {
          return prev.map((p) =>
            p.personName.toLowerCase() === personName.toLowerCase()
              ? {
                  ...p,
                  expenses: [...p.expenses, expense],
                }
              : p
          );
        }
      }

      return [...prev, { personName, expenses: [expense] }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 drop-shadow-md">
        Multi-Person Expense Tracker
      </h1>

      <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-6xl mb-10">
        <div className="bg-white w-[400px] h-[400px] rounded-3xl shadow-2xl p-6 flex items-center">
          <Form onSubmit={handleAddExpense} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {peopleExpenses.map((person, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl p-6 w-full h-[400px] flex flex-col items-center"
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">{person.personName}</h2>
            <PieChartView data={person.expenses} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
