import React, { useState } from "react";

import Form from "./Form";
import PieChartView from "./Dashboard";
import Navbar from "./Common/Navbar";

interface SingleExpense {
  name: string;
  amount: number;
}

interface PersonExpenses {
  personName: string;
  expenses: SingleExpense[];
}

const Piechart: React.FC = () => {
  const [peopleExpenses, setPeopleExpenses] = useState<PersonExpenses[]>([]);

  const handleAddExpense = (personName: string, expense: SingleExpense) => {
    setPeopleExpenses((prev) => {
      const person = prev.find(
        (p) => p.personName.toLowerCase() === personName.toLowerCase()
      );

      if (person) {
        const existingExpense = person.expenses.find(
          (e) => e.name.toLowerCase() === expense.name.toLowerCase()
        );

        if (existingExpense) {
          // Update amount if expense already exists
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
          // Add new expense
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

      // New person
      return [...prev, { personName, expenses: [expense] }];
    });
  };

  return (
    
    <div className="flex w-[100%]">
      <Navbar/>
      <div>
        <div className="min-h-screen bg-gradient-to-br mt-16 ml-5  flex flex-col items-center px-4 py-8 ">
          <h1 className="text-4xl font-bold text-cyan-700  mb-6 drop-shadow-md">
            Expense Tracker
          </h1>

          <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-6xl  ">
            <div className=" w-[400px] h-[400px] rounded-3xl shadow-2xl   p-6 flex items-center">
              {/* <Form onSubmit={handleAddExpense} /> */}
              <Form onSubmit={handleAddExpense} />
            </div>
          </div>
        </div>
        </div>

        <div>
          <div className="grid grid-cols-3  mt-36 gap-8 ">
            {peopleExpenses.map((person, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-6 h-[400px] flex flex-col items-center"
              >
                <h2 className="text-xl font-bold text-cyan-600 ">
                  {person.personName}
                </h2>
                <PieChartView data={person.expenses} />
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default Piechart;
