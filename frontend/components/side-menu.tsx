"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Database, Cloud, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VectorDatabasePanel } from "./vector-database-panel"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
  onSessionSelect?: (sessionId: string) => void
}

export function SideMenu({ isOpen, onClose, onSessionSelect }: SideMenuProps) {
  const [activeTab, setActiveTab] = useState("sessions")
  const [recentSessions] = useState([
    {
      id: "1",
      name: "Data Analysis Session",
      lastActive: new Date(Date.now() - 1000 * 60 * 30),
      agents: ["Analyzer", "Summarizer"],
      messageCount: 15,
    },
    {
      id: "2",
      name: "Document Processing",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
      agents: ["OCR Agent"],
      messageCount: 8,
    },
    {
      id: "3",
      name: "SQL Query Session",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
      agents: ["SQL Agent", "Data Analyzer"],
      messageCount: 23,
    },
  ])

  const handleSessionClick = (sessionId: string) => {
    onSessionSelect?.(sessionId)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">M+ BonsAI</h1>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Vertical Tabs */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === "sessions" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "sessions" ? "bg-pink-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("sessions")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Sessions
            </Button>
            <Button
              variant={activeTab === "vector" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "vector" ? "bg-pink-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("vector")}
            >
              <Search className="h-4 w-4 mr-2" />
              Vector Database
            </Button>
            <Button
              variant={activeTab === "database" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "database" ? "bg-pink-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("database")}
            >
              <Database className="h-4 w-4 mr-2" />
              Connect Database
            </Button>
            <Button
              variant={activeTab === "crm" ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === "crm" ? "bg-pink-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("crm")}
            >
              <Cloud className="h-4 w-4 mr-2" />
              Connect CRM
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "sessions" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
              <div className="grid gap-4">
                {recentSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="bg-gray-800 border-gray-700 p-4 hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleSessionClick(session.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{session.name}</h3>
                      <Badge variant="secondary" className="bg-pink-600 text-white">
                        {session.messageCount} messages
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">Last active: {session.lastActive.toLocaleString()}</div>
                    <div className="flex flex-wrap gap-1">
                      {session.agents.map((agent, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "vector" && <VectorDatabasePanel />}

          {activeTab === "database" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Connect Database</h2>
              <Card className="bg-gray-800 border-gray-700 p-6 max-w-md">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-type" className="text-gray-300">
                      Database Type
                    </Label>
                    <select
                      id="db-type"
                      className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="">Select database type...</option>
                      <option value="postgresql">PostgreSQL</option>
                      <option value="mysql">MySQL</option>
                      <option value="mongodb">MongoDB</option>
                      <option value="sqlite">SQLite</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="db-host" className="text-gray-300">
                      Host
                    </Label>
                    <Input
                      id="db-host"
                      placeholder="localhost:5432"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="db-name" className="text-gray-300">
                      Database Name
                    </Label>
                    <Input id="db-name" placeholder="my_database" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="db-user" className="text-gray-300">
                      Username
                    </Label>
                    <Input id="db-user" placeholder="username" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="db-pass" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="db-pass"
                      type="password"
                      placeholder="password"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">Connect Database</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "crm" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Connect CRM</h2>
              <Card className="bg-gray-800 border-gray-700 p-6 max-w-md">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="crm-type" className="text-gray-300">
                      CRM Type
                    </Label>
                    <select
                      id="crm-type"
                      className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="">Select CRM...</option>
                      <option value="salesforce">Salesforce</option>
                      <option value="hubspot">HubSpot</option>
                      <option value="pipedrive">Pipedrive</option>
                      <option value="zoho">Zoho CRM</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="crm-url" className="text-gray-300">
                      Instance URL
                    </Label>
                    <Input
                      id="crm-url"
                      placeholder="https://your-instance.salesforce.com"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="crm-token" className="text-gray-300">
                      API Token
                    </Label>
                    <Input
                      id="crm-token"
                      type="password"
                      placeholder="Your API token"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">Connect CRM</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
