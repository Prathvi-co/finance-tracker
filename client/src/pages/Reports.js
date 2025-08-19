// client/src/pages/Reports.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import AuthContext from '../authContext';
import backgroundImage from '../assets/financial-planning-image.jpg.jpg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions/reports`, config);

        const aggregatedData = res.data.reduce((acc, curr) => {
          const key = `${curr._id.year}-${String(curr._id.month).padStart(2, '0')}`;
          if (!acc[key]) {
            acc[key] = { ...curr, total: 0 };
          }
          acc[key].total += curr.total;
          return acc;
        }, {});

        setReportData(Object.values(aggregatedData));
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    if (isAuthenticated) {
      fetchReports();
    }
  }, [isAuthenticated]);

  const chartLabels = reportData?.map(
    (d) => `${d._id.year}-${String(d._id.month).padStart(2, '0')}`
  );
  const chartData = reportData?.map((d) => d.total);

  const monthlyExpensesChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: chartData,
        backgroundColor: 'rgba(30, 64, 175, 0.7)', // Dark blue
        borderRadius: 6,
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-6">
          Financial Reports
        </h2>

        {!reportData ? (
          <p className="text-center text-gray-700">Loading financial reports...</p>
        ) : (
          <div className="w-full">
            <div className="bg-white bg-opacity-90 p-4 md:p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                Monthly Spending Overview
              </h3>
              <div className="w-full h-[300px] md:h-[400px]">
                <Bar
                  data={monthlyExpensesChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#1e3a8a', // Dark blue
                        },
                      },
                      x: {
                        ticks: {
                          color: '#1e3a8a',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
