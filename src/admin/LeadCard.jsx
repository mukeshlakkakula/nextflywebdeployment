"use client";

// LeadCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiDollarSign } from "react-icons/fi";

const LeadCard = ({ lead, onClick }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      new: "blue",
      contacted: "yellow",
      "proposal-sent": "purple",
      negotiating: "orange",
      won: "green",
      lost: "red",
    };
    return statusColors[status] || "gray";
  };

  return (
    <motion.div
      layoutId={lead.id}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
      whileHover={{ y: -2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.email}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium bg-${getStatusColor(
            lead.status
          )}-100 text-${getStatusColor(lead.status)}-800`}
        >
          {lead.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <FiPhone className="mr-2" />
          {lead.phone}
        </div>
        <div className="flex items-center text-gray-600">
          <FiDollarSign className="mr-2" />
          Quoted: ${lead.quotedPrice || "Not quoted"}
        </div>
      </div>

      {lead.notes && lead.notes[0] && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">{lead.notes[0].text}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(lead.notes[0].timestamp).toLocaleDateString()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default LeadCard;
