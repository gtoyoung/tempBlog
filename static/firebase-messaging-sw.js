// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBoeuHoJfXpQYI-_ayv6kPYEKR50ebv0pY",
  authDomain: "messagetest-e5c56.firebaseapp.com",
  databaseURL: "https://messagetest-e5c56.firebaseio.com",
  projectId: "messagetest-e5c56",
  storageBucket: "messagetest-e5c56.appspot.com",
  messagingSenderId: "831044285603",
  appId: "1:831044285603:web:31264ee41bdb58aefcfb16",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
