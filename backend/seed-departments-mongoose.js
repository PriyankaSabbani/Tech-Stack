require('dotenv').config();
const mongoose = require('mongoose');
const Department = require('./models/Department');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'db.json'), 'utf8')).departments;
    
    await Department.deleteMany({});
    const result = await Department.insertMany(data);
    console.log('SUCCESS: Mongoose Departments seeded:', result.length, 'documents');
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR: Seeding failed:', err);
    process.exit(1);
  });

