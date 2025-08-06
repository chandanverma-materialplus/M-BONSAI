"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Paperclip, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  agentId?: string
  timestamp: Date
  attachedFiles?: string[]
}

interface Agent {
  id: string
  name: string
  description: string
  avatar?: string
  tags: string[]
  model: string
  isActive: boolean
}

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  uploadedAt: Date
}

interface ChatAreaProps {
  messages: Message[]
  onSendMessage: (content: string, attachedFiles?: string[]) => void
  selectedAgents: Agent[]
  isStreaming: boolean
  uploadedFiles: UploadedFile[]
}

export function ChatArea({ messages, onSendMessage, selectedAgents, isStreaming, uploadedFiles }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showFileSelector, setShowFileSelector] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim() && selectedAgents.length > 0) {
      onSendMessage(inputValue, selectedFiles)
      setInputValue("")
      setSelectedFiles([])
      setShowFileSelector(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getAgentName = (agentId?: string) => {
    if (!agentId) return "AI Agent"
    const agent = selectedAgents.find((a) => a.id === agentId)
    return agent?.name || "AI Agent"
  }

  const getAgentAvatar = (agentId?: string) => {
    if (!agentId) return "🤖"
    const agent = selectedAgents.find((a) => a.id === agentId)
    return agent?.avatar || "🤖"
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900 min-h-0">
      {/* Header - fixed */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">AI Workspace</h3>
          <div className="flex items-center space-x-2">
            {selectedAgents.map((agent) => (
              <Badge key={agent.id} variant="secondary" className="bg-pink-600 text-white text-xs">
                {agent.name}
              </Badge>
            ))}
            {selectedAgents.length === 0 && (
              <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                No agents selected
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Messages - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-3 max-w-5xl mx-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-16">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ready to assist! 🚀</h3>
                <p className="text-sm text-gray-400 mb-4 max-w-md mx-auto">
                  Add agents from the Guild above and start collaborating with AI
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Upload docs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Connect data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Ask questions</span>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] min-w-[300px] rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-200 hover:shadow-xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-pink-600 to-pink-500 border-pink-400/30 text-white"
                        : "bg-gray-800/80 border-gray-600/50 text-white"
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-start space-x-3">
                        {message.sender === "agent" && (
                          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-600">
                            {getAgentAvatar(message.agentId).startsWith("http") ? (
                              <img
                                src={getAgentAvatar(message.agentId) || "/placeholder.svg"}
                                alt="Agent"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm bg-gradient-to-br from-blue-500 to-purple-600">
                                {getAgentAvatar(message.agentId)}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          {message.sender === "agent" && (
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-semibold text-blue-300">
                                {getAgentName(message.agentId)}
                              </span>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <span className="text-xs text-gray-400">
                                {(() => {
                                  const date =
                                    message.timestamp instanceof Date
                                      ? message.timestamp
                                      : new Date(message.timestamp as unknown as string)
                                  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                })()}
                              </span>
                            </div>
                          )}

                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>

                          {message.attachedFiles && message.attachedFiles.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachedFiles.map((fileId) => {
                                const file = uploadedFiles.find((f) => f.id === fileId)
                                return file ? (
                                  <div
                                    key={fileId}
                                    className="flex items-center space-x-2 text-xs bg-black/20 rounded-lg p-2"
                                  >
                                    <FileText className="h-3 w-3" />
                                    <span>{file.name}</span>
                                  </div>
                                ) : null
                              })}
                            </div>
                          )}

                          {message.sender === "user" && (
                            <div className="text-xs opacity-70 mt-1 text-right">
                              {(() => {
                                const date =
                                  message.timestamp instanceof Date
                                    ? message.timestamp
                                    : new Date(message.timestamp as unknown as string)
                                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                              })()}
                            </div>
                          )}
                        </div>

                        {message.sender === "user" && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center flex-shrink-0 ring-2 ring-pink-400/30">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {isStreaming && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 border border-gray-600/50 rounded-2xl shadow-lg backdrop-blur-sm p-3 min-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-300">Thinking</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-pink-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-pink-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* File Selector - conditional */}
      {showFileSelector && uploadedFiles.length > 0 && (
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
          <div className="max-w-5xl mx-auto">
            <h4 className="text-sm font-medium text-white mb-2">Select files to include:</h4>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <Card
                  key={file.id}
                  className={`p-2 cursor-pointer transition-colors ${
                    selectedFiles.includes(file.id)
                      ? "bg-pink-600 border-pink-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-3 w-3 text-gray-300" />
                    <span className="text-xs text-white truncate">{file.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area - fixed */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          {selectedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {selectedFiles.map((fileId) => {
                const file = uploadedFiles.find((f) => f.id === fileId)
                return file ? (
                  <Badge key={fileId} variant="secondary" className="bg-pink-600 text-white text-xs">
                    {file.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFileSelection(fileId)}
                      className="h-3 w-3 ml-1 p-0 hover:bg-transparent"
                    >
                      ×
                    </Button>
                  </Badge>
                ) : null
              })}
            </div>
          )}

          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedAgents.length > 0
                    ? `Ask ${selectedAgents.map((a) => a.name).join(", ")}...`
                    : "Add agents to start chatting..."
                }
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12 text-base pr-12 rounded-xl"
                disabled={selectedAgents.length === 0}
              />
              {uploadedFiles.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFileSelector(!showFileSelector)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
                    selectedFiles.length > 0 ? "text-pink-400" : "text-gray-400"
                  } hover:text-white`}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              onClick={handleSend}
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white h-12 px-6 rounded-xl shadow-lg"
              disabled={!inputValue.trim() || selectedAgents.length === 0 || isStreaming}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-xs text-gray-400 mt-2 text-center">
            {selectedAgents.length} agent{selectedAgents.length !== 1 ? "s" : ""} active • Press Enter to send,
            Shift+Enter for new line
            {uploadedFiles.length > 0 && " • Click 📎 to attach files"}
          </div>
        </div>
      </div>
    </div>
  )
}
