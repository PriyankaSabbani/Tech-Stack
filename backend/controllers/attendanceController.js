const Class = require('../models/Class');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

// Get attendance data (classes with students)
exports.getAttendance = async (req, res) => {
  try {
    const classes = await Class.find({}).limit(50).sort({ createdAt: -1 });
    
    const classesWithStudents = [];
    for (const classItem of classes) {
      const students = await Student.find({
        semester: classItem.semester,
        section: classItem.section,
        $or: [
          { branch: classItem.department },
          { department: { $regex: classItem.department, $options: 'i' } }
        ]
      }).sort({ roll: 1 });
      
      // Add default status
      const studentsWithStatus = students.map(student => ({
        ...student.toObject(),
        id: student._id,
        status: 'Absent'
      }));
      
      classesWithStudents.push({
        id: classItem._id,
        className: `${classItem.semester} Section ${classItem.section}`,
        subject: classItem.subject || 'General',
        students: studentsWithStatus
      });
    }
    
    res.json(classesWithStudents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post attendance
exports.postAttendance = async (req, res) => {
  try {
    const { className, subject, date, students } = req.body;
    
    const attendance = new Attendance({
      className,
      subject,
      date,
      students
    });
    
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

