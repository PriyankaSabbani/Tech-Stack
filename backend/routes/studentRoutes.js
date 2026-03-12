import express from "express";
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  assignBusToStudent,
  getStudentsByBus
} from "../controllers/studentController.js";

const router = express.Router();

// Student CRUD
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// Assignment
router.post("/assign/:studentId/:busId", assignBusToStudent);
router.get("/bus/:busId", getStudentsByBus);

export default router;