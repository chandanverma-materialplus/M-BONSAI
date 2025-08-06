"use client"

import { Bot, Settings, Zap, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface AgentSidebarProps {
  selectedAgents: Agent[]
  onRemoveAgent: (agentId: string) => void
}

export function AgentSidebar({ selectedAgents, onRemoveAgent }: AgentSidebarProps) {
  return (
    <div className="w-64 bg-gray-800 border-l border-gray-700 p-3 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h3 className="text-sm font-semibold text-white">Active Agents</h3>
        <Badge variant="secondary" className="bg-pink-600 text-white text-xs">
          {selectedAgents.length}
        </Badge>
      </div>

      {selectedAgents.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {selectedAgents.map((agent) => (
              <Card key={agent.id} className="bg-gray-700 border-gray-600 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={agent.avatar || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-white text-sm truncate">{agent.name}</h4>
                      <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                        <Zap className="h-2 w-2 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveAgent(agent.id)}
                    className="text-gray-400 hover:text-white h-5 w-5 flex-shrink-0"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-6 text-xs border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                  >
                    <Settings className="h-2 w-2 mr-1" />
                    Configure
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-6 text-xs border-pink-600 text-pink-300 hover:bg-pink-600 hover:text-white bg-transparent"
                  >
                    <Bot className="h-2 w-2 mr-1" />
                    {agent.specialty}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-12 flex-1 flex flex-col justify-center">
          <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="text-xs mb-1">No active agents</p>
          <p className="text-xs">Add agents from Agent Guild</p>
        </div>
      )}
    </div>
  )
}
