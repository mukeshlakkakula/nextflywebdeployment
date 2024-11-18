// src/admin/LeadForm.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeadForm = () => {
  // const navigate = useRouter();
  const navigate = useRouter(); // For programmatic navigation
  const { id } = useParams();

  console.log("idparam", navigate, id);
  const isEditing = Boolean(id);

  // Form States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Initial Form State
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    source: "website",
    status: "new",
    projectStartDate: null,
    projectEndDate: null,
    projectStatus: "not_started",
    projectLink: "",
    projectNotes: "",
    proposedCost: "",
    proposalLink: "",
    proposalNotes: "",
    proposalStatus: "pending",
    proposalDate: null,
    lastContactDate: null,
    nextFollowUpDate: null,
    followUpNotes: "",
    internalNotes: "",
    assignedTo: "",
    tags: [],
    priority: "medium",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Date Conversion Utility
  const convertFirestoreTimestamp = (timestamp) => {
    if (!timestamp) return null;
    try {
      if (timestamp?.toDate) {
        return timestamp.toDate();
      }
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error("Date conversion error:", error);
      return null;
    }
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.phone?.trim()) {
      errors.phone = "Phone is required";
    }

    if (formData.projectStartDate && formData.projectEndDate) {
      if (formData.projectEndDate < formData.projectStartDate) {
        errors.projectEndDate = "End date cannot be before start date";
      }
    }

    // Budget validation
    if (formData.budget) {
      const budgetNum = parseFloat(formData.budget);
      if (isNaN(budgetNum) || budgetNum < 0) {
        errors.budget = "Budget must be a valid positive number";
      }
    }

    return errors;
  };

  // Fetch Lead Data
  useEffect(() => {
    const fetchLead = async () => {
      if (!isEditing) return;

      setLoading(true);
      setError(null);

      try {
        const leadDoc = await getDoc(doc(db, "leads", id));
        if (!leadDoc.exists()) {
          throw new Error("Lead not found");
        }

        const leadData = leadDoc.data();

        // Convert all date fields
        const convertedData = {
          ...leadData,
          projectStartDate: convertFirestoreTimestamp(
            leadData.projectStartDate
          ),
          projectEndDate: convertFirestoreTimestamp(leadData.projectEndDate),
          proposalDate: convertFirestoreTimestamp(leadData.proposalDate),
          lastContactDate: convertFirestoreTimestamp(leadData.lastContactDate),
          nextFollowUpDate: convertFirestoreTimestamp(
            leadData.nextFollowUpDate
          ),
        };

        setFormData(convertedData);
      } catch (err) {
        console.error("Error fetching lead:", err);
        setError(err.message || "Error loading lead data");
        toast.error(err.message || "Error loading lead data");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, isEditing]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when field is modified
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle Date Changes
  const handleDateChange = (date, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: date,
    }));

    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataToSave = {
        ...formData,
        modifiedAt: new Date(),
        modifiedBy: "admin", // Replace with actual user info
      };

      if (!isEditing) {
        dataToSave.createdAt = new Date();
      }

      if (isEditing) {
        await updateDoc(doc(db, "leads", id), dataToSave);
        toast.success("Lead updated successfully");
      } else {
        await addDoc(collection(db, "leads"), dataToSave);
        toast.success("Lead created successfully");
      }

      navigate.push("/admin/leads");
    } catch (err) {
      console.error("Error saving lead:", err);
      setError(err.message || "Error saving lead");
      toast.error(err.message || "Error saving lead");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Lead" : "Create New Lead"}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate.push("/admin/leads")}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Lead"
                : "Create Lead"}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                    validationErrors.name ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                    validationErrors.email ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Date Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project Start Date
                </label>
                <DatePicker
                  selected={formData.projectStartDate}
                  onChange={(date) =>
                    handleDateChange(date, "projectStartDate")
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  dateFormat="MM/dd/yyyy"
                  isClearable
                  placeholderText="Select start date"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Project End Date
                </label>
                <DatePicker
                  selected={formData.projectEndDate}
                  onChange={(date) => handleDateChange(date, "projectEndDate")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  dateFormat="MM/dd/yyyy"
                  isClearable
                  placeholderText="Select end date"
                  autoComplete="off"
                  minDate={formData.projectStartDate}
                />
                {validationErrors.projectEndDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.projectEndDate}
                  </p>
                )}
              </div>

              {/* Continue inside the first grid div after the date fields */}

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                    validationErrors.phone ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Budget Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 ${
                    validationErrors.budget ? "border-red-500" : ""
                  }`}
                />
                {validationErrors.budget && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.budget}
                  </p>
                )}
              </div>

              {/* Source Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social_media">Social Media</option>
                  <option value="email">Email Campaign</option>
                  <option value="cold_call">Cold Call</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lead Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal Sent</option>
                  <option value="negotiation">In Negotiation</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              {/* Priority Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Assigned To Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Tags Field */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={(formData.tags || []).join(", ")}
                  onChange={(e) => {
                    const tagsArray = e.target.value
                      .split(",")
                      .map((tag) => tag.trim());
                    setFormData((prev) => ({
                      ...prev,
                      tags: tagsArray,
                    }));
                  }}
                  placeholder="Enter tags separated by commas"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Project Details Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Project Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Project Status
                    </label>
                    <select
                      name="projectStatus"
                      value={formData.projectStatus}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="on_hold">On Hold</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Project Link
                    </label>
                    <input
                      type="url"
                      name="projectLink"
                      value={formData.projectLink || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Project Notes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Notes
                    </label>
                    <textarea
                      name="projectNotes"
                      value={formData.projectNotes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Proposal Details Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Proposal Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Proposed Cost */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proposed Cost
                    </label>
                    <input
                      type="number"
                      name="proposedCost"
                      value={formData.proposedCost || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Proposal Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proposal Status
                    </label>
                    <select
                      name="proposalStatus"
                      value={formData.proposalStatus}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="revision_needed">Revision Needed</option>
                    </select>
                  </div>

                  {/* Proposal Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proposal Date
                    </label>
                    <DatePicker
                      selected={formData.proposalDate}
                      onChange={(date) =>
                        handleDateChange(date, "proposalDate")
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      dateFormat="MM/dd/yyyy"
                      isClearable
                      placeholderText="Select proposal date"
                      autoComplete="off"
                    />
                  </div>

                  {/* Proposal Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Proposal Link
                    </label>
                    <input
                      type="url"
                      name="proposalLink"
                      value={formData.proposalLink || ""}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Proposal Notes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Proposal Notes
                    </label>
                    <textarea
                      name="proposalNotes"
                      value={formData.proposalNotes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Follow-up Details Section */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Follow-up Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Last Contact Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Contact Date
                    </label>
                    <DatePicker
                      selected={formData.lastContactDate}
                      onChange={(date) =>
                        handleDateChange(date, "lastContactDate")
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      dateFormat="MM/dd/yyyy"
                      isClearable
                      placeholderText="Select last contact date"
                      autoComplete="off"
                      maxDate={new Date()}
                    />
                  </div>

                  {/* Next Follow-up Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Next Follow-up Date
                    </label>
                    <DatePicker
                      selected={formData.nextFollowUpDate}
                      onChange={(date) =>
                        handleDateChange(date, "nextFollowUpDate")
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      dateFormat="MM/dd/yyyy"
                      isClearable
                      placeholderText="Select next follow-up date"
                      autoComplete="off"
                      minDate={new Date()}
                    />
                  </div>

                  {/* Follow-up Notes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Follow-up Notes
                    </label>
                    <textarea
                      name="followUpNotes"
                      value={formData.followUpNotes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Internal Notes
                </label>
                <textarea
                  name="internalNotes"
                  value={formData.internalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Add any internal notes or comments..."
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// CSS for DatePicker
const datePickerStyles = `
.react-datepicker-wrapper {
  display: block;
  width: 100%;
}

.react-datepicker__input-container {
  display: block;
  width: 100%;
}

.react-datepicker__input-container input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = datePickerStyles;
document.head.appendChild(styleSheet);

export default LeadForm;
