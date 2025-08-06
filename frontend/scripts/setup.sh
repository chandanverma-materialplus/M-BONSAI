#!/bin/bash

# M+ BonsAI Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up M+ BonsAI Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if Docker is installed (optional)
if command -v docker &> /dev/null; then
    echo "✅ Docker $(docker --version | cut -d' ' -f3 | cut -d',' -f1) detected"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker not found. Docker setup will be skipped."
    DOCKER_AVAILABLE=false
fi

# Install dependencies
echo "📦 Installing dependencies..."
if [ -f "yarn.lock" ]; then
    yarn install
elif [ -f "pnpm-lock.yaml" ]; then
    pnpm install
else
    npm install
fi

echo "✅ Dependencies installed"

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOL
# M+ BonsAI Environment Variables
NEXT_PUBLIC_APP_NAME=M+ BonsAI
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Add your API keys here
# OPENAI_API_KEY=your_openai_api_key
# PINECONE_API_KEY=your_pinecone_api_key
# PINECONE_ENVIRONMENT=your_pinecone_environment

# Optional: Database configuration
# DATABASE_URL=postgresql://username:password@localhost:5432/database

# Optional: CRM configuration
# SALESFORCE_CLIENT_ID=your_salesforce_client_id
# SALESFORCE_CLIENT_SECRET=your_salesforce_client_secret
EOL
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Build the application
echo "🔨 Building the application..."
if [ -f "yarn.lock" ]; then
    yarn build
elif [ -f "pnpm-lock.yaml" ]; then
    pnpm build
else
    npm run build
fi

echo "✅ Application built successfully"

# Docker setup (if available)
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "🐳 Setting up Docker environment..."
    
    # Build Docker image
    docker build -t m-plus-bonsai .
    echo "✅ Docker image built"
    
    # Create docker-compose override for development
    if [ ! -f "docker-compose.override.yml" ]; then
        cat > docker-compose.override.yml << EOL
version: '3.8'

services:
  frontend:
    profiles:
      - production
  
  frontend-dev:
    profiles:
      - dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
EOL
        echo "✅ Docker Compose override created"
    fi
fi

echo ""
echo "🎉 Setup complete! You can now run the application:"
echo ""
echo "📋 Available commands:"
echo "  npm run dev          # Start development server"
echo "  npm run build        # Build for production"
echo "  npm run start        # Start production server"
echo ""

if [ "$DOCKER_AVAILABLE" = true ]; then
    echo "🐳 Docker commands:"
    echo "  docker-compose up --build                    # Run with Docker"
    echo "  docker-compose --profile dev up --build      # Run development mode"
    echo "  docker-compose --profile production up       # Run production mode"
    echo ""
fi

echo "🌐 The application will be available at: http://localhost:3000"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
echo "Happy coding! 🚀"
