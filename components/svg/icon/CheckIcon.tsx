interface CheckIconProps {
  size?: number;
}
const CheckIcon: React.FC<CheckIconProps> = ({ size = 22 }) => (
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 36.7824L26.0257 51.0417L58.3334 18.9584"
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckIcon;
