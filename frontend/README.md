# M+ BonsAI - AI Platform Architecture

A modern, professional AI platform that enables multi-agent collaboration with vector databases, SQL databases, and CRM integrations. Built with Next.js 15, TypeScript, and Tailwind CSS.

![M+ BonsAI Platform](public/images/ui-mockup.png)

## 🚀 Features

### 🤖 **Multi-Agent System**
- **Pre-built Agents**: OCR Specialist, Content Summarizer, Data Analyst, SQL Expert, Content Creator, Research Assistant
- **Custom Agent Creation**: Build your own agents with custom models, APIs, and MCP servers
- **Dynamic Agent Management**: Edit existing agents, modify their capabilities, and manage MCP access
- **Real-time Collaboration**: Multiple agents can work together on complex tasks

### 🔍 **Vector Database Integration**
- **Multiple Providers**: Pinecone, Weaviate, Chroma, Qdrant support
- **Document Indexing**: Upload and index documents for semantic search
- **RAG Capabilities**: Retrieval-Augmented Generation with your knowledge base
- **Real-time Search**: Semantic search across indexed documents

### 🗄️ **Database Connectivity**
- **SQL Databases**: PostgreSQL, MySQL, MongoDB, SQLite support
- **CRM Integration**: Salesforce, HubSpot, Pipedrive, Zoho CRM
- **Real-time Queries**: Execute SQL queries through AI agents
- **Schema Analysis**: Automatic database schema understanding

