const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// GET /api/assignments - get all
router.get('/', assignmentController.getAssignments);

// POST /api/assignments - create new
router.post('/', assignmentController.createAssignment);

module.exports = router;

