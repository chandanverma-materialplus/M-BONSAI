"use client"

import { useState } from "react"
import { Database, Upload, Search, CheckCircle, AlertCircle, Plus, Trash2, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface VectorDatabasePanelProps {
  onBack: () => void
}

export function VectorDatabasePanel({ onBack }: VectorDatabasePanelProps) {
  const [vectorDbs, setVectorDbs] = useState([
    {
      id: "pinecone-1",
      name: "Knowledge Base",
      type: "pinecone" as const,
      status: "connected" as const,
      documentsCount: 45,
      lastIndexed: new Date(Date.now() - 1000 * 60 * 30),
    },
  ])

  const [indexedDocs, setIndexedDocs] = useState([
    {
      id: "doc-1",
      name: "Company Handbook.pdf",
      chunks: 156,
      indexed: new Date(Date.now() - 1000 * 60 * 60 * 2),
      size: "2.3 MB",
    },
    {
      id: "doc-2",
      name: "Product Docs.docx",
      chunks: 89,
      indexed: new Date(Date.now() - 1000 * 60 * 60 * 24),
      size: "1.8 MB",
    },
  ])

  const [newDbForm, setNewDbForm] = useState({
    name: "",
    type: "pinecone" as const,
    apiKey: "",
    environment: "",
    indexName: "",
  })

  const [indexingProgress, setIndexingProgress] = useState(0)
  const [isIndexing, setIsIndexing] = useState(false)

  const handleConnectDatabase = () => {
    const newDb = {
      id: `db-${Date.now()}`,
      name: newDbForm.name,
      type: newDbForm.type,
      status: "connected" as const,
      documentsCount: 0,
      lastIndexed: new Date(),
    }
    setVectorDbs([...vectorDbs, newDb])
    setNewDbForm({ name: "", type: "pinecone", apiKey: "", environment: "", indexName: "" })
  }

  const handleIndexDocuments = () => {
    setIsIndexing(true)
    setIndexingProgress(0)

    const interval = setInterval(() => {
      setIndexingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsIndexing(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-600 text-white text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case "indexing":
        return (
          <Badge className="bg-blue-600 text-white text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Indexing
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        )
    }
  }

  const getDbIcon = (type: string) => {
    const icons = {
      pinecone: "🌲",
      weaviate: "🕸️",
      chroma: "🎨",
      qdrant: "🔍",
    }
    return icons[type as keyof typeof icons] || "🗄️"
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">Vector Database</h1>
          <p className="text-sm text-gray-400">Manage semantic search and RAG capabilities</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="databases" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700 mb-6">
            <TabsTrigger value="databases" className="data-[state=active]:bg-gray-700">
              <Database className="h-4 w-4 mr-2" />
              Databases
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-gray-700">
              <Search className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="connect" className="data-[state=active]:bg-gray-700">
              <Plus className="h-4 w-4 mr-2" />
              Connect
            </TabsTrigger>
          </TabsList>

          <TabsContent value="databases">
            <div className="space-y-4">
              {vectorDbs.map((db) => (
                <Card key={db.id} className="bg-gray-800 border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{getDbIcon(db.type)}</div>
                      <div>
                        <h3 className="font-medium text-white flex items-center space-x-2">
                          <span>{db.name}</span>
                          <Badge variant="outline" className="border-gray-500 text-gray-300 text-xs">
                            {db.type}
                          </Badge>
                        </h3>
                        <p className="text-sm text-gray-400">
                          {db.documentsCount} docs • {db.lastIndexed.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(db.status)}
                      <Button
                        onClick={handleIndexDocuments}
                        disabled={isIndexing}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        {isIndexing ? "Indexing..." : "Index"}
                      </Button>
                    </div>
                  </div>

                  {isIndexing && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Processing documents...</span>
                        <span>{indexingProgress}%</span>
                      </div>
                      <Progress value={indexingProgress} className="h-2" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              {indexedDocs.map((doc) => (
                <Card key={doc.id} className="bg-gray-800 border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Search className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{doc.name}</h3>
                        <p className="text-sm text-gray-400">
                          {doc.chunks} chunks • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600 text-white text-xs">Indexed</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connect">
            <Card className="bg-gray-800 border-gray-700 p-6 max-w-lg">
              <h3 className="text-lg font-medium mb-4">Connect Database</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="db-name" className="text-sm text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="db-name"
                    value={newDbForm.name}
                    onChange={(e) => setNewDbForm({ ...newDbForm, name: e.target.value })}
                    placeholder="My Knowledge Base"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="db-type" className="text-sm text-gray-300">
                    Type
                  </Label>
                  <select
                    id="db-type"
                    value={newDbForm.type}
                    onChange={(e) => setNewDbForm({ ...newDbForm, type: e.target.value as any })}
                    className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  >
                    <option value="pinecone">Pinecone</option>
                    <option value="weaviate">Weaviate</option>
                    <option value="chroma">Chroma</option>
                    <option value="qdrant">Qdrant</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="api-key" className="text-sm text-gray-300">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={newDbForm.apiKey}
                    onChange={(e) => setNewDbForm({ ...newDbForm, apiKey: e.target.value })}
                    placeholder="Your API key"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="environment" className="text-sm text-gray-300">
                    Environment
                  </Label>
                  <Input
                    id="environment"
                    value={newDbForm.environment}
                    onChange={(e) => setNewDbForm({ ...newDbForm, environment: e.target.value })}
                    placeholder="us-west1-gcp"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={handleConnectDatabase} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  <Database className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
