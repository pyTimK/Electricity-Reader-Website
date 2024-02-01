import { FHContext } from "@/app/wrappers/FHWrapper";
import { useContext } from "react";
import PhoneIcon from "../svg/icon/PhoneIcon";
import { lektonFont } from "@/styles/fonts";

interface CallCustomerServiceProps {}

const CallCustomerService: React.FC<CallCustomerServiceProps> = ({}) => {
  const { adminSettings } = useContext(FHContext);
  return (
    <div
      className={`${lektonFont} pt-10 flex items-center justify-center w-full gap-3 text-sm `}
    >
      <p className="text-zinc-600">Having trouble?</p>
      <div className="flex items-center gap-1">
        <PhoneIcon size={14} />
        <a href={`tel:${adminSettings.customer_service_phone}`}>
          <p className="text-light_primary ">Call customer service</p>
        </a>
      </div>
    </div>
  );
};

export default CallCustomerService;
