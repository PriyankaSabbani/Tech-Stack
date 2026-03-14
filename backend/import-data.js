require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI not set in .env');
  process.exit(1);
}

async function importData() {
  const client = new MongoClient(MONGODB_URI, { 
    tls: true, 
    rejectUnauthorized: false 
  });
  try {
    await client.connect();
    const db = client.db('faculty_db');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'db.json'), 'utf8'));
const collectionMap = {
  'profile': 'profilefaculties',
  'stats': 'statsfaculties',
  'departments': 'departmentfaculties',
  'classes': 'classfaculties',
  'subjects': 'subjectfaculties',
  'students': 'studentfaculties',
  'attendance': 'attendancefaculties',
  'assignments': 'assignmentfaculties',
  'materials': 'materialfaculties',
  'announcements': 'announcementfaculties',
  'timetable': 'timetablefaculties'
};
const baseCollections = Object.keys(collectionMap);
    const results = [];
    for (const baseColl of baseCollections) {
      const facultyColl = collectionMap[baseColl];
      if (data[baseColl]) {
        await db.collection(facultyColl).deleteMany({});
        const items = Array.isArray(data[baseColl]) ? data[baseColl] : [data[baseColl]];
        const result = await db.collection(facultyColl).insertMany(items);
        results.push({ collection: facultyColl, from: baseColl, inserted: result.insertedCount });
      }
    }
console.log('SUCCESS: Data imported:', results);
  } catch (error) {
console.error('ERROR: Import failed:', error.message);
  } finally {
    await client.close();
  }
}

importData();
