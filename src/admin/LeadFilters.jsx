// admin/leads/LeadFilters.jsx
"use client";
import React from "react";

const LeadFilters = ({ currentFilter, onFilterChange }) => {
  const statuses = [
    { value: "all", label: "All" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "proposal", label: "Proposal Sent" },
    { value: "won", label: "Won" },
    { value: "lost", label: "Lost" },
  ];

  return (
    <select
      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
      value={currentFilter}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default LeadFilters;
