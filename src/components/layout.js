import React, { useEffect } from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import useTheme from "../hook/useTheme";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoeuHoJfXpQYI-_ayv6kPYEKR50ebv0pY",
  authDomain: "messagetest-e5c56.firebaseapp.com",
  databaseURL: "https://messagetest-e5c56.firebaseio.com",
  projectId: "messagetest-e5c56",
  storageBucket: "messagetest-e5c56.appspot.com",
  messagingSenderId: "831044285603",
  appId: "1:831044285603:web:31264ee41bdb58aefcfb16",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messageing = firebase.messaging();

Notification.requestPermission()
  .then(function () {
    return messageing.getToken();
  })
  .then(function (token) {
    console.log(token);
  })
  .catch(function (err) {
    console.log("fcm error: ", err);
  });

messageing.onMessage(function (payload) {
  console.log(payload.notification.title);
  console.log(payload.notification.body);
});

const Template = ({ children }) => {
  deckDeckGoHighlightElement();
  const [theme, themeToggler] = useTheme();

  useEffect(() => {
    if (theme === "light" && typeof window !== "undefined") {
      document.getElementById("themeBtn").setAttribute("aria-pressed", "false");
    } else {
      document.getElementById("themeBtn").setAttribute("aria-pressed", "true");
    }
  }, null);

  return (
    <Container>
      <button
        id="themeBtn"
        className="btn_theme"
        onClick={themeToggler}
      ></button>
      <Navigation />
      {children}
    </Container>
  );
};

export default Template;
