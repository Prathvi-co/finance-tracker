// client/src/pages/Dashboard.js

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransactionForm from './TransactionForm';
import TransactionEditForm from './TransactionEditForm';
import AuthContext from '../authContext';
import PieChart from './PieChart';
import backgroundImage from '../assets/financial-planning-image.jpg.jpg';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [summary, setSummary] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(4);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`, config);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete transaction:', err.response?.data || err.message);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const handleTransactionUpdated = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/transactions?page=${page}&limit=${limit}`,
          config
        );
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err.response?.data || err.message);
      }
    };

    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/transactions/summary`,
          config
        );
        setSummary(res.data);
      } catch (err) {
        console.error('Error fetching summary:', err.response?.data || err.message);
      }
    };

    fetchTransactions();
    fetchSummary();
  }, [page, limit]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm"></div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-lg shadow-md">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Dashboard</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Summary Section */}
          {summary && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Financial Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="text-2xl font-bold text-gray-800">₹{summary.balance.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">₹{summary.income.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₹{summary.expenses.toFixed(2)}</p>
                </div>
              </div>

              {/* Category + PieChart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-700">Spending by Category</h4>
                  <ul className="flex flex-col gap-2">
                    {summary.spendingByCategory.map((item) => (
                      <li
                        key={item._id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {item._id}: ₹{item.total.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Fix responsiveness for PieChart */}
                <div className="flex justify-center w-full">
                  <div className="w-56 sm:w-64 md:w-72">
                    <h4 className="text-lg font-semibold mb-2 text-gray-700 text-center">
                      Spending Distribution
                    </h4>
                    <PieChart spendingData={summary.spendingByCategory} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions + Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Add/Edit */}
            <div>
              {editingTransaction ? (
                <TransactionEditForm
                  transactionToEdit={editingTransaction}
                  onTransactionUpdated={handleTransactionUpdated}
                  onCancelEdit={handleCancelEdit}
                />
              ) : (
                <TransactionForm onTransactionAdded={handleTransactionAdded} />
              )}
            </div>

            {/* Right side: Transaction list */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">My Transactions</h3>
              <ul className="space-y-4">
                {transactions.map((transaction) => (
                  <li
                    key={transaction._id}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{transaction.description}</p>
                      <p
                        className={`text-sm ${
                          transaction.type === 'income'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        ₹{transaction.amount} ({transaction.type})
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg font-semibold">Page {page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
