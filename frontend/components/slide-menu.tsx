"use client"

import { useState } from "react"
import { X, Database, Cloud, Search, ChevronRight, Home, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface SlideMenuProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
}

export function SlideMenu({ isOpen, onClose, onNavigate }: SlideMenuProps) {
  const [recentSessions] = useState([
    {
      id: "1",
      name: "Data Analysis",
      lastActive: "30m ago",
      agents: 2,
      messageCount: 15,
    },
    {
      id: "2",
      name: "Document Processing",
      lastActive: "2h ago",
      agents: 1,
      messageCount: 8,
    },
    {
      id: "3",
      name: "SQL Queries",
      lastActive: "1d ago",
      agents: 2,
      messageCount: 23,
    },
  ])

  const mainMenuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
      description: "Main workspace",
      action: () => onNavigate("dashboard"),
    },
    {
      id: "vector",
      title: "Vector Database",
      icon: Search,
      description: "Semantic search & RAG",
      action: () => onNavigate("vector"),
    },
    {
      id: "database",
      title: "SQL Database",
      icon: Database,
      description: "Connect databases",
      action: () => onNavigate("database"),
    },
    {
      id: "crm",
      title: "CRM Integration",
      icon: Cloud,
      description: "Connect CRM systems",
      action: () => onNavigate("crm"),
    },
  ]

  const bottomMenuItems = [
    {
      id: "team",
      title: "Team",
      icon: Users,
      description: "Manage team members",
      action: () => {},
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      description: "App preferences",
      action: () => {},
    },
  ]

  return (
    <>
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide Panel with smooth transform */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 z-50 transform transition-transform duration-300 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">M+ BonsAI</h2>
            <p className="text-sm text-gray-400">AI Platform</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content with smooth scroll */}
        <div className="flex flex-col h-[calc(100vh-88px)] overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <div className="p-6 space-y-6">
              {/* Main Navigation */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
                <div className="space-y-1">
                  {mainMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                          <item.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-white group-hover:text-pink-300 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Recent Sessions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Recent Sessions</h3>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                    {recentSessions.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {recentSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-pink-300 transition-colors">
                              {session.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {session.lastActive} • {session.agents} agents
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          {session.messageCount}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Bottom Menu Items */}
              <div>
                <div className="space-y-1">
                  {bottomMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-white group-hover:text-pink-300 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 bg-gray-900">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">John Doe</div>
                <div className="text-xs text-gray-400">Pro Plan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
