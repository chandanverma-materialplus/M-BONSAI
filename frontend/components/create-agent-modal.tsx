"use client"

import { useState } from "react"
import { X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateAgentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (agentData: any) => void
}

export function CreateAgentModal({ isOpen, onClose, onSave }: CreateAgentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    task: "",
    model: "gpt-4-turbo",
    tags: [] as string[],
    apiAccess: [] as string[],
    mcpServers: [] as string[],
    avatar: "",
  })

  const [newTag, setNewTag] = useState("")
  const [newAPI, setNewAPI] = useState("")
  const [newMCPUrl, setNewMCPUrl] = useState("")
  const [newMCPName, setNewMCPName] = useState("")

  const availableModels = [
    "gpt-4-turbo",
    "gpt-4",
    "gpt-3.5-turbo",
    "claude-3-opus",
    "claude-3-sonnet",
    "claude-3-haiku",
    "gemini-pro",
    "llama-2-70b",
  ]

  const availableMCPs = [
    { id: "web-search", name: "Web Search MCP", url: "mcp://websearch.example.com" },
    { id: "database", name: "Database Connector MCP", url: "mcp://database.example.com" },
    { id: "file-processor", name: "File Processing MCP", url: "mcp://fileprocessor.example.com" },
    { id: "api-gateway", name: "API Gateway MCP", url: "mcp://apigateway.example.com" },
    { id: "vector-search", name: "Vector Search MCP", url: "mcp://vector.example.com" },
  ]

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const handleAddAPI = () => {
    if (newAPI.trim() && !formData.apiAccess.includes(newAPI.trim())) {
      setFormData({ ...formData, apiAccess: [...formData.apiAccess, newAPI.trim()] })
      setNewAPI("")
    }
  }

  const handleRemoveAPI = (api: string) => {
    setFormData({ ...formData, apiAccess: formData.apiAccess.filter((a) => a !== api) })
  }

  const handleAddCustomMCP = () => {
    if (newMCPName.trim() && newMCPUrl.trim()) {
      const mcpId = `custom-${Date.now()}`
      setFormData({ ...formData, mcpServers: [...formData.mcpServers, mcpId] })
      setNewMCPName("")
      setNewMCPUrl("")
    }
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.task.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const agentData = {
      ...formData,
      avatar:
        formData.avatar || `https://api.dicebear.com/7.x/personas/svg?seed=${formData.name}&backgroundColor=b6e3f4`,
    }

    onSave(agentData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Create Custom Agent</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Basic Information</h3>

              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Agent Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter agent name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this agent does"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="task" className="text-gray-300">
                  Primary Task *
                </Label>
                <Textarea
                  id="task"
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  placeholder="Define the main task this agent will perform"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="model" className="text-gray-300">
                  AI Model
                </Label>
                <select
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="avatar" className="text-gray-300">
                  Avatar URL (optional)
                </Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.png"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Tags</h3>
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button onClick={handleAddTag} className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-gray-600 text-gray-300">
                    {tag}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTag(tag)}
                      className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* API Access */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">API Access</h3>
              <div className="flex space-x-2">
                <Input
                  value={newAPI}
                  onChange={(e) => setNewAPI(e.target.value)}
                  placeholder="API name or endpoint"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleAddAPI()}
                />
                <Button onClick={handleAddAPI} className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.apiAccess.map((api) => (
                  <Card key={api} className="bg-gray-700 border-gray-600 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">{api}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAPI(api)}
                        className="text-gray-400 hover:text-white h-6 w-6"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* MCP Servers */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">MCP Server Access</h3>

              <div className="space-y-2">
                <Label className="text-gray-300">Available MCP Servers</Label>
                {availableMCPs.map((mcp) => (
                  <Card key={mcp.id} className="bg-gray-700 border-gray-600 p-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={formData.mcpServers.includes(mcp.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({ ...formData, mcpServers: [...formData.mcpServers, mcp.id] })
                          } else {
                            setFormData({ ...formData, mcpServers: formData.mcpServers.filter((id) => id !== mcp.id) })
                          }
                        }}
                      />
                      <div>
                        <div className="text-white font-medium">{mcp.name}</div>
                        <div className="text-xs text-gray-400">{mcp.url}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Add Custom MCP Server</Label>
                <div className="space-y-2">
                  <Input
                    value={newMCPName}
                    onChange={(e) => setNewMCPName(e.target.value)}
                    placeholder="MCP Server Name"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Input
                    value={newMCPUrl}
                    onChange={(e) => setNewMCPUrl(e.target.value)}
                    placeholder="mcp://your-server.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button onClick={handleAddCustomMCP} className="bg-pink-600 hover:bg-pink-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom MCP
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-pink-600 hover:bg-pink-700 text-white">
            Create Agent
          </Button>
        </div>
      </div>
    </div>
  )
}
