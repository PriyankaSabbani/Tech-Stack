# MongoDB Migration to New Atlas Cluster

## Steps Completed:
- [x] Update .env with new MONGODB_URI (mongodb+srv://...cluster0... with password)
- [x] Remove hardcoded URIs in seed-classes-mongoose.js 
- [x] Update import-data.js to use env
- [ ] Test server.js connection
- [ ] Run seeds 
- [ ] Import data
- [ ] Verify /api/health

## Commands:
1. cd backend
2. npm install  # deps already present: mongoose, mongodb, dotenv
3. node server.js  # Expect: SUCCESS: Server running..., SUCCESS: Mongoose connected, SUCCESS: Connected to MongoDB Cluster0
4. curl http://localhost:5000/api/health  # Should show OK + collections
5. node seed-departments-mongoose.js && node seed-students-mongoose.js && node seed-classes-mongoose.js
6. curl -X POST http://localhost:5000/api/import-data  # Migrate frontend/db.json if needed
7. Check uploads served at http://localhost:5000/uploads

## Status: Backend configured for new cluster. Test to confirm connection.