### 💬 **Advanced Chat Interface**
- **Multi-agent Conversations**: Chat with multiple AI agents simultaneously
- **File Attachments**: Upload and reference documents in conversations
- **Session Management**: Save and resume chat sessions
- **Streaming Responses**: Real-time AI responses with typing indicators

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Professional dark mode interface
- **Smooth Animations**: Polished transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hooks, localStorage persistence
- **Icons**: Lucide React
- **Development**: ESLint, Prettier, Hot reload

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm**: Package manager
- **Docker**: For containerized deployment (optional)
- **Git**: For version control

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/m-plus-bonsai.git
   cd m-plus-bonsai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Docker (Recommended)

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/m-plus-bonsai.git
   cd m-plus-bonsai
   \`\`\`

2. **Run with Docker Compose**
   \`\`\`bash
   docker-compose up --build
   \`\`\`

3. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🐳 Docker Configuration

### Dockerfile
The application includes a multi-stage Dockerfile optimized for production:

- **Stage 1**: Dependencies installation
- **Stage 2**: Build process
- **Stage 3**: Production runtime with minimal footprint

### Docker Compose
The `docker-compose.yml` provides:
- **Frontend service**: Next.js application
- **Volume mounting**: For development hot reload
- **Port mapping**: 3000:3000
- **Environment variables**: Configurable settings

## 📁 Project Structure

\`\`\`
m-plus-bonsai/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── integrations/            # Integration pages
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── agent-guild.tsx          # Agent management
│   ├── chat-area.tsx            # Chat interface
│   ├── dashboard.tsx            # Main dashboard
│   ├── file-upload-sidebar.tsx  # File management
│   ├── header.tsx               # Navigation header
│   ├── slide-menu.tsx           # Sidebar navigation
│   ├── vector-database-panel.tsx # Vector DB management
│   ├── database-panel.tsx       # SQL DB management
│   ├── crm-panel.tsx            # CRM integration
│   ├── agent-modal.tsx          # Agent details modal
│   ├── create-agent-modal.tsx  # Agent creation
│   └── session-manager.tsx      # Session management
├── public/                       # Static assets
│   └── images/                  # Image assets
├── hooks/                        # Custom React hooks
├── lib/                         # Utility functions
├── types/                       # TypeScript definitions
├── docker-compose.yml           # Docker Compose configuration
├── Dockerfile                   # Docker configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
\`\`\`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Application
NEXT_PUBLIC_APP_NAME=M+ BonsAI
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Keys (Optional - for real integrations)
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment

# Database (Optional - for real database connections)
DATABASE_URL=postgresql://username:password@localhost:5432/database

# CRM (Optional - for real CRM integrations)
SALESFORCE_CLIENT_ID=your_salesforce_client_id
SALESFORCE_CLIENT_SECRET=your_salesforce_client_secret
\`\`\`

### Next.js Configuration

The `next.config.mjs` includes:
- **Image optimization**: For external image domains
- **ESLint/TypeScript**: Build error handling
- **Experimental features**: ESM externals support

## 🎯 Usage Guide

### 1. **Getting Started**
- Launch the application
- The dashboard loads with the main chat interface
- No agents are selected initially

### 2. **Adding Agents**
- Browse available agents in the Agent Guild (top section)
- Click "Add" to include agents in your workspace
- Selected agents appear in the right sidebar

### 3. **Uploading Documents**
- Use the left sidebar to upload files
- Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, CSV, XLSX
- Files can be attached to chat messages

### 4. **Connecting Databases**
- Click the hamburger menu (top-left)
- Select "Vector Database", "SQL Database", or "CRM Integration"
- Follow the connection wizard for your specific service

### 5. **Creating Custom Agents**
- Click "Create" in the Agent Guild
- Define the agent's name, description, and capabilities
- Select AI models and MCP servers
- Add API access and custom functionality

### 6. **Chat Interface**
- Type messages in the bottom input field
- Attach files using the paperclip icon
- Agents respond based on their specialties
- View conversation history and manage sessions

## 🔌 Integrations

### Vector Databases
- **Pinecone**: Cloud-native vector database
- **Weaviate**: Open-source vector search engine
- **Chroma**: Embedding database for LLM applications
- **Qdrant**: Vector similarity search engine

### SQL Databases
- **PostgreSQL**: Advanced open-source database
- **MySQL**: Popular relational database
- **MongoDB**: NoSQL document database
- **SQLite**: Lightweight embedded database

### CRM Systems
- **Salesforce**: Enterprise CRM platform
- **HubSpot**: Inbound marketing and sales platform
- **Pipedrive**: Sales-focused CRM
- **Zoho CRM**: Business management suite

### AI Models
- **OpenAI**: GPT-4, GPT-4 Turbo, GPT-4 Vision
- **Anthropic**: Claude 3 (Opus, Sonnet, Haiku)
- **Google**: Gemini Pro
- **Meta**: Llama 2 70B

## 🧪 Development

### Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Docker
docker-compose up --build    # Build and run with Docker
docker-compose down          # Stop Docker containers
docker-compose logs          # View container logs
\`\`\`

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for pre-commit checks (optional)

### Component Development

- **shadcn/ui**: Pre-built accessible components
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in theme support

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Docker Production

1. **Build the production image**
   \`\`\`bash
   docker build -t m-plus-bonsai .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 m-plus-bonsai
   \`\`\`

### Traditional Hosting

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start the production server**
   \`\`\`bash
   npm start
   \`\`\`

## 🔒 Security

- **Environment Variables**: Sensitive data stored securely
- **Client-side Storage**: localStorage for session persistence
- **API Security**: Rate limiting and authentication (when connected)
- **Input Validation**: Sanitized user inputs
- **CORS**: Configured for secure cross-origin requests

## 🐛 Troubleshooting

### 🐛 Troubleshooting

#### Common Docker Issues

1. **Lockfile conflicts (pnpm/yarn/npm)**
   \`\`\`bash
   # Run the fix script
   chmod +x scripts/fix-docker.sh
   ./scripts/fix-docker.sh
   
   # Or manually fix:
   rm -f yarn.lock pnpm-lock.yaml
   npm install
   docker-compose build --no-cache
   \`\`\`

2. **Port 3000 already in use**
   \`\`\`bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill -9
   # Or use a different port
   docker-compose up -p 3001:3000
   \`\`\`

3. **Docker build fails**
   \`\`\`bash
   # Clear Docker cache
   docker system prune -a
   # Rebuild without cache
   docker-compose build --no-cache
   \`\`\`

4. **Permission issues on Linux/Mac**
   \`\`\`bash
   # Fix permissions
   sudo chown -R $USER:$USER .
   chmod +x scripts/*.sh
   \`\`\`

#### Quick Fix Commands

\`\`\`bash
# Complete reset and rebuild
rm -f yarn.lock pnpm-lock.yaml
npm install
docker-compose down --remove-orphans
docker system prune -f
docker-compose build --no-cache
docker-compose up
\`\`\`

#### Alternative: Use npm only

If you continue having lockfile issues, stick with npm:

\`\`\`bash
# Remove other package managers' lockfiles
rm -f yarn.lock pnpm-lock.yaml

# Use npm exclusively
npm install
npm run build
npm run dev
\`\`\`

### Performance Optimization

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Bundle Analysis**: Use `@next/bundle-analyzer`
- **Caching**: Implement Redis for production (optional)

## 📚 API Reference

### Agent Management
- `handleAddAgent(agent)`: Add agent to workspace
- `handleRemoveAgent(agentId)`: Remove agent from workspace
- `handleCreateAgent(agentData)`: Create custom agent
- `handleEditAgent(updatedAgent)`: Update existing agent

### Session Management
- `loadSession()`: Load saved session from localStorage
- `saveSession()`: Persist current session
- `handleSessionSelect(sessionId)`: Switch between sessions

### File Management
- `handleFileUpload(files)`: Process uploaded files
- `removeFile(fileId)`: Delete uploaded file
- `toggleFileSelection(fileId)`: Select/deselect files for chat

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Vercel**: For hosting and deployment platform
- **shadcn**: For the beautiful UI component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the comprehensive icon library

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join GitHub Discussions for questions
- **Email**: contact@mplusbonsai.com (if applicable)

---

**Built with ❤️ by the M+ BonsAI Team**

*Empowering AI collaboration, one agent at a time.*
