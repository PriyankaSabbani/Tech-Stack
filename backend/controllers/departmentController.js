const Department = require('../models/Department');

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().limit(50).sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create department
exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

