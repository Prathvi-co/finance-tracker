
const dotenv = require('dotenv');
dotenv.config();
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Import the auth routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
console.log('Transaction Routes loaded:', transactionRoutes); 




const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});
app.use('/api/transactions', transactionRoutes);

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('API is running...');
});