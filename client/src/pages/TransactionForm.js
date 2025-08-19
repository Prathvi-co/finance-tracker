// client/src/pages/TransactionForm.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../authContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TransactionForm = ({ onTransactionAdded }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { description, amount, category, type } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      console.error('Please log in to add a transaction.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const transactionData = { ...formData, date: selectedDate };

      const res = await axios.post('http://localhost:5000/api/transactions', transactionData, config);
      onTransactionAdded(res.data);
      console.log('Transaction added:', res.data);
      setFormData({ description: '', amount: '', category: '', type: 'expense' });
      setSelectedDate(new Date());
    } catch (err) {
      console.error('Failed to add transaction:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add a new transaction</h3>
      <div>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={onChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={amount}
          onChange={onChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={category}
          onChange={onChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <select
          name="type"
          value={type}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;