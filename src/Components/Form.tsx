import React, { useState } from 'react';

interface FormProps {
  onSubmit: (personName: string, expense: { name: string; amount: number }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [personName, setPersonName] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName || !expenseName || !amount) return;

    onSubmit(personName, {
      name: expenseName,
      amount: parseFloat(amount),
    });

    setPersonName('');
    setExpenseName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full  ">
      <div className="mb-4">
        <label className="block mb-1 font-bold text-cyan-600">Name</label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full border  px-3 py-2 rounded outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-bold text-cyan-600 ">Expense</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="w-full border px-3 py-2 rounded outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block font-bold text-cyan-600 mb-1 ">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded outline-none "
        />
      </div>

      <button type="submit" className="w-full bg-cyan-500 cursor-pointer text-white py-2 rounded hover:bg-cyan-600">
        Add Expense
      </button>
    </form>
  );
};

export default Form;
