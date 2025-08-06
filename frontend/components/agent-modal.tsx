"use client"

import { useState } from "react"
import { X, Bot, Settings, Globe, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

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

interface AgentModalProps {
  agent: Agent
  isOpen: boolean
  onClose: () => void
  onEdit: (agentData: any) => void
  onAdd: () => void
  isAdded: boolean
}

export function AgentModal({ agent, isOpen, onClose, onEdit, onAdd, isAdded }: AgentModalProps) {
  const [selectedMCPs, setSelectedMCPs] = useState<string[]>(agent.mcpServers.map((mcp) => mcp.id))
  const [isEditing, setIsEditing] = useState(false)

  const availableMCPs: MCPServer[] = [
    {
      id: "web-search",
      name: "Web Search MCP",
      url: "mcp://websearch.example.com",
      description: "Real-time web search and information retrieval",
      capabilities: ["web-search", "real-time-data", "fact-checking"],
    },
    {
      id: "database-connector",
      name: "Database Connector MCP",
      url: "mcp://database.example.com",
      description: "Multi-database connectivity and querying",
      capabilities: ["sql-execution", "schema-analysis", "data-export"],
    },
    {
      id: "file-processor",
      name: "File Processing MCP",
      url: "mcp://fileprocessor.example.com",
      description: "Advanced file processing and conversion",
      capabilities: ["file-conversion", "text-extraction", "image-processing"],
    },
    {
      id: "api-gateway",
      name: "API Gateway MCP",
      url: "mcp://apigateway.example.com",
      description: "External API integration and management",
      capabilities: ["api-calls", "authentication", "rate-limiting"],
    },
    ...agent.mcpServers,
  ]

  const handleSaveEdit = () => {
    const updatedAgent = {
      ...agent,
      mcpServers: availableMCPs.filter((mcp) => selectedMCPs.includes(mcp.id)),
    }
    onEdit(updatedAgent)
    setIsEditing(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={agent.avatar || "/placeholder.svg"} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{agent.name}</h2>
              <p className="text-sm text-gray-400">{agent.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isAdded && (
              <Button onClick={onAdd} className="bg-pink-600 hover:bg-pink-700 text-white">
                Add to Chat
              </Button>
            )}
            {isAdded && (
              <Badge className="bg-green-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Active in Chat
              </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="w-full bg-gray-700 border-b border-gray-600 rounded-none">
            <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-gray-600">
              <Bot className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="flex-1 data-[state=active]:bg-gray-600">
              <Globe className="h-4 w-4 mr-2" />
              Capabilities
            </TabsTrigger>
            <TabsTrigger value="mcp" className="flex-1 data-[state=active]:bg-gray-600">
              <Database className="h-4 w-4 mr-2" />
              MCP Access
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-gray-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh]">
            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Description</h3>
                  <p className="text-gray-300">{agent.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Primary Task</h3>
                  <p className="text-gray-300">{agent.task}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">AI Model</h3>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    {agent.model}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="capabilities" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">API Access</h3>
                {agent.apiAccess.map((api) => (
                  <Card key={api} className="bg-gray-700 border-gray-600 p-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="font-medium text-white">{api}</h4>
                        <p className="text-sm text-gray-400">External API integration</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mcp" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">MCP Server Access</h3>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                  >
                    {isEditing ? "Cancel" : "Edit Access"}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">Select which MCP servers this agent can access:</p>
                    {availableMCPs.map((mcp) => (
                      <Card key={mcp.id} className="bg-gray-700 border-gray-600 p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedMCPs.includes(mcp.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMCPs([...selectedMCPs, mcp.id])
                              } else {
                                setSelectedMCPs(selectedMCPs.filter((id) => id !== mcp.id))
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{mcp.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">{mcp.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {mcp.capabilities.map((capability) => (
                                <Badge
                                  key={capability}
                                  variant="outline"
                                  className="text-xs border-gray-500 text-gray-300"
                                >
                                  {capability}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    <Button onClick={handleSaveEdit} className="bg-pink-600 hover:bg-pink-700 text-white">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {agent.mcpServers.map((mcp) => (
                      <Card key={mcp.id} className="bg-gray-700 border-gray-600 p-4">
                        <div className="flex items-start space-x-3">
                          <Database className="h-5 w-5 text-green-400 mt-1" />
                          <div>
                            <h4 className="font-medium text-white">{mcp.name}</h4>
                            <p className="text-sm text-gray-400 mb-2">{mcp.description}</p>
                            <p className="text-xs text-gray-500 mb-2">{mcp.url}</p>
                            <div className="flex flex-wrap gap-1">
                              {mcp.capabilities.map((capability) => (
                                <Badge
                                  key={capability}
                                  variant="outline"
                                  className="text-xs border-gray-500 text-gray-300"
                                >
                                  {capability}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Agent Type</h3>
                  <Badge variant={agent.isCustom ? "default" : "secondary"} className="bg-blue-600 text-white">
                    {agent.isCustom ? "Custom Agent" : "System Agent"}
                  </Badge>
                </div>

                {agent.isCustom && agent.createdBy && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Created By</h3>
                    <p className="text-gray-300">{agent.createdBy}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gray-700 border-gray-600 p-3">
                      <div className="text-sm text-gray-400">Response Time</div>
                      <div className="text-lg font-medium text-white">1.2s avg</div>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600 p-3">
                      <div className="text-sm text-gray-400">Success Rate</div>
                      <div className="text-lg font-medium text-white">98.5%</div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}
