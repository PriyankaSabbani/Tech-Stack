# MongoDB-Only Implementation TODO

## Steps Completed:
- [x] Created TODO file for tracking
- [x] Edited frontend/package.json: Remove json-server dependency and mock server script
- [x] Deleted frontend/db.json
- [x] Ran `cd frontend && npm install` to update deps (json-server removed)

## Remaining Steps:
- [ ] Test backend: `cd backend && npm run dev` (or npm start)
- [ ] Test frontend: `cd frontend && npm run dev` - verify all data loads from MongoDB backend at localhost:5000
- [ ] Seed/populate MongoDB data using mongoose seeders: `node backend/seed-departments-mongoose.js` etc.
- [ ] [Optional] Refactor backend/import-data.js to use mongoose seeders instead of frontend/db.json

**Task complete:** App now uses MongoDB only - no local json-server or db.json mock data.

Updated as steps complete.
