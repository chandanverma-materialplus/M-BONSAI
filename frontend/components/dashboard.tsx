"use client"

import { useState, useEffect } from "react"
import { Header } from "./header"
import { AgentGuild } from "./agent-guild"
import { FileUploadSidebar } from "./file-upload-sidebar"
import { ChatArea } from "./chat-area"
import { AgentSidebar } from "./agent-sidebar"
import { AgentModal } from "./agent-modal"
import { CreateAgentModal } from "./create-agent-modal"
import { SlideMenu } from "./slide-menu"
import { VectorDatabasePanel } from "./vector-database-panel"
import { DatabasePanel } from "./database-panel"
import { CrmPanel } from "./crm-panel"

interface MCPServer {
  id: string
  name: string
  url: string
  description: string
  capabilities: string[]
}

interface Agent {
  id: string
  name: string
  description: string
  avatar: string
  tags: string[]
  model: string
  specialty: string
  task: string
  apiAccess: string[]
  mcpServers: MCPServer[]
  isActive: boolean
  isCustom: boolean
  createdBy?: string
}

interface Session {
  id: string
  userId: string
  name: string
  lastActive: Date
  agents: Agent[]
  messages: any[]
  files: any[]
}

export function Dashboard() {
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([])
  const [messages, setMessages] = useState<
    Array<{ id: string; content: string; sender: "user" | "agent"; agentId?: string; timestamp: Date | string }>
  >([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [selectedAgentForModal, setSelectedAgentForModal] = useState<Agent | null>(null)
  const [isCreateAgentModalOpen, setIsCreateAgentModalOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isClient, setIsClient] = useState(false)
  const [currentPage, setCurrentPage] = useState<string>("dashboard")

  // Dynamic agents state - now editable!
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "ocr",
      name: "OCR Specialist",
      description: "Extract text from images and documents",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=ocr&backgroundColor=b6e3f4&mood=happy",
      tags: ["document", "text"],
      model: "gpt-4-vision",
      specialty: "Document Processing",
      task: "Extract and process text from images, PDFs, and scanned documents with high accuracy",
      apiAccess: ["OpenAI Vision API", "Tesseract OCR"],
      mcpServers: [
        {
          id: "ocr-mcp",
          name: "OCR Processing Server",
          url: "mcp://ocr.example.com",
          description: "Advanced OCR processing capabilities",
          capabilities: ["text-extraction", "image-processing", "pdf-parsing"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
    {
      id: "summarizer",
      name: "Content Summarizer",
      description: "Intelligent document summarization",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=summarizer&backgroundColor=c084fc&mood=happy",
      tags: ["summary", "analysis"],
      model: "gpt-4-turbo",
      specialty: "Content Analysis",
      task: "Analyze and summarize long documents, articles, and content with intelligent insights",
      apiAccess: ["OpenAI GPT-4", "Claude API"],
      mcpServers: [
        {
          id: "nlp-mcp",
          name: "NLP Analysis Server",
          url: "mcp://nlp.example.com",
          description: "Natural language processing and analysis",
          capabilities: ["text-analysis", "sentiment-analysis", "summarization"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
    {
      id: "analyzer",
      name: "Data Analyst",
      description: "Advanced data analysis and insights",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=analyzer&backgroundColor=34d399&mood=happy",
      tags: ["data", "analytics"],
      model: "gpt-4-turbo",
      specialty: "Data Science",
      task: "Analyze data patterns, generate insights, and create comprehensive visualizations",
      apiAccess: ["OpenAI GPT-4", "Python Code Interpreter"],
      mcpServers: [
        {
          id: "data-mcp",
          name: "Data Analysis Server",
          url: "mcp://data.example.com",
          description: "Advanced data processing and analysis",
          capabilities: ["data-processing", "statistical-analysis", "visualization"],
        },
        {
          id: "vector-search-mcp",
          name: "Vector Search Server",
          url: "mcp://vector.example.com",
          description: "Semantic search and RAG capabilities",
          capabilities: ["vector-search", "semantic-similarity", "rag-retrieval"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
    {
      id: "sql",
      name: "SQL Expert",
      description: "Database querying specialist",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=sql&backgroundColor=f59e0b&mood=happy",
      tags: ["sql", "database"],
      model: "gpt-4",
      specialty: "Database Management",
      task: "Generate and execute SQL queries, manage database operations efficiently",
      apiAccess: ["OpenAI GPT-4", "Database Connectors"],
      mcpServers: [
        {
          id: "db-mcp",
          name: "Database Server",
          url: "mcp://database.example.com",
          description: "Multi-database connectivity and querying",
          capabilities: ["sql-generation", "query-optimization", "schema-analysis"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
    {
      id: "writer",
      name: "Content Creator",
      description: "Creative writing and content generation",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=writer&backgroundColor=ec4899&mood=happy",
      tags: ["writing", "creative"],
      model: "gpt-4-turbo",
      specialty: "Creative Writing",
      task: "Generate creative content, articles, and marketing copy with style",
      apiAccess: ["OpenAI GPT-4", "Claude API"],
      mcpServers: [
        {
          id: "content-mcp",
          name: "Content Generation Server",
          url: "mcp://content.example.com",
          description: "Advanced content creation and optimization",
          capabilities: ["content-generation", "seo-optimization", "style-adaptation"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
    {
      id: "researcher",
      name: "Research Assistant",
      description: "Comprehensive research and analysis",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=researcher&backgroundColor=8b5cf6&mood=happy",
      tags: ["research", "information"],
      model: "gpt-4-turbo",
      specialty: "Research & Analysis",
      task: "Conduct thorough research and gather relevant information from multiple sources",
      apiAccess: ["OpenAI GPT-4", "Web Search API", "Academic APIs"],
      mcpServers: [
        {
          id: "research-mcp",
          name: "Research Server",
          url: "mcp://research.example.com",
          description: "Advanced research and information retrieval",
          capabilities: ["web-search", "academic-search", "fact-checking"],
        },
        {
          id: "vector-search-mcp",
          name: "Vector Search Server",
          url: "mcp://vector.example.com",
          description: "Semantic search and RAG capabilities",
          capabilities: ["vector-search", "semantic-similarity", "rag-retrieval"],
        },
      ],
      isActive: false,
      isCustom: false,
    },
  ])

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true)
    loadSession()
    loadAgents()
  }, [])

  const loadAgents = () => {
    if (typeof window === "undefined") return

    try {
      const savedAgents = localStorage.getItem("customAgents")
      if (savedAgents) {
        const customAgents = JSON.parse(savedAgents)
        setAgents((prev) => [...prev, ...customAgents])
      }
    } catch (error) {
      console.error("Failed to load custom agents:", error)
    }
  }

  const saveAgents = (updatedAgents: Agent[]) => {
    if (!isClient) return

    try {
      const customAgents = updatedAgents.filter((agent) => agent.isCustom)
      localStorage.setItem("customAgents", JSON.stringify(customAgents))
    } catch (error) {
      console.error("Failed to save agents:", error)
    }
  }

  const loadSession = async () => {
    if (typeof window === "undefined") return

    try {
      const savedSession = localStorage.getItem("currentSession")
      if (savedSession) {
        const session = JSON.parse(savedSession)
        session.lastActive = new Date(session.lastActive)
        session.messages =
          session.messages?.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })) || []

        setCurrentSession(session)
        setSelectedAgents(session.agents || [])
        setMessages(session.messages || [])
        setUploadedFiles(session.files || [])
      } else {
        const newSession: Session = {
          id: Date.now().toString(),
          userId: "user-123",
          name: `Session ${new Date().toLocaleDateString()}`,
          lastActive: new Date(),
          agents: [],
          messages: [],
          files: [],
        }
        setCurrentSession(newSession)
      }
    } catch (error) {
      console.error("Failed to load session:", error)
      const fallbackSession: Session = {
        id: Date.now().toString(),
        userId: "user-123",
        name: `Session ${new Date().toLocaleDateString()}`,
        lastActive: new Date(),
        agents: [],
        messages: [],
        files: [],
      }
      setCurrentSession(fallbackSession)
    }
  }

  const saveSession = () => {
    if (!isClient || !currentSession) return

    try {
      const updatedSession = {
        ...currentSession,
        agents: selectedAgents,
        messages,
        files: uploadedFiles,
        lastActive: new Date(),
      }
      localStorage.setItem("currentSession", JSON.stringify(updatedSession))
      setCurrentSession(updatedSession)
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  }

  useEffect(() => {
    if (!isClient) return
    const interval = setInterval(saveSession, 30000)
    return () => clearInterval(interval)
  }, [selectedAgents, messages, uploadedFiles, currentSession, isClient])

  const handleAddAgent = (agent: Agent) => {
    const updatedAgents = [...selectedAgents, { ...agent, isActive: true }]
    setSelectedAgents(updatedAgents)
    if (isClient) saveSession()
  }

  const handleRemoveAgent = (agentId: string) => {
    const updatedAgents = selectedAgents.filter((agent) => agent.id !== agentId)
    setSelectedAgents(updatedAgents)
    if (isClient) saveSession()
  }

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user" as const,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsStreaming(true)

    // Simulate AI responses from selected agents
    for (const agent of selectedAgents.filter((a) => a.isActive)) {
      setTimeout(
        () => {
          const agentResponse = {
            id: (Date.now() + Math.random()).toString(),
            content: `${generateAgentResponse(agent, content)}`,
            sender: "agent" as const,
            agentId: agent.id,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, agentResponse])
        },
        1000 + Math.random() * 2000,
      )
    }

    setTimeout(() => setIsStreaming(false), 3000)
  }

  const generateAgentResponse = (agent: Agent, userMessage: string) => {
    // Check if agent has vector search capabilities
    const hasVectorSearch = agent.mcpServers.some((mcp) => mcp.capabilities.includes("vector-search"))

    const responses = {
      ocr: "I can help extract text from your uploaded documents. Please share an image or PDF file.",
      summarizer: "I'll analyze and summarize the key points from your content.",
      analyzer: hasVectorSearch
        ? "I can analyze your data and also search through your indexed documents for relevant insights."
        : "Let me analyze the data patterns and provide insights based on your connected databases.",
      sql: "I can help you query your connected databases. What information are you looking for?",
      researcher: hasVectorSearch
        ? "I can research this topic and also search through your knowledge base for relevant information."
        : "Let me research this topic for you using available sources.",
    }

    return (
      responses[agent.id as keyof typeof responses] ||
      `Processing your request: "${userMessage}"${hasVectorSearch ? " I can also search your indexed documents." : ""}`
    )
  }

  const handleCreateAgent = (agentData: any) => {
    const newAgent: Agent = {
      id: `custom-${Date.now()}`,
      name: agentData.name,
      description: agentData.description,
      avatar:
        agentData.avatar ||
        `https://api.dicebear.com/7.x/personas/svg?seed=${agentData.name}&backgroundColor=b6e3f4&mood=happy`,
      tags: agentData.tags || [],
      model: agentData.model,
      specialty: agentData.task,
      task: agentData.task,
      apiAccess: agentData.apiAccess || [],
      mcpServers: agentData.mcpServers || [],
      isActive: false,
      isCustom: true,
      createdBy: "user-123",
    }

    const updatedAgents = [...agents, newAgent]
    setAgents(updatedAgents)
    saveAgents(updatedAgents)
    setIsCreateAgentModalOpen(false)
  }

  const handleEditAgent = (updatedAgent: Agent) => {
    const updatedAgents = agents.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    setAgents(updatedAgents)
    saveAgents(updatedAgents)

    // Update selected agents if this agent is currently selected
    const updatedSelectedAgents = selectedAgents.map((agent) => (agent.id === updatedAgent.id ? updatedAgent : agent))
    setSelectedAgents(updatedSelectedAgents)

    setSelectedAgentForModal(null)
  }

  const handleSessionSelect = (sessionId: string) => {
    console.log("Loading session:", sessionId)
    const mockSession = {
      id: sessionId,
      userId: "user-123",
      name: `Session ${sessionId}`,
      lastActive: new Date(),
      agents: [],
      messages: [],
      files: [],
    }
    setCurrentSession(mockSession)
    setSelectedAgents([])
    setMessages([])
    setUploadedFiles([])
  }

  if (!isClient) {
    return (
      <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading M+ BonsAI...</p>
        </div>
      </div>
    )
  }

  if (currentPage === "vector") {
    return <VectorDatabasePanel onBack={() => setCurrentPage("dashboard")} />
  }

  if (currentPage === "database") {
    return <DatabasePanel onBack={() => setCurrentPage("dashboard")} />
  }

  if (currentPage === "crm") {
    return <CrmPanel onBack={() => setCurrentPage("dashboard")} />
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      <Header onMenuToggle={() => setIsSideMenuOpen(true)} currentSession={currentSession} />
      <SlideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onNavigate={(page) => {
          setCurrentPage(page)
          setIsSideMenuOpen(false)
        }}
      />
      <AgentGuild
        onAddAgent={handleAddAgent}
        selectedAgents={selectedAgents}
        onCreateAgent={() => setIsCreateAgentModalOpen(true)}
        onEditAgent={setSelectedAgentForModal}
        agents={agents}
      />

      <div className="flex flex-1 min-h-0">
        <FileUploadSidebar uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          selectedAgents={selectedAgents}
          isStreaming={isStreaming}
          uploadedFiles={uploadedFiles}
        />
        <AgentSidebar selectedAgents={selectedAgents} onRemoveAgent={handleRemoveAgent} />
      </div>

      {selectedAgentForModal && (
        <AgentModal
          agent={selectedAgentForModal}
          isOpen={!!selectedAgentForModal}
          onClose={() => setSelectedAgentForModal(null)}
          onEdit={handleEditAgent}
          onAdd={() => handleAddAgent(selectedAgentForModal)}
          isAdded={selectedAgents.some((a) => a.id === selectedAgentForModal.id)}
        />
      )}

      {isCreateAgentModalOpen && (
        <CreateAgentModal
          isOpen={isCreateAgentModalOpen}
          onClose={() => setIsCreateAgentModalOpen(false)}
          onSave={handleCreateAgent}
        />
      )}
    </div>
  )
}
