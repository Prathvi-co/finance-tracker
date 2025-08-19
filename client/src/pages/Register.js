// client/src/pages/Register.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../authContext';
import { Link } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(''); // <-- NEW STATE

  const { name, email, password } = formData;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setEmailError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
      console.log('Registration successful:', res.data);
      login(res.data.token);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration failed:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-serif">Register</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 font-serif">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 font-serif"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-serif">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className={`mt-1 block w-full p-2 border rounded-lg shadow-sm font-serif ${emailError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 font-serif">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 font-serif"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 font-serif"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 font-serif">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;