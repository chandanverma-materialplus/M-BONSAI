#!/bin/bash

# Fix Docker build issues for M+ BonsAI

echo "🔧 Fixing Docker build issues..."

# Remove existing lockfiles that might cause conflicts
echo "🧹 Cleaning up lockfiles..."
rm -f yarn.lock pnpm-lock.yaml

# Generate fresh package-lock.json
echo "📦 Generating fresh package-lock.json..."
npm install

# Clean Docker cache
echo "🐳 Cleaning Docker cache..."
docker system prune -f

# Remove any existing containers
echo "🗑️ Removing existing containers..."
docker-compose down --remove-orphans

# Build fresh images
echo "🔨 Building fresh Docker images..."
docker-compose build --no-cache

echo "✅ Docker fix complete!"
echo ""
echo "🚀 You can now run:"
echo "  docker-compose up          # Production mode"
echo "  docker-compose --profile dev up  # Development mode"
