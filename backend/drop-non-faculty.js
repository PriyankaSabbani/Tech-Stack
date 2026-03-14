require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

async function dropNonFaculty() {
  const client = new MongoClient(MONGODB_URI, { tls: true, rejectUnauthorized: false });
  try {
    await client.connect();
    const db = client.db('faculty_db');
    const collections = await db.listCollections().toArray();
    const nonFaculty = [];
    for (const coll of collections) {
      const name = coll.name;
      if (!name.endsWith('faculties')) {
        nonFaculty.push(name);
        await db.collection(name).drop();
        console.log(`Dropped: ${name}`);
      }
    }
    const remaining = (await db.listCollections().toArray()).map(c => c.name);
    console.log('Remaining Faculty collections:', remaining.join(', '));
    console.log('Dropped:', nonFaculty.length, 'collections');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

dropNonFaculty();

