// client/src/pages/AboutUs.js

import React from 'react';
import backgroundImage from '../assets/financial-planning-image.jpg.jpg'; // Ensure this path is correct

const AboutUs = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-4xl w-full bg-white/70 backdrop-blur-sm p-10 rounded-lg shadow-xl">
        <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          About Your Finance Tracker
        </h2>

        <p className="mb-6 text-gray-700 leading-relaxed text-center">
          Take control of your financial future with our intuitive and easy-to-use Finance Tracker.
          We empower you to monitor your income, track your expenses, and gain valuable insights into your spending habits, all in one place.
          Our goal is to provide you with the tools you need to achieve your financial goals.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-blue-900 border-b pb-2 text-center">
          Key Features to Help You Succeed:
        </h3>

        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <svg
              className="h-6 w-6 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-900">Effortless Transaction Tracking:</strong> Easily add your income and expenses with detailed descriptions, amounts, categories, and dates.
            </p>
          </li>

          <li className="flex items-center space-x-3">
            <svg
              className="h-6 w-6 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-900">Clear Dashboard Overview:</strong> Get an instant snapshot of your current balance and spending habits through our interactive dashboard.
            </p>
          </li>

          <li className="flex items-center space-x-3">
            <svg
              className="h-6 w-6 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-900">Detailed Financial Reports:</strong> Visualize your monthly spending trends with clear charts and reports, helping you make informed financial decisions.
            </p>
          </li>

          <li className="flex items-center space-x-3">
            <svg
              className="h-6 w-6 text-blue-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-lg text-gray-700">
              <strong className="text-blue-900">Secure User Profile:</strong> Manage your personal information and password securely within the application.
            </p>
          </li>
        </ul>

        {/* ✅ Restored CTA section */}
        <div className="mb-8 text-center mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Why Choose Us?</h3>
          <p className="text-gray-600">
            We're more than just an expense tracker. We’re your partner in building a confident and stress-free financial life.
            Whether you're budgeting for a vacation, saving for retirement, or just trying to stay on top of bills — we're here to help.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-transform transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
