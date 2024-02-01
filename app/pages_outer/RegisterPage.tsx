import FH from "@/classes/FH";
import { MyUser } from "@/classes/MyUser";
import Logo from "@/components/custom/Logo";
import Title from "@/components/custom/Title";
import EditableAvatar from "@/components/templates/EditableAvatar";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import { useCheckboxField, useInputField } from "@/hooks/useInputField";
import notify from "@/myfunctions/notify";
import { User } from "firebase/auth";
import { FormEventHandler, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TokenContext } from "../wrappers/FHWrapper";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [creatingMyUser, setCreatingMyUser] = useState(false);

  const nameInput = useInputField((name) => [
    [!name, "Please Enter your full name"],
  ]);

  const termsInput = useCheckboxField(
    "Please agree to the terms and conditions"
  );

  //! REGISTER
  const register: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!nameInput.verify()) return;
    if (!termsInput.verify()) return;

    setCreatingMyUser(true);
    try {
      //! Save image in storage if there is one
      let photoURL = "";
      if (selectedImage) {
        await FH.MyUser.Picture.create(user.uid, selectedImage);
        photoURL = await FH.MyUser.Picture.get(user.uid);
      }

      const myUser: MyUser = {
        id: user.uid,
        name: nameInput.getValue()!,
        photoURL: photoURL,
        email: user.email!,
        device_id: "",
      };

      //! Create MyUser
      await FH.MyUser.create(myUser);
    } catch (error) {
      console.log(error);
      notify("An error occured while registering");
    }
    setCreatingMyUser(false);
  };

  return (
    <div className="px-10">
      {/* <img src={user.photoURL ?? undefined} alt="dsads" /> */}
      {/* //! TITLE */}
      <div className="h-28" />
      <Title />
      <h1 className={`text text-darkest_primary text-center mt-2 mb-10`}>
        Tell us about you..
      </h1>
      {/* <SizedBox height={80} /> */}

      {/* //! AVATAR */}
      <EditableAvatar
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        size={120}
      />
      <form
        className="flex flex-col justify-center space-y-10 mb-10"
        onSubmit={register}
      >
        {/* //! FULL NAME */}
        <MyInput
          placeholder="Full name"
          className="bg-transparent"
          inputField={nameInput}
        />
        {/* //! TERMS AND CONDITIONS */}
        <TermsAndConditions termsInput={termsInput} />

        {/* //! SUBMIT BUTTON */}
        <MyButton
          type="submit"
          label="Create Account"
          disabled={creatingMyUser}
        />
      </form>
    </div>
  );
};

export default RegisterPage;

interface TermsAndConditionsProps {
  termsInput: ReturnType<typeof useCheckboxField>;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  termsInput,
}) => {
  return (
    <div className="flex items-center gap-3 text-sm justify-center">
      <input
        ref={termsInput.ref}
        type="checkbox"
        name="terms"
        className={twMerge("", true ? "border-red" : "border-darker_primary")}
        id="checkbox-terms"
      />
      <p className="text-slate-500">
        I agree to the{" "}
        <span className="text-black font-semibold">
          <a
            target="_blank"
            href="https://www.termsandconditionsgenerator.com/live.php?token=G8aMDV0PD8lLHWKS8I1KJmtSD5TBulEi"
          >
            Terms & Conditions
          </a>
        </span>
      </p>
    </div>
  );
};
