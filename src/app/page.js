"use client";

import { AppButton } from "@app/components/app-button";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);

  const goToStudentsPage = () => {
    router.push("/students");
  };
  const signIn = () => {
    router.push("/sign-in");
  };
  const register = () => {
    router.push("/register");
  };
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth);
  };
  return (
    <main className="">
      <div className="text-2xl">
        {!user.id && (
          <>
            <Button
              color="primary"
              className="mr-2"
              onClick={signIn}
              sx={{
                mr: 2,
              }}
            >
              Sign in
            </Button>
            <Button color="primary" className="mr-2" onClick={register}>
              Register
            </Button>
          </>
        )}
        {!!user.id && (
          <>
            <div>Hello, {user.displayName}</div>
            <Button color="primary" className="mr-2" onClick={signOutUser}>
              Sign out
            </Button>
          </>
        )}
        <Button color="primary" className="mr-2" on={goToStudentsPage}>
          Go to students
        </Button>
      </div>
    </main>
  );
}
