import { motion } from "framer-motion";

const SuccessModal = ({ discountCode, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        <div className="bg-[#1a1a2e] p-8 rounded-xl shadow-xl relative z-10 max-w-md w-full">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            {discountCode && (
              <div className="bg-[#913bfe]/20 p-4 rounded-lg mb-4">
                <p className="text-[#913bfe] font-semibold">Your Discount Code:</p>
                <p className="text-2xl font-bold text-white">{discountCode}</p>
              </div>
            )}
            <p className="text-gray-300 mb-6">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </motion.div>
    );
  };

  export default SuccessModal
  