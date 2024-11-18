// StatsCards.jsx
import React from 'react';
import { FiUsers, FiDollarSign, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiUsers className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
            <p className="text-2xl font-semibold text-gray-900">245</p>
          </div>
        </div>
      </div>
      
      {/* Add more stat cards */}
    </div>
  );
};

export default StatsCards;
