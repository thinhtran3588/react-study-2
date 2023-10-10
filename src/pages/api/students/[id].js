import { Student } from "@app/database/sequelize";

const getStudent = async (req, res) => {
  const id = +req.query.id;
  if (isNaN(id)) {
    res.status(400).json({
      message: "Id must be a number",
    });
    return;
  }
  const student = await Student.findByPk(id);
  if (!student) {
    res.status(404).json({
      message: "Student not found",
    });
    return;
  }
  res.status(200).json(student.toJSON());
};

const update = async (req, res) => {
  const id = +req.query.id;
  const updatedData = JSON.parse(req.body);
  const student = await Student.findByPk(id);
  if (!student) {
    res.status(404).json({
      message: "Student not found",
    });
    return;
  }
  student.update({
    name: updatedData.name,
    age: updatedData.age,
    gender: updatedData.gender,
  });
  res.status(200).json({});
};

const remove = async (req, res) => {
  await Student.destroy({
    where: {
      id: +req.query.id,
    },
  });
  res.status(200).json({});
};

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    return update(req, res);
  } else if (req.method === "DELETE") {
    return remove(req, res);
  } else if (req.method === "GET") {
    return getStudent(req, res);
  }
  res.status(405).json({
    message: "Method not allowed",
  });
}

// http://localhost:3001/api/students?searchTerm=a&gender=F&pageIndex=0&itemsPerPage=5
// http://localhost:3001/api/students?searchTerm=a&pageIndex=0&itemsPerPage=5
// http://localhost:3001/api/students/0
