import Student from "../models/Student.js";
import Bus from "../models/Bus.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("assignedBus");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single student
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("assignedBus");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign student to a bus
export const assignBusToStudent = async (req, res) => {
  const { studentId, busId } = req.params;

  try {
    const student = await Student.findById(studentId);
    const bus = await Bus.findById(busId);

    if (!student || !bus) return res.status(404).json({ message: "Student or Bus not found" });

    // Check capacity
    if (bus.assignedStudents.length >= bus.capacity) {
      return res.status(400).json({ message: "Bus is full" });
    }

    // Assign
    student.assignedBus = bus._id;
    await student.save();

    bus.assignedStudents.push(student._id);
    await bus.save();

    res.json({ message: `Student ${student.name} assigned to bus ${bus.busNumber}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all students in a bus
export const getStudentsByBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.busId).populate("assignedStudents");
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json(bus.assignedStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};