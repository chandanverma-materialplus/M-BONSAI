"use client"

import { useState } from "react"
import { ArrowLeft, Database, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DatabasePanelProps {
  onBack: () => void
}

export function DatabasePanel({ onBack }: DatabasePanelProps) {
  const [connections, setConnections] = useState([
    {
      id: "pg-1",
      name: "Production DB",
      type: "PostgreSQL",
      host: "prod-db.company.com",
      status: "connected",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
    type: "postgresql",
    host: "",
    database: "",
    username: "",
    password: "",
  })

  const handleConnect = () => {
    const newConnection = {
      id: `db-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      host: formData.host,
      status: "connected",
    }
    setConnections([...connections, newConnection])
    setFormData({ name: "", type: "postgresql", host: "", database: "", username: "", password: "" })
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">SQL Database</h1>
          <p className="text-sm text-gray-400">Connect to your SQL databases</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Existing Connections */}
          <div>
            <h2 className="text-lg font-medium mb-4">Active Connections</h2>
            <div className="space-y-3">
              {connections.map((conn) => (
                <Card key={conn.id} className="bg-gray-800 border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">{conn.name}</h3>
                        <p className="text-sm text-gray-400">
                          {conn.type} • {conn.host}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* New Connection Form */}
          <div>
            <h2 className="text-lg font-medium mb-4">Add Connection</h2>
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="conn-name" className="text-sm text-gray-300">
                    Connection Name
                  </Label>
                  <Input
                    id="conn-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Database"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="db-type" className="text-sm text-gray-300">
                    Database Type
                  </Label>
                  <select
                    id="db-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                    <option value="mongodb">MongoDB</option>
                    <option value="sqlite">SQLite</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="host" className="text-sm text-gray-300">
                    Host
                  </Label>
                  <Input
                    id="host"
                    value={formData.host}
                    onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                    placeholder="localhost:5432"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="database" className="text-sm text-gray-300">
                    Database
                  </Label>
                  <Input
                    id="database"
                    value={formData.database}
                    onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                    placeholder="my_database"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="username" className="text-sm text-gray-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="username"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="password"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={handleConnect} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Connect Database
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
