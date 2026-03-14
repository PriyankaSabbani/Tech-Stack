const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ message: "Student not found" });
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: student._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, student });
};
