"use client";

import { AppButton } from "@app/components/app-button";
import { AppPagination } from "@app/components/app-pagination";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { ThemeContext } from "../contexts/theme.context";
import { studentBackendService } from "@app/services/student-backend.service";
export default function Students() {
  const theme = useContext(ThemeContext);
  const [searchResult, setSearchResult] = useState({
    data: [],
    total: 0,
  });
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
  });
  const [searchTermDebounced] = useDebounce(filters.searchTerm, 300);
  const [pagination, setPagination] = useState({
    itemsPerPage: 5,
    pageIndex: 0,
  });

  const router = useRouter();
  const createNew = () => {
    router.push("/students/create");
  };

  const editStudent = (id) => {
    router.push(`/students/${id}`);
  };

  const getGender = (value) => {
    if (value === "M") {
      return "Male";
    }
    if (value === "F") {
      return "Female";
    }
    return "";
  };

  const searchStudents = async () => {
    const result = await studentBackendService.findStudents(
      filters,
      pagination
    );
    setSearchResult(result);
  };

  const confirmDelete = (student) => {
    if (!window.confirm(`Are you sure to delete student "${student.name}"?`)) {
      return;
    }
    studentBackendService.deleteStudent(student.id);
    alert("Delete success");
    searchStudents();
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
    searchStudents();
  }, [filters.gender, searchTermDebounced]);

  useEffect(() => {
    searchStudents();
  }, [pagination.pageIndex]);

  return (
    <>
      <div className="">
        <div>Theme: {theme}</div>
        <div className="text-2xl font-bold">Students</div>
        <AppButton className="mr-2" color="blue" onClick={createNew}>
          Create new
        </AppButton>
        <div>
          <div>
            <div className="text-lg">Search students</div>
          </div>
          <div>
            <input
              name="searchTerm"
              className="border"
              value={filters.searchTerm}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  searchTerm: e.target.value,
                });
              }}
            />
          </div>
          <div className="mt-2">
            <label className="inline-block w-20">Gender</label>
            <label htmlFor="rdMale" className="mr-2">
              <input
                id="rdAll"
                name="gender"
                type="radio"
                className="mr-2"
                value=""
                checked={filters.gender === ""}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    gender: e.target.value,
                  });
                }}
              />
              All
            </label>
            <label htmlFor="rdMale" className="mr-2">
              <input
                id="rdMale"
                name="gender"
                type="radio"
                className="mr-2"
                value="M"
                checked={filters.gender === "M"}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    gender: e.target.value,
                  });
                }}
              />
              Male
            </label>
            <label htmlFor="rdFemale">
              <input
                id="rdFemale"
                name="age"
                type="radio"
                className="mr-2"
                value="F"
                checked={filters.gender === "F"}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    gender: e.target.value,
                  });
                }}
              />
              Female
            </label>
          </div>
        </div>
        <div>
          {searchResult.data.map((student) => (
            <div key={student.id} className="border p-2 mt-2">
              <div>Name: {student.name}</div>
              <div>Age: {student.age}</div>
              <div>Gender: {getGender(student.gender)}</div>
              <div>
                <AppButton color="blue" onClick={() => editStudent(student.id)}>
                  Edit
                </AppButton>
                <AppButton color="red" onClick={() => confirmDelete(student)}>
                  Delete
                </AppButton>
              </div>
            </div>
          ))}
          <AppPagination
            {...pagination}
            total={searchResult.total}
            setPageIndex={(newPageIndex) => {
              setPagination({
                ...pagination,
                pageIndex: newPageIndex,
              });
            }}
          />
        </div>
      </div>
      <div></div>
    </>
  );
}
