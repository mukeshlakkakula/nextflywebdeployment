import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OfferPopup = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  // Popup animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  const popupVariants = {
    hidden: { 
      scale: 0.9,
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3
      }
    },
    exit: { 
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] p-8 rounded-2xl w-full max-w-md relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative Elements */}
            <motion.div 
              className="absolute top-0 right-0 w-32 h-32 bg-[#913bfe]/10 rounded-full -translate-y-1/2 translate-x-1/2"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-24 h-24 bg-[#913bfe]/10 rounded-full translate-y-1/2 -translate-x-1/2"
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Content */}
            <motion.div variants={contentVariants} initial="hidden" animate="visible">
              <motion.button
                variants={itemVariants}
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <motion.div variants={itemVariants} className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Special Offer! 🎉</h2>
                <p className="text-purple-300 text-lg">First 20 Clients Get</p>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 my-4">
                  10% OFF
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Premium Support</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Priority Development</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white py-4 rounded-lg font-semibold
                  hover:from-[#7b32d7] hover:to-[#913bfe] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Claim Your 10% Discount Now"
                )}
              </motion.button>

              <motion.p 
                variants={itemVariants}
                className="text-sm text-gray-400 text-center mt-4"
              >
                Limited time offer for the first 20 clients only
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferPopup;