"use client"

import type React from "react"

import { useState } from "react"
import { Database, Cloud, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Integration {
  id: string
  name: string
  type: "crm" | "database" | "storage"
  status: "connected" | "disconnected" | "error"
  icon: React.ReactNode
  description: string
}

export function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "salesforce",
      name: "Salesforce",
      type: "crm",
      status: "disconnected",
      icon: <Cloud className="h-5 w-5" />,
      description: "Connect your Salesforce CRM data",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      type: "crm",
      status: "disconnected",
      icon: <Cloud className="h-5 w-5" />,
      description: "Integrate HubSpot CRM and marketing data",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      type: "database",
      status: "disconnected",
      icon: <Database className="h-5 w-5" />,
      description: "Connect to your PostgreSQL database",
    },
  ])

  const [connectionForm, setConnectionForm] = useState({
    type: "",
    credentials: {},
  })

  const handleConnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId ? { ...integration, status: "connected" as const } : integration,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-600 text-white">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            Disconnected
          </Badge>
        )
    }
  }

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Data Integrations</h2>
        <p className="text-gray-400">
          Connect your data sources to enable AI agents to access and analyze your information.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="add" className="data-[state=active]:bg-gray-700">
            Add Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="bg-gray-800 border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-700 rounded-lg">{integration.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{integration.name}</h3>
                      <p className="text-sm text-gray-400">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(integration.status)}
                    <Button
                      onClick={() => handleConnect(integration.id)}
                      disabled={integration.status === "connected"}
                      className={
                        integration.status === "connected"
                          ? "bg-gray-600 text-gray-400"
                          : "bg-pink-600 hover:bg-pink-700 text-white"
                      }
                      size="sm"
                    >
                      {integration.status === "connected" ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="mt-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Integration</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="integration-type">Integration Type</Label>
                <select
                  id="integration-type"
                  className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                >
                  <option value="">Select integration type...</option>
                  <option value="salesforce">Salesforce CRM</option>
                  <option value="hubspot">HubSpot CRM</option>
                  <option value="postgresql">PostgreSQL Database</option>
                </select>
              </div>

              <div>
                <Label htmlFor="api-key">API Key / Connection String</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your credentials..."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="endpoint">Endpoint URL (optional)</Label>
                <Input
                  id="endpoint"
                  placeholder="https://your-instance.salesforce.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
