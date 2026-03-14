const Attendance = require("../models/Attendance");

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      studentId: req.params.id
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
