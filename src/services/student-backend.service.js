const findStudents = async (filters, pagination) => {
  let url = `/api/students?`;
  url += `searchTerm=${encodeURIComponent(filters.searchTerm)}`;
  url += `&gender=${encodeURIComponent(filters.gender)}`;
  url += `&pageIndex=${encodeURIComponent(pagination.pageIndex)}`;
  url += `&itemsPerPage=${encodeURIComponent(pagination.itemsPerPage)}`;
  const response = await fetch(url);
  return response.json();
};

const findStudentById = async (id) => {
  const response = await fetch(`/api/students/${id}`);
  return response.json();
};

const createStudent = async (student) => {
  const url = `/api/students`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(student),
  });
};

const updateStudent = async (student) => {
  const url = `/api/students/${student.id}`;
  await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(student),
  });
};

const deleteStudent = async (id) => {
  const url = `/api/students/${id}`;
  await fetch(url, {
    method: "DELETE",
  });
};

export const studentBackendService = {
  findStudents,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
