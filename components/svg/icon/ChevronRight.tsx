import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface ChevronRightProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const ChevronRight: React.FC<ChevronRightProps> = ({ onClick, size = 11 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 53 99"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.00208 3.30371L49.5299 49.8316L3.00208 96.3594"
      stroke="black"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export default ChevronRight;
