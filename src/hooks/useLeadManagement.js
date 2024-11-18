// useLeadManagement.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config.js";
import confetti from "canvas-confetti";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const useLeadManagement = () => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [isDiscountEligible, setIsDiscountEligible] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);
  const [leads, setLeads] = useState([]);

  // useLeadManagement.js

  const sendEmail = async (emailData) => {
    try {
      const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({
          sender: {
            name: "FlyYourTech",
            email: "flyyourtech@gmail.com",
          },
          to: emailData.to,
          subject: emailData.subject,
          htmlContent: emailData.htmlContent, // Changed from templateId to htmlContent
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email");
      }

      return await response.json();
    } catch (error) {
      console.error("Email sending failed:", error);
      throw error;
    }
  };

  const sendClientEmail = async (data, discountCode) => {
    const emailData = {
      to: [{ email: data.email, name: data.name }],
      subject: discountCode
        ? "Your 10% Discount Code Inside! 🎉"
        : "Thank You for Your Interest!",
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #913bfe;">FlyYourTech</h1>
        </div>

        <div style="background: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 30px;">
          <h2 style="color: #913bfe; margin-top: 0; margin-bottom: 20px;">
            ${
              discountCode
                ? "🎉 Your Early Bird Discount is Here!"
                : "Thank You for Choosing FlyYourTech!"
            }
          </h2>
          
          <p style="color: #444; line-height: 1.6;">
            Dear ${data.name},
          </p>
          
          <p style="color: #444; line-height: 1.6;">
            ${
              discountCode
                ? `We're excited to offer you an exclusive 10% early bird discount on your project! Use the code below during our discussion:`
                : `Thank you for reaching out to us! We're excited to learn more about your project and how we can help bring your vision to life.`
            }
          </p>

          ${
            discountCode
              ? `
            <div style="background: #913bfe; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 20px; font-weight: bold;">${discountCode}</p>
            </div>
          `
              : ""
          }

          <div style="background: white; border-radius: 5px; padding: 20px; margin-top: 20px;">
            <h3 style="color: #913bfe; margin-top: 0;">Project Details</h3>
            <p style="color: #444;"><strong>Services:</strong> ${
              data.services
            }</p>
            ${
              data.message
                ? `<p style="color: #444;"><strong>Message:</strong> ${data.message}</p>`
                : ""
            }
          </div>
        </div>

        <div style="margin-top: 20px;">
          <p style="color: #666;">Need assistance? Contact us:</p>
          <p style="color: #666;">Email: flyyourtech@gmail.com</p>
          <p style="color: #666;">Phone: +917470391011</p>
          
          <!-- WhatsApp Contact Button -->
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://wa.me/917470391011" style="display: inline-block; text-decoration: none;">
              <div style="background-color: #25D366; color: white; padding: 10px 20px; border-radius: 5px; display: flex; align-items: center; justify-content: center; max-width: 200px; margin: 0 auto;">

               <svg  style="width: 20px; height: 20px; margin-right: 8px; xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                <span style="font-weight: bold;">Chat on WhatsApp</span>
              </div>
            </a>
          </div>
        </div>

   
      </div>
    `,
    };

    return sendEmail(emailData);
  };

  const sendAdminEmail = async (data, leadData) => {
    const emailData = {
      to: [{ email: "flyyourtech@gmail.com", name: "Admin" }],
      subject: `New Lead: ${data.name} ${
        leadData.isDiscountEligible ? "(Early Bird)" : ""
      }`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #913bfe;">New Lead Alert! 🎯</h1>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #913bfe; margin-top: 0;">Lead Information</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #913bfe; margin-top: 0;">Project Details</h2>
          <p><strong>Services Required:</strong> ${data.services}</p>
          ${
            data.message
              ? `<p><strong>Message:</strong> ${data.message}</p>`
              : ""
          }
          <p><strong>Early Bird Eligible:</strong> ${
            leadData.isDiscountEligible ? "Yes" : "No"
          }</p>
          ${
            leadData.discountCode
              ? `<p><strong>Discount Code:</strong> ${leadData.discountCode}</p>`
              : ""
          }
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <h2 style="color: #913bfe; margin-top: 0;">Technical Details</h2>
          <p><strong>Source:</strong> ${leadData.source}</p>
          <p><strong>Device Info:</strong></p>
          <pre style="background: #fff; padding: 10px; border-radius: 3px; overflow-x: auto;">
            ${JSON.stringify(leadData.deviceInfo, null, 2)}
          </pre>
        </div>
      </div>
    `,
    };

    return sendEmail(emailData);
  };

  const fetchLeadsCount = async () => {
    try {
      setLoading(true);
      const leadsRef = collection(db, "leads");
      const leadsSnapshot = await getDocs(leadsRef);
      const count = leadsSnapshot.size;

      setTotalLeads(count);
      setRemainingSlots(Math.max(0, 20 - count));
      setIsDiscountEligible(count < 20);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to fetch leads count");
    } finally {
      setLoading(false);
    }
  };

  const saveLead = async (formData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Save lead to Firebase
      const leadData = {
        ...formData,
        createdAt: new Date(),
        isDiscountEligible,
        discountCode: isDiscountEligible
          ? `EARLY10-${Math.random().toString(36).substr(2, 9)}`
          : null,
        status: "new",
        source: window.location.href,
        deviceInfo: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
        },
      };

      const leadsRef = collection(db, "leads");
      const docRef = await addDoc(leadsRef, leadData);

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        colors: ["#913bfe", "#7b32d7", "#ffffff"],
      });

      // Send emails in parallel
      await Promise.all([
        sendClientEmail(formData, leadData.discountCode),
        sendAdminEmail(formData, leadData),
      ]);

      // Update UI state
      setDiscountCode(leadData.discountCode);
      setShowSuccess(true);

      // Refresh leads count
      await fetchLeadsCount();

      return {
        success: true,
        data: {
          id: docRef.id,
          ...leadData,
        },
      };
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit form");
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const leadsRef = collection(db, "leads");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const leadData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeads(leadData);

      // Update slots and eligibility
      const totalLeads = snapshot.size;
      setRemainingSlots(Math.max(0, 20 - totalLeads));
      setIsDiscountEligible(totalLeads < 20);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsCount();
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    totalLeads,
    isDiscountEligible,
    remainingSlots,
    loading,
    error,
    isSubmitting,
    showSuccess,
    discountCode,
    saveLead,
    setError,
    setShowSuccess,
    refreshLeads: fetchLeadsCount,
    leads,
    fetchLeads,
  };
};
