"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ThemeContext } from "@app/app/contexts/theme.context";
import { AppButton } from "./app-button";
import { store } from "@app/store/store";

export const AppFirebase = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyANHifzUPvk8thq7fNri1_s6SfqAeAyvqw",
      authDomain: "react-study-2.firebaseapp.com",
      projectId: "react-study-2",
      storageBucket: "react-study-2.appspot.com",
      messagingSenderId: "822979906278",
      appId: "1:822979906278:web:c4eda94cf2a227aa20c927",
      measurementId: "G-89YRDGW76H",
    };
    initializeApp(firebaseConfig);
    console.log("Firebase initialized");

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch.user.setUser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName || user.email,
        });
      } else {
        dispatch.user.setUser({
          id: undefined,
          email: undefined,
          displayName: undefined,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return <>{children}</>;
};
