import { motion } from "framer-motion";
import { JSX } from "react";

const NumberButton = ({ number, onClick }: { number: string | JSX.Element; onClick: () => void; }) => (
  <motion.button
    whileTap={{ scale: 0.95, backgroundColor: "#F2F4F6" }}
    onClick={onClick}
    className="flex items-center justify-center aspect-square text-3xl font-medium text-toss-gray-800 rounded-2xl"
  >
    {number}
  </motion.button>
);

export default NumberButton
