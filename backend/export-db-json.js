const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for export');
    
    const collections = ['profile', 'stats', 'departments', 'classes', 'subjects', 'students', 'attendance', 'assignments', 'materials', 'announcements', 'timetable'];
    const data = {};
    
    for (const coll of collections) {
      const docs = await mongoose.connection.db.collection(coll).find({}).toArray();
      data[coll] = docs;
      console.log(`Exported ${docs.length} documents from ${coll}`);
    }
    
    const outputPath = path.join(__dirname, '..', 'frontend', 'db.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`SUCCESS: Data exported to ${outputPath}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR: Export failed:', err);
    process.exit(1);
  });

