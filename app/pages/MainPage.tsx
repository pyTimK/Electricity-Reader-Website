import { Constants } from "@/classes/Constants";
import CallCustomerService from "@/components/custom/CallCustomerService";
import CurrentIcon from "@/components/custom/CurrentIcon";
import Header from "@/components/custom/Header";
import { lektonFont } from "@/styles/fonts";
import { useContext, useEffect, useState } from "react";
import { FHContext } from "../wrappers/FHWrapper";
import { twMerge } from "tailwind-merge";
import VoltageIcon from "@/components/custom/VoltageIcon";
import BatteryIcon from "@/components/custom/BatteryIcon";
import MyInput from "@/components/templates/MyInput";
import { useInputField } from "@/hooks/useInputField";
import MyButton from "@/components/templates/MyButton";
import FH from "@/classes/FH";
import notify from "@/myfunctions/notify";
import TemperatureIcon from "@/components/custom/TemperatureIcon";
import HumidityIcon from "@/components/custom/HumidityIcon";
import WattIcon from "@/components/custom/WattIcon";
import DeleteIcon from "@/components/svg/icon/DeleteIcon";
import useModal from "@/hooks/useModal";
import MyModal from "@/components/templates/MyModal";

interface MainPageProps {}
const currentOffset = 0.6;

