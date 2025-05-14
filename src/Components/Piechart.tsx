import React, { useState } from "react";
import Form from "./Form";
import PieChartView from "./Dashboard";
import Navbar from "./Common/Navbar";
import Modal from "./Modal"; 

interface SingleExpense {
  name: string;
  amount: number;
}

interface PersonExpenses {
  personName: string;
  expenses: SingleExpense[];
  limit: number;
}

const Piechart: React.FC = () => {
  const [peopleExpenses, setPeopleExpenses] = useState<PersonExpenses[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = (
    personName: string,
    expense: SingleExpense,
    limit: number
  ) => {
    setPeopleExpenses((prev) => {
      const person = prev.find(
        (p) => p.personName.toLowerCase() === personName.toLowerCase()
      );

      const totalSpent = person
        ? person.expenses.reduce((sum, e) => sum + e.amount, 0)
        : 0;

      const newTotal = totalSpent + expense.amount;

      if (newTotal > limit) {
        alert(`❗ Cannot add ₹${expense.amount}. Limit of ₹${limit} will be exceeded.`);
        return prev;
      }

      if (person) {
        return prev.map((p) =>
          p.personName.toLowerCase() === personName.toLowerCase()
            ? {
                ...p,
                expenses: [...p.expenses, expense],
                limit: p.limit, 
              }
            : p
        );
      } else {
        return [...prev, { personName, expenses: [expense], limit }];
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar />

      <div className="min-h-screen pt-24 flex flex-col items-center px-4 py-8">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6">Lets Track</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          ➕ Add Expense
        </button>

     
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Form
            onSubmit={(personName, expense, limit) => {
              handleAddExpense(personName, expense, limit);
              setIsModalOpen(false);
            }}
          />
        </Modal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 px-10">
          {peopleExpenses.map((person, index) => {
            const totalSpent = person.expenses.reduce(
              (sum, e) => sum + e.amount,
              0
            );

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-6 h-[400px] flex flex-col items-center"
              >
                <h2 className="text-xl font-bold text-cyan-600">{person.personName}</h2>

                <div className="text-sm text-gray-600 mt-2 text-center">
                  Limit: ₹{person.limit} <br />
                  Spent: ₹{totalSpent} <br />
                  Remaining: ₹{person.limit - totalSpent}
                </div>

                <PieChartView data={person.expenses} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Piechart;
