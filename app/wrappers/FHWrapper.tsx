import { Device } from "@/classes/Device";
import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import QuasarPage from "@/components/templates/QuasarPage";
import { useLoading } from "@/hooks/useLoading";
import { useUser } from "@/hooks/useUser";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import RegisterPage from "../pages_outer/RegisterPage";
import SignInPage from "../pages_outer/SignInPage";
import PageWrapper from "./PageWrapper";
import { useFHWatch } from "@/hooks/useFHWatch";
import { AdminSettings } from "@/classes/templates/AdminSettings";
import {
  onMessageListener,
  requestForToken,
  requestPermission,
} from "../firebase";
import notify from "@/myfunctions/notify";

//? ----------------------
//? FIRESTORE DATA OBJECTS
//? ----------------------

export const FHContext = createContext({
  adminSettings: {} as AdminSettings,
  user: {} as User,
  myUser: {} as MyUser | null,
  device: {} as Device | null,
});

export const TokenContext = createContext({
  notifToken: "",
});

interface FHWrapperProps {}

const FHWrapper: React.FC<FHWrapperProps> = ({}) => {
  //! USER
  const [user, loadingUser] = useUser();

  //! QUASAR
  const [adminSettings, loadingAdminSettings] = useFHWatch(
    FH.AdminSettings,
    "settings"
  );

  console.log(adminSettings);

  //! MY USER
  const [myUser, loadingMyUser] = useFHWatch(FH.MyUser, user?.uid);

  //! DEVICE
  const [device, loadingDevice] = useFHWatch(FH.Device, "readings");

  //! LOADING
  const loading = useLoading(
    loadingAdminSettings,
    loadingUser,
    loadingMyUser,
    loadingDevice
  );

  //! NOTIFTOKEN
  const [notifToken, setNotifToken] = useState("");

  // console.log("loading", loading);
  // console.log("loadingAdminSettings", loadingAdminSettings);
  // console.log("loadingUser", loadingUser);
  // console.log("loadingMyUser", loadingMyUser);
  // console.log("loadingDevice", loadingDevice);

  useEffect(() => {
    requestPermission();
    requestForToken(setNotifToken);
    onMessageListener((payload) => {
      console.log("Message received. ", payload);
      notify(`${payload.notification?.title}`, {
        type: "warning",
        duration: 10000,
      });
    });
  }, [user]);

  //! PAGES
  if (loading) return <div className="bg-red w-screen h-screen"></div>;
  if (adminSettings === null) return <QuasarPage />;
  if (adminSettings?.quasar) return <QuasarPage />;
  // if (notifToken) return <div>{notifToken}</div>;
  if (user === null)
    return (
      <TokenContext.Provider value={{ notifToken }}>
        <SignInPage />
      </TokenContext.Provider>
    );
  if (myUser === null) return <RegisterPage user={user} />;

  if (device) {
    alertIfPassedLimit(device.limit1, device.port1);
    alertIfPassedLimit(device.limit2, device.port2);
    alertIfPassedLimit(device.limit3, device.port3);
    alertIfPassedLimit(device.limit4, device.port4);
    alertIfPassedLimit(device.limit5, device.port5);
  }

  return (
    <TokenContext.Provider value={{ notifToken }}>
      <FHContext.Provider value={{ adminSettings, user, myUser, device }}>
        <PageWrapper />
      </FHContext.Provider>
    </TokenContext.Provider>
  );
};

function alertIfPassedLimit(limit: number, port: number) {
  if (limit !== 0 && port !== 0) {
    if (port > limit) {
      // alert("WARNING: Port 1 is over the current limit!");
    }
  }
}

export default FHWrapper;
