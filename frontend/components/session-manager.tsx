"use client"

import { useState } from "react"
import { Clock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Session {
  id: string
  name: string
  lastActive: Date
  agents: any[]
  messageCount: number
}

interface SessionManagerProps {
  currentSession: Session | null
  onSessionChange: (session: Session) => void
}

export function SessionManager({ currentSession, onSessionChange }: SessionManagerProps) {
  const [recentSessions] = useState<Session[]>([
    {
      id: "1",
      name: "Data Analysis Session",
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      agents: [{ name: "Analyzer" }, { name: "Summarizer" }],
      messageCount: 15,
    },
    {
      id: "2",
      name: "Document Processing",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      agents: [{ name: "OCR Agent" }],
      messageCount: 8,
    },
  ])

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    if (diffMins > 0) return `${diffMins}m ago`
    return "Just now"
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Recent Sessions</span>
          </div>

          {recentSessions.slice(0, 3).map((session) => (
            <Card
              key={session.id}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors p-2"
              onClick={() => onSessionChange(session)}
            >
              <div className="flex items-center space-x-2">
                <div>
                  <div className="text-xs font-medium text-white">{session.name}</div>
                  <div className="text-xs text-gray-400">{formatTimeAgo(session.lastActive)}</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {session.messageCount}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {currentSession && (
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Resume Session
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
