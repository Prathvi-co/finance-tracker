// server/routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    const newTransaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      category,
      type,
      date: date || Date.now(),
    });
    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET /api/transactions
// @desc    Get all transactions for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skipIndex = (page - 1) * limit;

    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip(skipIndex)
      .limit(limit);

    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete' });
    }

    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to update' });
    }

    transaction.description = description || transaction.description;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.type = type || transaction.type;
    transaction.date = date || transaction.date;

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET /api/transactions/summary
// @desc    Get summary of transactions for dashboard
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    const income = summary.find(s => s._id === 'income') || { total: 0 };
    const expenses = summary.find(s => s._id === 'expense') || { total: 0 };
    const balance = income.total - expenses.total;
    const spendingByCategory = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id), type: 'expense' } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.json({ balance, income: income.total, expenses: expenses.total, spendingByCategory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET /api/transactions/reports
// @desc    Get monthly spending reports by category
// @access  Private
router.get('/reports', auth, async (req, res) => {
  try {
    const monthlySpending = await Transaction.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id), type: 'expense' } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            category: '$category',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 },
      },
    ]);

    res.json(monthlySpending);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;