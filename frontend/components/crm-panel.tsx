"use client"

import { useState } from "react"
import { ArrowLeft, Cloud, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CrmPanelProps {
  onBack: () => void
}

export function CrmPanel({ onBack }: CrmPanelProps) {
  const [connections, setConnections] = useState([
    {
      id: "sf-1",
      name: "Salesforce Prod",
      type: "Salesforce",
      instance: "company.salesforce.com",
      status: "connected",
    },
  ])

  const [formData, setFormData] = useState({
    name: "",
    type: "salesforce",
    instanceUrl: "",
    apiToken: "",
  })

  const handleConnect = () => {
    const newConnection = {
      id: `crm-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      instance: formData.instanceUrl,
      status: "connected",
    }
    setConnections([...connections, newConnection])
    setFormData({ name: "", type: "salesforce", instanceUrl: "", apiToken: "" })
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">CRM Integration</h1>
          <p className="text-sm text-gray-400">Connect to your CRM systems</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Existing Connections */}
          <div>
            <h2 className="text-lg font-medium mb-4">Active Integrations</h2>
            <div className="space-y-3">
              {connections.map((conn) => (
                <Card key={conn.id} className="bg-gray-800 border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">{conn.name}</h3>
                        <p className="text-sm text-gray-400">
                          {conn.type} • {conn.instance}
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
            <h2 className="text-lg font-medium mb-4">Add Integration</h2>
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="crm-name" className="text-sm text-gray-300">
                    Integration Name
                  </Label>
                  <Input
                    id="crm-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My CRM"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="crm-type" className="text-sm text-gray-300">
                    CRM Type
                  </Label>
                  <select
                    id="crm-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="salesforce">Salesforce</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="pipedrive">Pipedrive</option>
                    <option value="zoho">Zoho CRM</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="instance-url" className="text-sm text-gray-300">
                    Instance URL
                  </Label>
                  <Input
                    id="instance-url"
                    value={formData.instanceUrl}
                    onChange={(e) => setFormData({ ...formData, instanceUrl: e.target.value })}
                    placeholder="https://company.salesforce.com"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="api-token" className="text-sm text-gray-300">
                    API Token
                  </Label>
                  <Input
                    id="api-token"
                    type="password"
                    value={formData.apiToken}
                    onChange={(e) => setFormData({ ...formData, apiToken: e.target.value })}
                    placeholder="Your API token"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={handleConnect} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Connect CRM
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
