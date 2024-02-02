import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface TemperatureIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const TemperatureIcon: React.FC<TemperatureIconProps> = ({
  onClick,
  size = 60,
}) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 60 123"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 86.2487C26.5481 86.2487 23.75 89.0469 23.75 92.4987C23.75 95.9506 26.5481 98.7487 30 98.7487C33.4519 98.7487 36.25 95.9506 36.25 92.4987C36.25 89.0469 33.4519 86.2487 30 86.2487ZM30 86.2487V61.25M30 92.4987L30.0444 92.5431M55 92.4987C55 106.306 43.8069 117.499 30 117.499C16.1929 117.499 5 106.306 5 92.4987C5 86.1587 7.36025 80.3694 11.25 75.9625V23.75C11.25 13.3947 19.6444 5 30 5C40.3556 5 48.75 13.3947 48.75 23.75V75.9625C52.64 80.3694 55 86.1587 55 92.4987Z"
      stroke="#0056E4"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export default TemperatureIcon;
