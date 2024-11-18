"use client";
// admin/EmailTemplates.jsx
import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState({
    name: "",
    subject: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const templatesRef = collection(db, "emailTemplates");
      await addDoc(templatesRef, {
        ...currentTemplate,
        createdAt: new Date(),
      });
      // Reset form and refresh templates
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Email Templates</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            value={currentTemplate.name}
            onChange={(e) =>
              setCurrentTemplate((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            value={currentTemplate.subject}
            onChange={(e) =>
              setCurrentTemplate((prev) => ({
                ...prev,
                subject: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            rows={6}
            value={currentTemplate.body}
            onChange={(e) =>
              setCurrentTemplate((prev) => ({
                ...prev,
                body: e.target.value,
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Template
        </button>
      </form>
    </div>
  );
};

export default EmailTemplates;
