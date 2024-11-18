import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiBot } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useLeadManagement } from '../hooks/useLeadManagement';
import confetti from 'canvas-confetti';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [],
    budget: '',
    message: ''
  });

  const {
    saveLead,

  } = useLeadManagement();

  // Available services
  const services = [
    { id: 1, name: 'Web Development', emoji: '💻' },
    { id: 2, name: 'Mobile Apps', emoji: '📱' },
    { id: 3, name: 'UI/UX Design', emoji: '🎨' },
    { id: 4, name: 'Digital Marketing', emoji: '📢' },
    { id: 5, name: 'SEO', emoji: '🔍' },
    { id: 6, name: 'Content Writing', emoji: '✍️' }
  ];

  // Budget ranges
  const budgetRanges = [
    { value: '0-5k', label: 'Under 5k', emoji: '💰' },
    { value: '5k-10k', label: '5k - 10k', emoji: '💰💰' },
    { value: '10k-25k', label: '10k - 25k', emoji: '💰💰💰' },
    { value: '25k-50k', label: '25k - 50k', emoji: '💰💰💰💰' },
    { value: '50k+', label: '50k+', emoji: '💰💰💰💰💰' }
  ];

  // Chat steps
  const steps = [
    {
      type: 'bot',
      message: "Hi! 👋 I'm FLY AI Assistant. What's your name?",
      field: 'name',
      inputType: 'text',
    },
    {
      type: 'bot',
      message: "Great! What's your email address?",
      field: 'email',
      inputType: 'email',
    },
    {
      type: 'bot',
      message: "Could I get your phone number?",
      field: 'phone',
      inputType: 'tel',
    },
    {
      type: 'bot',
      message: "Which services are you interested in? (Select all that apply)",
      field: 'services',
      inputType: 'services',
    },
    {
      type: 'bot',
      message: "What's your budget range?",
      field: 'budget',
      inputType: 'budget',
    },
    {
      type: 'bot',
      message: "Would you like to add any additional message? (Optional)",
      field: 'message',
      inputType: 'textarea',
      optional: true,
    },
  ];

  // Utility Functions
  const getDeviceInfo = () => ({
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent
  });

  const generateDiscountCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const codeLength = 8;
    let result = 'EARLY10-';
    for (let i = 0; i < codeLength; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(steps[0]);
    }
  }, [isOpen]);

  const addBotMessage = async (step) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, { type: 'bot', content: step.message }]);
    setIsTyping(false);
  };

  const handleUserInput = async (value) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: value }]);

    // Update form data
    setFormData(prev => ({
      ...prev,
      [steps[currentStep].field]: value
    }));

    // Move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 500));
      addBotMessage(steps[currentStep + 1]);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsTyping(true);
      
      // Prepare lead data
      const leadData = {
        ...formData,
        deviceInfo: {
          language: navigator.language || 'en-IN',
          platform: /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'iOS' : 'Android',
          screenResolution: `${window.innerWidth}x${window.innerHeight}`,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        },
        source: "whstappbot",
        status: 'new'
      };
  
      // Submit to Firebase
      const firebaseResult = await handleLeadSubmissionToFirebase(leadData);
      
      // Submit to Lead Management
      const leadResult = await saveLead(leadData);
  
      if (firebaseResult.success && leadResult.success) {
        const discountCode = firebaseResult.discountCode || leadResult.discountCode;
        
        // Format WhatsApp message
        const whatsappMessage = encodeURIComponent(
          `*New Project Inquiry* 🚀\n\n` +
          `*Name:* ${formData.name}\n` +
          `*Email:* ${formData.email}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Budget:* ${formData.budget}\n` +
          `*Services:* ${formData.services.join(', ')}\n` +
          `*Discount Code:* ${discountCode}\n` +
          (formData.message ? `\n*Message:* ${formData.message}` : '') +
          `\n\n_Sent via FlyYourTech Chat_`
        );
  
        // Set WhatsApp URL
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappUrl = isMobile 
          ? `whatsapp://send?phone=917470391011&text=${whatsappMessage}`
          : `https://wa.me/917470391011?text=${whatsappMessage}`;
  
        // Success messages
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            content: `🎉 Great! Here's your exclusive discount code: ${discountCode}`
          }
        ]);
  
        await new Promise(resolve => setTimeout(resolve, 800));
  
        setMessages(prev => [
          ...prev,
          {
            type: 'bot',
            content: "📱 Opening WhatsApp to continue our conversation..."
          }
        ]);
  
        // Confetti effect
        if (typeof window.confetti === 'function') {
          window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#913bfe', '#7b32d7', '#25D366']
          });
        }
  
        // Save session
        localStorage.setItem('lastChatSession', JSON.stringify({
          timestamp: new Date().toISOString(),
          discountCode,
          firebaseId: firebaseResult.docId,
          leadId: leadResult.docId
        }));
  
        // Final delay
        await new Promise(resolve => setTimeout(resolve, 1500));
  
        // Open WhatsApp
        window.location.href = whatsappUrl;
  
      } else {
        throw new Error('Failed to submit inquiry to one or more services');
      }
  
    } catch (error) {
      console.error('Submission error:', error);
      
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: "😔 I apologize, but something went wrong. Please try again or contact us directly at support@flyyourtech.com"
        }
      ]);
  
      // Log error if available
      if (typeof window.errorLogger === 'function') {
        window.errorLogger('chat_submission_error', {
          error: error.message,
          formData: { ...formData, password: undefined },
          timestamp: new Date().toISOString()
        });
      }
  
    } finally {
      setIsTyping(false);
      
      // Scroll to bottom
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  // Firebase submission function
  const handleLeadSubmissionToFirebase = async (leadData) => {
    try {
      const discountCode = generateDiscountCode();
      
      const firebaseData = {
        ...leadData,
        createdAt: serverTimestamp(),
        discountCode,
        isDiscountEligible: true,
        status: 'new'
      };
  
      const docRef = await addDoc(collection(db, 'leads'), firebaseData);
  
      return {
        success: true,
        discountCode,
        docId: docRef.id
      };
    } catch (error) {
      console.error('Firebase submission error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  };
  

  // Message Bubble Component
  const MessageBubble = ({ message }) => {
    const isBot = message.type === 'bot';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
      >
        <div className={`flex items-start max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
          {isBot && (
            <div className="w-8 h-8 rounded-full bg-[#913bfe] flex items-center justify-center mr-2 flex-shrink-0">
              <BiBot className="text-white" size={18} />
            </div>
          )}
          <div
            className={`rounded-lg px-4 py-2 ${
              isBot 
                ? 'bg-[#1a2156] text-white' 
                : 'bg-[#913bfe] text-white'
            }`}
          >
            {message.content}
          </div>
        </div>
      </motion.div>
    );
  };

  // Input Field Component
  const InputField = () => {
    const [value, setValue] = useState('');
    const currentField = steps[currentStep];

    if (isTyping) return null;

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
        handleUserInput(value.trim());
        setValue('');
      }
    };

    switch (currentField.inputType) {
      case 'services':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => {
                  const updatedServices = formData.services.includes(service.name)
                    ? formData.services.filter(s => s !== service.name)
                    : [...formData.services, service.name];
                  
                  setFormData(prev => ({
                    ...prev,
                    services: updatedServices
                  }));
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  formData.services.includes(service.name)
                    ? 'bg-[#913bfe] text-white'
                    : 'bg-[#1a2156] text-gray-300 hover:bg-[#913bfe]/20'
                }`}
              >
                <span>{service.emoji}</span>
                <span>{service.name}</span>
              </button>
            ))}
            {formData.services.length > 0 && (
              <button
                onClick={() => handleUserInput(formData.services)}
                className="px-4 py-1.5 bg-[#913bfe] text-white rounded-full text-sm hover:bg-[#7b32d7] transition-colors"
              >
                Continue
              </button>
            )}
          </motion.div>
        );

      case 'budget':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {budgetRanges.map(range => (
              <button
                key={range.value}
                onClick={() => handleUserInput(range.label)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm bg-[#1a2156] text-gray-300 hover:bg-[#913bfe] hover:text-white transition-colors"
              >
                <span>{range.emoji}</span>
                <span>{range.label}</span>
              </button>
            ))}
          </motion.div>
        );

      default:
        return (
          <div className="flex items-end space-x-2">
            <motion.input
              type={currentField.inputType}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Type your ${currentField.field}...`}
              className="w-full bg-[#1a2156] text-white rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[#913bfe]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            />
            <motion.button
              onClick={() => {
                if (value.trim()) {
                  handleUserInput(value.trim());
                  setValue('');
                }
              }}
              className="bg-[#913bfe] text-white p-3 rounded-lg hover:bg-[#7b32d7] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </div>
        );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-[#0f1535] rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-[#1a2156] flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#913bfe] to-[#7b32d7] flex items-center justify-center">
                  <BiBot className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">FLY AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-gray-400 text-sm">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#913bfe] flex items-center justify-center">
                    <BiBot className="text-white text-sm" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex space-x-1 bg-[#1a2156] p-3 rounded-lg"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </motion.div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#1a2156] border-t border-gray-700">
              <InputField />
              {error && (
                <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg z-50 group overflow-hidden
          ${isOpen ? 'bg-[#913bfe]' : 'bg-[#a352ff]'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={isSubmitting}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {isOpen ? (
            <BiBot size={24} className="transform transition-transform group-hover:rotate-12" />
          ) : (
            <BsWhatsapp size={24} className="transform transition-transform group-hover:rotate-12" />
          )}
        </motion.div>

        {/* Loading Indicator */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            background: isOpen 
              ? 'radial-gradient(circle, rgba(145,59,254,0.3) 0%, rgba(145,59,254,0) 70%)'
              : 'radial-gradient(circle, rgba(37,211,102,0.3) 0%, rgba(37,211,102,0) 70%)'
          }}
        />
      </motion.button>
    </>
  );
};

export default WhatsAppButton;
