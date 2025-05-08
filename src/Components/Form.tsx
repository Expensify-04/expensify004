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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Expense</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default Form;
