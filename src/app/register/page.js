"use client";

import { AppButton } from "@app/components/app-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert, IconButton, InputAdornment, Snackbar } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
//^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{10,30}$

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
});

export default function Register() {
  const router = useRouter();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (values) => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, values.email, values.password);
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div className="p-2">
      <div className="text-2xl font-bold">Register</div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1 w-96">
        <TextField
          variant="standard"
          id="email"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <FormHelperText error>{formik.errors.email}</FormHelperText>
        )}
        <TextField
          variant="standard"
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  size="small"
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {formik.touched.email && formik.errors.password && (
          <FormHelperText error>{formik.errors.password}</FormHelperText>
        )}
        <Button type="submit" className="mt-2" color="primary">
          Register
        </Button>
      </form>
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
