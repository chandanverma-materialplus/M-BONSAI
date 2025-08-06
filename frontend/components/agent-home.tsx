"use client"

import { useState } from "react"
import { Search, Plus, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Agent {
  id: string
  name: string
  description: string
  avatar: string
  tags: string[]
  model: string
  specialty: string
  isActive: boolean
}

interface AgentHomeProps {
  onAddAgent: (agent: Agent) => void
  selectedAgents: Agent[]
}

export function AgentHome({ onAddAgent, selectedAgents }: AgentHomeProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const agents: Agent[] = [
    {
      id: "ocr",
      name: "OCR Agent",
      description: "Extract text from images and documents",
      avatar: "🔍",
      tags: ["document", "text"],
      model: "gpt-4-vision",
      specialty: "Document Processing",
      isActive: false,
    },
    {
      id: "summarizer",
      name: "Summarizer",
      description: "Summarize long documents and content",
      avatar: "📝",
      tags: ["summary", "analysis"],
      model: "gpt-4",
      specialty: "Content Analysis",
      isActive: false,
    },
    {
      id: "analyzer",
      name: "Data Analyzer",
      description: "Analyze data patterns and insights",
      avatar: "📊",
      tags: ["data", "analytics"],
      model: "gpt-4",
      specialty: "Data Science",
      isActive: false,
    },
    {
      id: "writer",
      name: "Content Writer",
      description: "Generate and edit written content",
      avatar: "✍️",
      tags: ["writing", "creative"],
      model: "gpt-4",
      specialty: "Creative Writing",
      isActive: false,
    },
    {
      id: "translator",
      name: "Translator",
      description: "Translate text between languages",
      avatar: "🌐",
      tags: ["translation", "language"],
      model: "gpt-4",
      specialty: "Language Translation",
      isActive: false,
    },
    {
      id: "researcher",
      name: "Researcher",
      description: "Research topics and gather information",
      avatar: "🔬",
      tags: ["research", "information"],
      model: "gpt-4",
      specialty: "Information Research",
      isActive: false,
    },
    {
      id: "coder",
      name: "Code Assistant",
      description: "Help with coding and development tasks",
      avatar: "💻",
      tags: ["coding", "development"],
      model: "gpt-4",
      specialty: "Software Development",
      isActive: false,
    },
    {
      id: "sql",
      name: "SQL Agent",
      description: "Generate and execute SQL queries",
      avatar: "🗄️",
      tags: ["sql", "database"],
      model: "gpt-4",
      specialty: "Database Queries",
      isActive: false,
    },
  ]

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const isAgentSelected = (agentId: string) => {
    return selectedAgents.some((agent) => agent.id === agentId)
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Agent Home</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-48 h-8"
            />
          </div>
          <Button className="bg-pink-600 hover:bg-pink-700 text-white h-8 px-3 text-sm">
            <Plus className="h-3 w-3 mr-1" />
            Create
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className={`min-w-[320px] h-20 bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors ${
                isAgentSelected(agent.id) ? "ring-2 ring-pink-500 bg-gray-600" : ""
              }`}
            >
              <div className="p-3 h-full flex items-center">
                <div className="text-2xl mr-3">{agent.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white text-sm truncate">{agent.name}</h3>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        onClick={() => onAddAgent(agent)}
                        disabled={isAgentSelected(agent.id)}
                        className={`h-6 px-2 text-xs ${
                          isAgentSelected(agent.id)
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-pink-600 hover:bg-pink-700 text-white"
                        }`}
                      >
                        {isAgentSelected(agent.id) ? "Added" : "Add"}
                      </Button>
                      <Button
                        variant="outline"
                        className="h-6 px-2 text-xs border-gray-500 text-gray-300 hover:bg-gray-600 bg-transparent"
                      >
                        <Edit className="h-2 w-2" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 truncate mb-1">{agent.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {agent.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-gray-600 text-gray-300 px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">{agent.model}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
