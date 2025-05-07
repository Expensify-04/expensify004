<<<<<<< HEAD
import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="912996226246-9ja53kmbgrml5rmk4rh3uemvjfjqvtb0.apps.googleusercontent.com ">
      <RouterProvider router={AppRouter} />

      </GoogleOAuthProvider>
    </>
  );
}

export default App;
=======
import React, { useState } from 'react';
import Form from './Components/Form';
import PieChartView from './Components/Dashboard';

interface Expense {
  name: string;
  amount: number;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses((prev) => {
      const existing = prev.find(
        (e) => e.name.toLowerCase() === newExpense.name.toLowerCase()
      );

      if (existing) {
      
        return prev.map((e) =>
          e.name.toLowerCase() === newExpense.name.toLowerCase()
            ? { ...e, amount: e.amount + newExpense.amount }
            : e
        );
      }

      return [...prev, newExpense];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 drop-shadow-md">
        Expense Tracker Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-6xl">
        <div className="bg-white w-[400px] h-[400px] rounded-3xl shadow-2xl p-6 flex items-center">
          <Form onSubmit={handleAddExpense} />
        </div>

        <div className="bg-white w-[400px] h-[400px] rounded-3xl shadow-2xl p-6 flex items-center">
          <PieChartView data={expenses} />
        </div>
      </div>
    </div>
  );
};

export default App;

>>>>>>> f6ae1168b8e0a01984038d5a3ebce562284cb4d9
