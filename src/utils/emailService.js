// API Key and configuration
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const sendEmail = async (emailData) => {
  try {
    const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error("Failed to send email");
    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
