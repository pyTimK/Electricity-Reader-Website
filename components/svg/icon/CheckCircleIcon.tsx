import { MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface CheckCircleIconProps {
  onClick?: MouseEventHandler<HTMLParagraphElement>;
  size?: number;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ onClick }) => {
  return (
    <motion.div
      className="cursor-pointer flex items-center justify-center w-5 h-5 border border-green-500 rounded-full bg-light-green"
      whileTap={{ scale: 0.8 }}
    >
      <p className="text-sm text-green-500 font-bold" onClick={onClick}>
        ✓
      </p>
    </motion.div>
  );
};

export default CheckCircleIcon;
