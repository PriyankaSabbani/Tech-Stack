require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding students');
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'db.json'), 'utf8')).students;
    
    await Student.deleteMany({});
    const result = await Student.insertMany(data);
    console.log('SUCCESS: Mongoose Students seeded:', result.length, 'documents');
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR: Seeding students failed:', err);
    process.exit(1);
  });

