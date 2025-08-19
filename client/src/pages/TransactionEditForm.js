// client/src/pages/TransactionEditForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TransactionEditForm = ({ transactionToEdit, onTransactionUpdated, onCancelEdit }) => {
  const [formData, setFormData] = useState(transactionToEdit);

  const { description, amount, category, type } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const res = await axios.put(`${process.env.REACT_APP_API_URL}/transactions/${transactionToEdit._id}`, formData, config);
      onTransactionUpdated(res.data);
      console.log('Transaction updated:', res.data);
    } catch (err) {
      console.error('Failed to update transaction:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Edit Transaction</h3>
      <div>
        <input type="text" name="description" value={description} onChange={onChange} required />
      </div>
      <div>
        <input type="number" name="amount" value={amount} onChange={onChange} required />
      </div>
      <div>
        <input type="text" name="category" value={category} onChange={onChange} required />
      </div>
      <div>
        <select name="type" value={type} onChange={onChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancelEdit}>Cancel</button>
    </form>
  );
};

export default TransactionEditForm;