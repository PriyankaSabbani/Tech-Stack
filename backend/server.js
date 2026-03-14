require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();

// Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || 
        file.mimetype === 'application/pdf' || 
        file.mimetype.includes('powerpoint') ||
        file.mimetype.includes('office')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, PPT, images allowed'), false);
    }
  }
});
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

let db;

async function connectDB() {
  try {
const client = new MongoClient(MONGODB_URI, {
  tls: true,
  rejectUnauthorized: false 
});
    await client.connect();
    db = client.db('faculty_db');
    console.log('SUCCESS: Connected to MongoDB Cluster0');
  } catch (error) {
    console.error('ERROR: MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

app.get('/api/health', async (req, res) => {
  if (!db) {
    return res.status(500).json({ status: 'DB not connected' });
  }
  try {
    const collections = await db.listCollections().toArray();
    res.json({ status: 'OK', message: 'Backend + MongoDB ready with specific routes', collections: collections.map(c => c.name) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// MVC Routes
const mongoose = require('mongoose');
const materialRoutes = require('./routes/materialRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const classRoutes = require('./routes/classRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

// Connect mongoose
mongoose.connect(MONGODB_URI)
  .then(() => console.log('SUCCESS: Mongoose connected'))
  .catch(err => console.error('ERROR: Mongoose connection error:', err))

// API routes
app.use('/api/materials', materialRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/subjects', subjectRoutes);

// Legacy raw Mongo routes (temporary - to be migrated)
const LEGACY_COLLECTIONS = ['statsfaculties', 'timetablefaculties', 'departmentfaculties', 'classfaculties', 'subjectfaculties', 'studentfaculties', 'attendancefaculties', 'announcementfaculties', 'profilefaculties'];

async function legacyGet(coll, req, res) {
  if (!db) return res.status(500).json({ error: 'DB not connected' });
  try {
    const data = await db.collection(coll).find({}).limit(50).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function legacyPost(coll, req, res) {
  if (!db) return res.status(500).json({ error: 'DB not connected' });
  try {
    const result = await db.collection(coll).insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

LEGACY_COLLECTIONS.forEach(coll => {
  app.get(`/api/${coll}`, (req, res) => legacyGet(coll, req, res));
  app.post(`/api/${coll}`, (req, res) => legacyPost(coll, req, res));
});


// PUT profile
app.put('/api/profile', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected' });
  try {
    const result = await db.collection('profilefaculties').updateOne({id:1}, { $set: req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/:coll/:id
app.delete('/api/:coll/:id', async (req, res) => {
  const { coll, id } = req.params;
  if (!db) return res.status(500).json({ error: 'DB not connected' });
  try {
    const result = await db.collection(coll).deleteOne({ id: parseInt(id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/import-data - Import data from frontend/db.json
app.post('/api/import-data', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected' });
  try {
    const dbJsonPath = path.join(__dirname, '../frontend/db.json');
    const data = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    const collections = ['profilefaculties', 'statsfaculties', 'departmentfaculties', 'classfaculties', 'subjectfaculties', 'studentfaculties', 'attendancefaculties', 'assignmentfaculties', 'materialfaculties', 'announcementfaculties', 'timetablefaculties'];
    const results = [];
    for (const collName of collections) {
      if (data[collName]) {
        await db.collection(collName).deleteMany({});
        const items = Array.isArray(data[collName]) ? data[collName] : [data[collName]];
        const result = await db.collection(collName).insertMany(items);
        results.push({ collection: collName, inserted: result.insertedCount });
      }
    }
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



process.on('SIGTERM', async () => {
  if (db) {
    await db.client.close();
  }
  process.exit(0);
});

app.use('/uploads', express.static('uploads'));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('SUCCESS: Server running on http://localhost:' + PORT);
    console.log('INFO: Uploads served at http://localhost:' + PORT + '/uploads');
  });
}).catch((err) => {
  console.error('Server failed:', err);
});

