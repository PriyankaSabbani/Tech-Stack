const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getClasses);
router.get('/:id/students', classController.getClassStudents);
router.post('/', classController.createClass);

module.exports = router;

