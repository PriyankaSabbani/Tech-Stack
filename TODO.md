# CMS Accounts - Running Instructions

## IMPORTANT: Install Dependencies First
You must install the required packages before running the server. Run these commands in order:

### Step 1: Install React Dependencies
```bash
npm install
```

### Step 2: Install Express and Cors
```bash
npm install express cors
```

### Step 3: Start Backend Server
```bash
node server.js
```

### Step 4: Start React App (in a new terminal)
```bash
npm start
```

## Error Solution:
If you get "Cannot find module 'express'" error, it means you need to run:
```bash
npm install express cors
```

## Access the App:
- Backend API: http://localhost:3001
- React App: http://localhost:3000
