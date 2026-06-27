@echo off
cd /d "C:\Users\admin\Desktop\notary-site\v2"
echo Starting SoFlo Notary local preview at http://localhost:8080
echo Press Ctrl+C to stop the server.
start "" "http://localhost:8080"
python -m http.server 8080
pause
