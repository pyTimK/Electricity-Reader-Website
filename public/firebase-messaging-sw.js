importScripts(
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js'
  );
  
  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDrTfIqyWC5O0SW6U1l4R6gHQkrKpXMWz4",
    authDomain: "current-voltage-reader.firebaseapp.com",
    projectId: "current-voltage-reader",
    storageBucket: "current-voltage-reader.appspot.com",
    messagingSenderId: "535798972221",
    appId: "1:535798972221:web:0bfa14925da4f488768f54",
  };
  
  // Initialize Firebase
  firebase.initializeApp(FIREBASE_CONFIG);
  const messaging = firebase.messaging();

  // console log if received messge
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
    });