"use client";

import { AppButton } from "@app/components/app-button";
import { studentBackendService } from "@app/services/student-backend.service";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudent({ params }) {
  console.log(params.id);
  const router = useRouter();
  const [student, setStudent] = useState({
    id: undefined,
    name: "",
    age: "",
    gender: "M",
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
      e.preventDefault();

      if (!student.name.trim()) {
        alert("Please input name");
        return;
      }
      if (!student.age) {
        alert("Please input age");
        return;
      }
      await studentBackendService.updateStudent(student);
      setAlert({
        open: true,
        message: "Saved successfully",
        severity: "success",
      });
      router.push("/students");
    } catch (e) {
      alert("Save failed. Please try again");
      console.error(e);
    }
  };

  useEffect(() => {
    const findStudent = async () => {
      const student = await studentBackendService.findStudentById(+params.id);
      if (!student) {
        alert("Student not found");
        return;
      }
      setStudent(student);
    };
    findStudent();
  }, []);

  if (!student.id) {
    return <div></div>;
  }
  return (
    <div className="">
      <div className="text-2xl font-bold">Edit student</div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="id" className="inline-block w-20">
            Id
          </label>
          <input
            className="border"
            type="text"
            name="id"
            id="id"
            value={student.id}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name" className="inline-block w-20">
            Name
          </label>
          <input
            className="border"
            type="text"
            name="name"
            id="name"
            value={student.name}
            onChange={(e) => {
              setStudent({
                ...student,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="age" className="inline-block w-20">
            Age
          </label>
          <input
            className="border"
            id="age"
            name="gender"
            type="number"
            value={student.age}
            onChange={(e) => {
              setStudent({
                ...student,
                age: +e.target.value,
              });
            }}
          />
        </div>
        <div className="mt-2">
          <label className="inline-block w-20">Gender</label>
          <label htmlFor="rdMale" className="mr-2">
            <input
              id="rdMale"
              name="gender"
              type="radio"
              className="mr-2"
              value="M"
              checked={student.gender === "M"}
              onChange={(e) => {
                setStudent({
                  ...student,
                  gender: e.target.value,
                });
              }}
            />
            Male
          </label>
          <label htmlFor="rdFemale">
            <input
              id="rdFemale"
              name="gender"
              type="radio"
              className="mr-2"
              value="F"
              checked={student.gender === "F"}
              onChange={(e) => {
                setStudent({
                  ...student,
                  gender: e.target.value,
                });
              }}
            />
            Female
          </label>
        </div>
        <AppButton type="submit" className="mt-2" color="blue">
          Save
        </AppButton>
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
