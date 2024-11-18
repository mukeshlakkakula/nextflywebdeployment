import React from "react";
import { motion } from "framer-motion";

const EarlyBirdButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 left-6 bg-gradient-to-r from-[#913bfe] to-[#7b32d7] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="flex items-center">
        <span className="animate-bounce mr-2">🎉</span>
        Get 10% OFF
      </span>
    </motion.button>
  );
};

export default EarlyBirdButton;
