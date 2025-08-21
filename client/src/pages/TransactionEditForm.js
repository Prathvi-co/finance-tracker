// client/src/pages/TransactionEditForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionEditForm = ({ transactionToEdit, onTransactionUpdated, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

  const { description, amount, category, type } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/transactions/${transactionToEdit._id}`,
        formData,
        config
      );

      onTransactionUpdated(res.data);
      console.log("Transaction updated:", res.data);
    } catch (err) {
      console.error(
        "Failed to update transaction:",
        err.response ? err.response.data : err.message
      );
    }
  };

  if (!transactionToEdit) return null; // prevent rendering if nothing to edit

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 border border-gray-300 bg-white rounded-lg shadow-lg space-y-3"
    >
      <h3 className="text-lg font-semibold">Edit Transaction</h3>

      <div>
        <input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
          required
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={onChange}
          required
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <input
          type="text"
          name="category"
          value={category}
          onChange={onChange}
          required
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <select
          name="type"
          value={type}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancelEdit}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionEditForm;
