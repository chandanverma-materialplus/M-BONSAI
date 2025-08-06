"use client"

import { useState } from "react"
import { Search, Plus, Database, Globe, Bot, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface AgentGuildProps {
  onAddAgent: (agent: Agent) => void
  selectedAgents: Agent[]
  onCreateAgent: () => void
  onEditAgent: (agent: Agent) => void
  agents: Agent[]
}

export function AgentGuild({ onAddAgent, selectedAgents, onCreateAgent, onEditAgent, agents }: AgentGuildProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      agent.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const isAgentSelected = (agentId: string) => {
    return selectedAgents.some((agent) => agent.id === agentId)
  }

  const handleAgentClick = (agentId: string) => {
    setExpandedAgent(expandedAgent === agentId ? null : agentId)
  }

  const expandedAgentData = expandedAgent ? agents.find((a) => a.id === expandedAgent) : null

  return (
    <div
      className={`bg-gray-800 border-b border-gray-700 px-6 transition-all duration-500 ease-in-out ${
        expandedAgent ? "py-4" : "py-3"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Agent Home</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64 h-7 text-xs"
            />
          </div>
          <Button onClick={onCreateAgent} className="bg-pink-600 hover:bg-pink-700 text-white h-7 px-2 text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Create
          </Button>
        </div>
      </div>

      {/* Horizontal scrollable agent cards */}
      <div className="overflow-x-auto">
        <div className="flex space-x-3 pb-2 min-w-max">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className={`min-w-[320px] h-18 bg-gray-700 border-gray-600 hover:bg-gray-600 transition-all duration-300 cursor-pointer ${
                isAgentSelected(agent.id) ? "ring-1 ring-pink-500 bg-gray-600" : ""
              } ${expandedAgent === agent.id ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => handleAgentClick(agent.id)}
            >
              <div className="p-3 h-full flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src={agent.avatar || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-white text-sm truncate">{agent.name}</h3>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onAddAgent(agent)
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          onEditAgent(agent)
                        }}
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
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gray-600 text-gray-300 px-1 py-0 h-4"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {agent.isCustom && (
                        <Badge variant="outline" className="text-xs border-blue-500 text-blue-300 px-1 py-0 h-4">
                          Custom
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 truncate ml-1">{agent.model.split("-")[0]}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Expanded Agent Details with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expandedAgent ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {expandedAgent && expandedAgentData && (
          <div className="bg-gray-700 rounded-lg p-4 transform transition-transform duration-300">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-600 border-gray-500 h-8">
                <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-gray-500">
                  <Bot className="h-3 w-3 mr-1" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="capabilities" className="text-xs data-[state=active]:bg-gray-500">
                  <Globe className="h-3 w-3 mr-1" />
                  APIs
                </TabsTrigger>
                <TabsTrigger value="mcp" className="text-xs data-[state=active]:bg-gray-500">
                  <Database className="h-3 w-3 mr-1" />
                  MCP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Specialty</h4>
                    <p className="text-xs text-gray-300">{expandedAgentData.specialty}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Model</h4>
                    <Badge variant="outline" className="border-gray-500 text-gray-300 text-xs">
                      {expandedAgentData.model}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-white mb-1">Task Description</h4>
                    <p className="text-xs text-gray-300">{expandedAgentData.task}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="capabilities" className="mt-3">
                <div className="space-y-2">
                  {expandedAgentData.apiAccess.map((api) => (
                    <div key={api} className="flex items-center space-x-2 text-xs">
                      <Globe className="h-3 w-3 text-blue-400" />
                      <span className="text-gray-300">{api}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mcp" className="mt-3">
                <div className="space-y-2">
                  {expandedAgentData.mcpServers.map((mcp) => (
                    <div key={mcp.id} className="bg-gray-600 rounded p-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <Database className="h-3 w-3 text-green-400" />
                        <span className="text-xs font-medium text-white">{mcp.name}</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-1">{mcp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {mcp.capabilities.map((capability) => (
                          <Badge
                            key={capability}
                            variant="outline"
                            className="text-xs border-gray-400 text-gray-300 h-4"
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
