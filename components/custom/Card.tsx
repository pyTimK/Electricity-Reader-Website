interface CardProps {
  info: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ info, img }) => {
  return (
    <div className="flex flex-col gap-5 items-center bg-white drop-shadow-lg shadow-lg px-8 py-5 rounded-lg mx-10">
      <p className="">{info}</p>
      <img
        className="translate-x-3"
        src={`/images/${img}`}
        alt="coin slot"
        width={100}
      />
      {/* <img src="/images/gcash_icon.png" alt="coin slot" /> */}
    </div>
  );
};

export default Card;
