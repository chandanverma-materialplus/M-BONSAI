#!/bin/bash

echo "🔧 Quick Fix for M+ BonsAI Docker Issues"

# Clean up
echo "🧹 Cleaning up..."
rm -f yarn.lock pnpm-lock.yaml package-lock.json
rm -rf node_modules .next

# Install with legacy peer deps to resolve conflicts
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Clean Docker
echo "🐳 Cleaning Docker..."
docker system prune -f
docker-compose down --remove-orphans 2>/dev/null || true

# Build and run
echo "🚀 Building and starting..."
docker-compose up --build

echo "✅ Done! App should be running at http://localhost:3000"
