require('dotenv').config();
const mongoose = require('mongoose');
const Class = require('./models/Class');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI || (() => { console.error('ERROR: Set MONGODB_URI in .env'); process.exit(1); })())
  .then(async () => {
    console.log('Connected to MongoDB for seeding classes');
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'db.json'), 'utf8')).classes;
    
    await Class.deleteMany({});
    const result = await Class.insertMany(data);
    console.log('SUCCESS: Mongoose Classes seeded:', result.length, 'documents');
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR: Classes seeding failed:', err);
    process.exit(1);
  });

