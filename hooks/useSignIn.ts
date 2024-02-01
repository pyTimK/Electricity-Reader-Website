import { auth } from "@/app/firebase";
import isValidEmail from "@/myfunctions/is_valid_email";
import notify from "@/myfunctions/notify";
import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInputField } from "./useInputField";
import useLocalStorage from "./useLocalStorage";
import { Token } from "@/classes/Token";
import { TokenContext } from "@/app/wrappers/FHWrapper";
import FH from "@/classes/FH";

function useSignInPage() {
  const { notifToken } = useContext(TokenContext);
  const [type, setType] = useState(SignInType.signUp);
  const emailInput = useInputField((email) => [
    [!email, "Please Enter your full name"],
    [!isValidEmail(email!), "Invalid Email"],
  ]);

  const passwordInput = useInputField((password) => [
    [!password, "Please Enter a Password"],
    [password!.length < 6, "Password should be at least 6 characters long"],
  ]);

  const [isSigningIn, setIsSigningIn] = useState(false);

  const [signedInBefore, updateSignedInBefore] = useLocalStorage(
    "signedIn",
    false
  );

  useEffect(() => {
    if (signedInBefore) {
      setType(SignInType.logIn);
    }
  }, []);

  function toggleType() {
    setType(type === SignInType.signUp ? SignInType.logIn : SignInType.signUp);
  }

  async function createToken(user: User) {
    //! Create AllToken
    const allToken: Token = {
      id: notifToken,
      email: user.email!,
      userId: user.uid,
    };

    console.log(`AllToken: ${notifToken}`);

    if (notifToken) {
      await FH.AllToken.create(allToken);
    }
  }

  const login: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    setIsSigningIn(true);
    signInWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        createToken(user);
        // ...
        updateSignedInBefore(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
          return;
        }
        notify("Invalid Email or Password");
        emailInput.setError(true);
        passwordInput.setError(true);
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };

  const signup: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    if (!passwordInput.verify()) return;

    const email = emailInput.getValue()!;
    const password = passwordInput.getValue()!;

    //! Check if an account already exists with an email and login instead

    setIsSigningIn(true);
    createUserWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateSignedInBefore(true);
        createToken(user);
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/weak-password") {
          notify("Password should be at least 6 characters long");
          passwordInput.setError(true);
        } else if (errorCode === "auth/email-already-in-use") {
          login(e);
        } else {
          const errorMessage = error.message;
          console.log(`${errorCode}:: ${errorMessage}`);
          notify("Invalid Email or Password");
          emailInput.setError(true);
          passwordInput.setError(true);
        }
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  };

  const forgotPassword: MouseEventHandler<HTMLParagraphElement> = (e) => {
    e.preventDefault();

    if (!emailInput.verify()) return;
    const email = emailInput.getValue()!;

    sendPasswordResetEmail(auth, email!)
      .then(() => {
        // Password reset email sent!
        // ..
        notify("Password Reset Email sent!", { type: "success" });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}:: ${errorMessage}`);
        notify("Password Reset Error");
      });
  };

  return {
    type,
    toggleType,
    login,
    signup,
    forgotPassword,
    emailInput,
    passwordInput,
    isSigningIn,
  };
}

export enum SignInType {
  signUp,
  logIn,
}

export default useSignInPage;
