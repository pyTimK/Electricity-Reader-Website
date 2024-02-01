import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface CurrentIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const CurrentIcon: React.FC<CurrentIconProps> = ({ onClick, size = 82 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 82 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M81.8529 81.9679L44.6584 66.3032L72.5759 0L0.146973 68.0257L37.3428 83.6908L9.42399 150L81.8529 81.9679Z"
      fill="#D13333"
    />
  </motion.svg>
);

export default CurrentIcon;
