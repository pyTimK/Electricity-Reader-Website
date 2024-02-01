// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  MessagePayload,
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrTfIqyWC5O0SW6U1l4R6gHQkrKpXMWz4",
  authDomain: "current-voltage-reader.firebaseapp.com",
  projectId: "current-voltage-reader",
  storageBucket: "current-voltage-reader.appspot.com",
  messagingSenderId: "535798972221",
  appId: "1:535798972221:web:0bfa14925da4f488768f54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

export const onMessageListener = async (
  callback: (payload: MessagePayload) => any
) =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      if (!messagingResolve) return;
      console.log("Listening for messages");
      onMessage(messagingResolve, (payload) => {
        // console.log("On message: ", messaging, payload);
        callback(payload);
        resolve(payload);
      });
    })()
  );

export const requestForToken = async (callback: (token: string) => any) => {
  try {
    const messagingResolve = await messaging;
    if (!messagingResolve) return;

    const currentToken = await getToken(messagingResolve, {
      vapidKey:
        "BGEeizjq4M1kKGi8gVVb_tWJafknFGX_6JEgtkq2x3hjDqXXHwWRDMQHhOi5YOmnjBA5hix5Aakuhe1osnVLGXw",
    });
    if (currentToken) {
      console.log("Token: ", currentToken);
      // subscribeTokenToTopic(currentToken);
      callback(currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // new Notification("Thanks for granting permission!");

      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }
  });
}

// function subscribeTokenToTopic(token: string, topic: string = "all") {
//   fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
//     method: "POST",
//     headers: new Headers({
//       Authorization:
//         "key=BGEeizjq4M1kKGi8gVVb_tWJafknFGX_6JEgtkq2x3hjDqXXHwWRDMQHhOi5YOmnjBA5hix5Aakuhe1osnVLGXw",
//     }),
//   })
//     .then((response) => {
//       if (response.status < 200 || response.status >= 400) {
//         throw (
//           "Error subscribing to topic: " +
//           response.status +
//           " - " +
//           response.text()
//         );
//       }
//       console.log('Subscribed to "' + topic + '"');
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