const MainPage: React.FC<MainPageProps> = ({}) => {
  const resetModal = useModal();
  const { device } = useContext(FHContext);
  let currents = [
    device?.port1 ?? 0,
    device?.port2 ?? 0,
    device?.port3 ?? 0,
    device?.port4 ?? 0,
    device?.port5 ?? 0,
  ];

  for (let i = 0; i < currents.length; i++) {
    currents[i] -= currentOffset;
    if (currents[i] < 0) currents[i] = 0;

    if (currents[i] > 2.2) currents[i] += 1.1;
    // if (currents[i] <= 0.4) currents[i] /= 10;
  }

  let voltages = [device?.volt1 ?? 0];
  while (voltages[0] > 242) {
    voltages[0] = voltages[0] - 12;
  }

  const power = currents.map((c, i) => c * voltages[0]);
  const kwh = [
    (device?.kwh1 ?? 0).toFixed(2),
    (device?.kwh2 ?? 0).toFixed(2),
    (device?.kwh3 ?? 0).toFixed(2),
    (device?.kwh4 ?? 0).toFixed(2),
    (device?.kwh5 ?? 0).toFixed(2),
  ];
  const temperature = device?.temp ?? 0;
  const humidity = device?.humidity ?? 0;
  const [hasLimitUpdates, setHasLimitUpdates] = useState(false);

  const limit1Input = useInputField((limit) => [
    [!limit, "Please Enter a limit for port 1"],
    [isNaN(Number(limit!)), "Limit of port 1 must be a number"],
    [Number(limit!) === 0, "Limit of port 1 must not be 0"],
    [Number(limit!) < 0, "Limit of port 1 must be a positive number"],
  ]);

  const limit2Input = useInputField((limit) => [
    [!limit, "Please Enter a limit for port 2"],
    [isNaN(Number(limit!)), "Limit of port 2 must be a number"],
    [Number(limit!) === 0, "Limit of port 2 must not be 0"],
    [Number(limit!) < 0, "Limit of port 2 must be a positive number"],
  ]);

  const limit3Input = useInputField((limit) => [
    [!limit, "Please Enter a limit for port 3"],
    [isNaN(Number(limit!)), "Limit of port 3 must be a number"],
    [Number(limit!) === 0, "Limit of port 3 must not be 0"],
    [Number(limit!) < 0, "Limit of port 3 must be a positive number"],
  ]);

  const limit4Input = useInputField((limit) => [
    [!limit, "Please Enter a limit for port 4"],
    [isNaN(Number(limit!)), "Limit of port 4 must be a number"],
    [Number(limit!) === 0, "Limit of port 4 must not be 0"],
    [Number(limit!) < 0, "Limit of port 4 must be a positive number"],
  ]);

  const limit5Input = useInputField((limit) => [
    [!limit, "Please Enter a limit for port 5"],
    [isNaN(Number(limit!)), "Limit of port 5 must be a number"],
    [Number(limit!) === 0, "Limit of port 5 must not be 0"],
    [Number(limit!) < 0, "Limit of port 5 must be a positive number"],
  ]);

  //! INITIALIZE FIELDS
  useEffect(() => {
    if (!device) return;
    limit1Input.setValue((device.limit1 - currentOffset).toFixed(2));
    limit2Input.setValue((device.limit2 - currentOffset).toFixed(2));
    limit3Input.setValue((device.limit3 - currentOffset).toFixed(2));
    limit4Input.setValue((device.limit4 - currentOffset).toFixed(2));
    limit5Input.setValue((device.limit5 - currentOffset).toFixed(2));
  }, []);

  const updateLimits = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!device) return;
    try {
      await FH.Device.update(device, {
        limit1: Number(limit1Input.getValue()) + currentOffset ?? device.limit1,
        limit2: Number(limit2Input.getValue()) + currentOffset ?? device.limit2,
        limit3: Number(limit3Input.getValue()) + currentOffset ?? device.limit3,
        limit4: Number(limit4Input.getValue()) + currentOffset ?? device.limit4,
        limit5: Number(limit5Input.getValue()) + currentOffset ?? device.limit5,
      });
      notify("Limits updated successfully", { type: "success" });
    } catch (error) {
      console.log(error);
      notify("An error occured while updating limits");
    }

    setHasLimitUpdates(false);
  };

  const resetKWH = async () => {
    if (!device) return;
    try {
      await FH.Device.update(device, {
        kwh1: 0,
        kwh2: 0,
        kwh3: 0,
        kwh4: 0,
        kwh5: 0,
      });
      notify("KWH reset successfully", { type: "success" });
    } catch (error) {
      console.log(error);
      notify("An error occured while resetting KWH");
    }
    resetModal.close();
  };

  return (
    <div className="bg-bg">
      <Header />
      <div className="flex flex-col pt-24 pb-2 h-full min-h-screen text-center">
        {/* //! KWH */}
        <div className="flex gap-3 justify-center items-center mb-6">
          <p className="text-lg">Kilowatt-Hour</p>
          <DeleteIcon size={20} onClick={resetModal.open} />
        </div>
        <div className="flex gap-5 flex-wrap justify-around pb-10">
          {kwh.map((k, i) => (
            <ElectricityBox
              value={Number(k)}
              title={`PORT ${i + 1}`}
              key={i}
              type={kwhType}
            />
          ))}
        </div>

        <hr className="text-gray opacity-20 pb-5" />
        {/* //! POWER */}
        <p className="text-lg mb-6">Power</p>
        <div className="flex gap-5 flex-wrap justify-around pb-10">
          {power.map((p, i) => (
            <ElectricityBox
              value={p}
              title={`PORT ${i + 1}`}
              key={i}
              type={powerType}
            />
          ))}
        </div>

        <hr className="text-gray opacity-20 pb-5" />
        {/* //! CURRENT */}
        <p className="text-lg mb-6">Current</p>
        <div className="flex gap-5 flex-wrap justify-around pb-10">
          {currents.map((c, i) => (
            <ElectricityBox
              value={c}
              title={`PORT ${i + 1}`}
              key={i}
              type={currentType}
            />
          ))}
        </div>

        <hr className="text-gray opacity-20 pb-5" />

        {/* //! VOLTAGE */}
        <p className="text-lg mb-6">Voltage</p>
        <div className="flex gap-5 flex-wrap justify-around pb-10">
          {voltages.map((v, i) => (
            <ElectricityBox
              value={v}
              title={`PORT ${i + 1}`}
              key={i}
              type={voltageType}
            />
          ))}
        </div>

        <hr className="text-gray opacity-20 pb-5" />

        {/* //! TEMPERATURE & HIMIDITY */}
        <p className="text-lg mb-6">Humidity & Temperature</p>
        <div className="flex gap-5 flex-wrap justify-around pb-10">
          <ElectricityBox
            value={temperature}
            title={`Temperature`}
            type={tempType}
          />
          <ElectricityBox
            value={humidity}
            title={`Humidity`}
            type={humidityType}
          />
        </div>

        <hr className="text-gray opacity-20 pb-5" />

        {/* //! LIMITS */}
        <form
          className="flex w-full px-10 flex-col justify-center gap-10 mb-10 text-left"
          onSubmit={updateLimits}
        >
          <div className="flex flex-col gap-1">
            <p className="text font-semibold">
              Limit 1 ({Constants.currentUnit})
            </p>
            <MyInput
              placeholder="Limit 1"
              className="bg-transparent"
              inputField={limit1Input}
              type="number"
              onChange={() => setHasLimitUpdates(true)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text font-semibold">
              Limit 2 ({Constants.currentUnit})
            </p>
            <MyInput
              placeholder="Limit 2"
              className="bg-transparent"
              inputField={limit2Input}
              type="number"
              onChange={() => setHasLimitUpdates(true)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text font-semibold">
              Limit 3 ({Constants.currentUnit})
            </p>
            <MyInput
              placeholder="Limit 3"
              className="bg-transparent"
              inputField={limit3Input}
              type="number"
              onChange={() => setHasLimitUpdates(true)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text font-semibold">
              Limit 4 ({Constants.currentUnit})
            </p>
            <MyInput
              placeholder="Limit 4"
              className="bg-transparent"
              inputField={limit4Input}
              type="number"
              onChange={() => setHasLimitUpdates(true)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text font-semibold">
              Limit 5 ({Constants.currentUnit})
            </p>
            <MyInput
              placeholder="Limit 5"
              className="bg-transparent"
              inputField={limit5Input}
              type="number"
              onChange={() => setHasLimitUpdates(true)}
            />
          </div>

          <MyButton type="submit" label="Update" disabled={!hasLimitUpdates} />
        </form>

        {/* //! CUSTOMER SERVICE */}
        <CallCustomerService />
      </div>

      <MyModal useModal={resetModal} title="RESET KWH">
        <div className="flex flex-col items-center gap-5">
          <p className="text-smooth_black text-center">
            Are you sure you want to reset kwh readings?
          </p>
          <div className="flex gap-5">
            <MyButton
              type="button"
              label="Cancel"
              outlined
              className="rounded-full"
              pY={0.2}
              onClick={resetModal.close}
            />
            <MyButton
              type="button"
              label="Reset"
              className="rounded-full bg-red"
              pY={0.2}
              onClick={resetKWH}
            />
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default MainPage;

interface ElectricityBoxType {
  type: "current" | "voltage" | "power" | "temperature" | "humidity" | "kwh";
  color: string;
  icon: React.ReactNode;
  unit: string;
}

const currentType: ElectricityBoxType = {
  type: "current",
  color: "border-red",
  icon: <CurrentIcon size={18} />,
  unit: Constants.currentUnit,
};

const voltageType: ElectricityBoxType = {
  type: "voltage",
  color: "border-light_primary",
  icon: <VoltageIcon size={28} />,
  unit: Constants.voltageUnit,
};

const powerType: ElectricityBoxType = {
  type: "power",
  color: "border-orange",
  icon: <WattIcon size={28} />,
  unit: Constants.powerUnit,
};

const kwhType: ElectricityBoxType = {
  type: "kwh",
  color: "border-yellow",
  icon: <BatteryIcon size={28} />,
  unit: Constants.kwhUnit,
};

const tempType: ElectricityBoxType = {
  type: "temperature",
  color: "border-gcash_blue",
  icon: <TemperatureIcon size={15} />,
  unit: Constants.temperatureUnit,
};

const humidityType: ElectricityBoxType = {
  type: "humidity",
  color: "border-red_light",
  icon: <HumidityIcon size={28} />,
  unit: Constants.humidityUnit,
};

//! ELECTRICITY BOX
interface ElectricityBoxProps {
  title: string;
  value: number;
  type: ElectricityBoxType;
}
// border-red
// "border-light_primary"
// isVoltage ? <VoltageIcon size={28} /> : <CurrentIcon size={18} />
const ElectricityBox: React.FC<ElectricityBoxProps> = ({
  title,
  value,
  type,
}) => {
  return (
    <div
      className={twMerge(
        "relative flex flex-col gap-2 items-center justify-center bg-white  border w-32 h-32 rounded-2xl shadow-md select-none",
        type.color
      )}
    >
      <div className="flex gap-1 justify-center items-start ">
        <p className="text-2xl">{value.toFixed(2)}</p>
        <p className="text-3xs">{type.unit}</p>
      </div>

      <div className="absolute top-1">{type.icon}</div>
      <div className="absolute bottom-0">
        <p>{title}</p>
      </div>
    </div>
  );
};
