import { twMerge } from "tailwind-merge";
import AvatarGirl from "../svg/icon/AvatarGirl";

interface AvatarProps {
  src?: string;
  size?: number;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 75, onClick }) => {
  return (
    <div
      className={twMerge("w-28 h-28 rounded-full overflow-hidden")}
      style={{
        width: size,
        height: size,
      }}
      onClick={onClick}
    >
      {src ? <img alt="not found" width={"250px"} src={src} /> : <AvatarGirl />}
    </div>
  );
};

export default Avatar;
