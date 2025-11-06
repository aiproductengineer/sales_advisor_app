#!/bin/bash
echo "🚀 Starting Sales Advisor CMS..."
echo ""
echo "📦 Starting Backend Server..."
npm run dev &
BACKEND_PID=$!

echo "⏳ Waiting for backend to initialize..."
sleep 5

echo "🎨 Starting Frontend Server..."
cd sales-advisor-app
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Backend API:  http://localhost:5000/api"
echo "🎨 Frontend App: http://localhost:5173"
echo "🔐 Login PIN:    123456"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 To access the CMS:"
echo "   1. Open http://localhost:5173"
echo "   2. Login with PIN: 123456"
echo "   3. Click 'Admin CMS' card"
echo ""
echo "⚠️  Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo '✅ Servers stopped'; exit 0" EXIT INT TERM

wait
