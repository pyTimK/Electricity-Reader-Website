import { motion } from "framer-motion";
import { MouseEventHandler } from "react";

interface HumidityIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
}

const HumidityIcon: React.FC<HumidityIconProps> = ({ onClick, size = 150 }) => (
  <motion.svg
    onClick={onClick}
    className="cursor-pointer"
    whileTap={{ scale: 0.8 }}
    width={size}
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49.7607 129.272C28.7988 129.272 11.748 112.222 11.748 91.2598C11.748 71.7481 41.748 33.3838 45.1758 29.0772C46.0254 28.0078 47.2998 27.378 48.6621 27.3633C50.0391 27.3487 51.3135 27.9346 52.1924 28.9746C52.4121 29.2383 57.7148 35.5371 64.2334 44.3848C65.7129 46.4063 65.2881 49.2481 63.2666 50.7276C61.2451 52.2071 58.4033 51.7823 56.9238 49.7608C53.8037 45.5127 50.9326 41.8506 48.8232 39.1992C38.6865 52.6758 20.8154 78.9698 20.8154 91.2598C20.8154 107.212 33.7939 120.205 49.7607 120.205C65.7275 120.205 78.706 107.212 78.706 91.2598C78.706 88.7549 80.7422 86.7188 83.2471 86.7188C85.7519 86.7188 87.7881 88.7549 87.7881 91.2598C87.7734 112.222 70.7227 129.272 49.7607 129.272Z"
      fill="#F99394"
    />
    <path
      d="M53.2764 68.6719C49.1895 77.417 46.4209 85.6202 46.4209 91.8751C46.4209 115.986 65.9619 135.527 90.0732 135.527C114.185 135.527 133.726 115.986 133.726 91.8751C133.726 90.0001 133.447 87.9346 132.92 85.7374C84.9902 90.7032 91.1865 57.1876 53.2764 68.6719Z"
      fill="#DE62BB"
    />
    <path
      d="M48.8671 83.1445C43.2714 118.286 66.8847 135.542 90.9521 135.542C104.546 135.542 112.178 133.77 120.19 124.028C81.8847 127.061 57.3925 109.497 48.8671 83.1445Z"
      fill="#960099"
    />
    <path
      d="M90.0732 140.054C63.501 140.054 41.8945 118.433 41.8945 91.875C41.8945 66.4746 83.4082 13.8867 85.1807 11.6602C86.0303 10.5908 87.3047 9.96096 88.667 9.94631C90.0293 9.93166 91.3184 10.5176 92.1973 11.5576C92.4902 11.8946 99.375 20.083 107.842 31.5674C109.321 33.5889 108.896 36.4307 106.875 37.9102C104.854 39.3897 102.012 38.9649 100.532 36.9434C95.874 30.6153 91.6553 25.2539 88.8281 21.753C75.7324 38.9795 50.9619 75.044 50.9619 91.875C50.9619 113.438 68.5107 130.986 90.0732 130.986C111.636 130.986 129.185 113.438 129.185 91.875C129.185 87.5244 127.251 78.999 117.993 63.1348C116.733 60.9668 117.466 58.1983 119.634 56.9385C121.802 55.6787 124.57 56.4112 125.83 58.5791C134.194 72.9199 138.252 83.8037 138.252 91.8897C138.252 118.447 116.631 140.054 90.0732 140.054Z"
      fill="#F99394"
    />
  </motion.svg>
);

export default HumidityIcon;
