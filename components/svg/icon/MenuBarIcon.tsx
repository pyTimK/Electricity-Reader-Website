import { motion } from "framer-motion";

interface MenuBarIconProps {
  size?: number;
  onClick?: () => void;
}

const MenuBarIcon: React.FC<MenuBarIconProps> = ({ size = 25, onClick }) => (
  <motion.svg
    width={`${size}px`}
    height={`${size}px`}
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
    viewBox="0 0 33 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1H32M6.8125 12.5H26.1875M10.6875 24H22.3125"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

export default MenuBarIcon;
