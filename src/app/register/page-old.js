"use client";

import { AppButton } from "@app/components/app-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, Snackbar } from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const onSubmit = async (e) => {
    try {
      if (!signInData.email) {
        setAlert({
          open: true,
          message: "Please input email",
          severity: "error",
        });
        return;
      }
      if (!signInData.password) {
        setAlert({
          open: true,
          message: "Please input password",
          severity: "error",
        });
        return;
      }
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      router.push("/");
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        severity: "error",
      });
      console.error(e);
    }
  };
  return (
    <div className="p-2 flex flex-col gap-1 w-96">
      <div className="text-2xl font-bold">Register</div>
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        value={signInData.email}
        onChange={(e) => {
          setSignInData({
            ...signInData,
            email: e.target.value,
          });
        }}
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        name="password"
        id="password"
        value={signInData.password}
        onChange={(e) => {
          setSignInData({
            ...signInData,
            password: e.target.value,
          });
        }}
      />

      <Button type="button" onClick={onSubmit} className="mt-2" color="primary">
        Register
      </Button>
      {alertState.open && (
        <Snackbar
          open={alertState.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertState.severity}
            sx={{ width: "100%" }}
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
