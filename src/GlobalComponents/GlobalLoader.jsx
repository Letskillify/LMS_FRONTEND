import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = 30, color = "#003467", speed = 0.8, className }) => {
  return (
      <motion.div
        animate={{ rotate: 360 }}
        initial={{ rotate: 0 }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className={`${className}`}
        style={{
          width: size,
          height: size,
          border: `5px solid ${color}`,
          borderTop: "5px solid transparent",
          borderRadius: "50%",
          backgroundColor: "transparent",
        }}
      />
  );
};

export default Loader;
