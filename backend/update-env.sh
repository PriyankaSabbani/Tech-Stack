#!/bin/zsh
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://Nikhil-database:Abcd%401234@course-web.dadm47e.mongodb.net/MRIET-Solutions?retryWrites=true&w=majority&appName=Course-web
EOF
echo ".env updated with new MongoDB URI."
echo "Restart server: pkill node; node server.js"

