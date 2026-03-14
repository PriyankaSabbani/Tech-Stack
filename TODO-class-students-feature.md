# Class Students List Feature - Implementation Steps

## Status: In Progress

1. [x] **Backend**: Add `getClassStudents` controller in `backend/controllers/classController.js` to query students by class criteria and return list + count
2. [x] **Backend**: Add route GET /:id/students in `backend/routes/classRoutes.js`
3. [x] **Frontend API**: Add `getClassStudents(classId)` in `frontend/src/services/api.js`
4. [x] **MyClasses.jsx**: Update "View Class" button to navigate to `/students?classId=${classId}` using `useNavigate` (removed old inline view)
5. [x] **StudentsList.jsx**: Read URL `classId` param, fetch class-specific students via new API, show dynamic count in title/UI, adjust table if needed
6. [x] **Test**: Backend endpoints, frontend navigation/count display (recommend restart backend `cd backend && npm start`, frontend `cd frontend && npm run dev`; test MyClasses -> View Class -> count shown)
7. [x] **Complete**: Update this TODO, attempt_completion

Current step: 7/7 - Feature complete!

