"use client"

import { Menu, Bell, Crown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface Session {
  id: string
  userId: string
  name: string
  lastActive: Date
  agents: any[]
  messages: any[]
  files: any[]
}

interface HeaderProps {
  onMenuToggle: () => void
  currentSession?: Session | null
}

export function Header({ onMenuToggle, currentSession }: HeaderProps) {
  // Mock user data - in real app, get from auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={onMenuToggle}>
            <Menu className="h-5 w-5" />
          </Button>
          <button
            onClick={() => window.location.reload()}
            className="text-lg font-bold text-white hover:text-pink-300 transition-colors"
          >
            M+ BonsAI
          </button>
          <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
            <Crown className="h-3 w-3 mr-1" />
            {user.plan}
          </Badge>
          {currentSession && <div className="text-sm text-gray-400">Session: {currentSession.name}</div>}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Session
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 w-56">
              <div className="px-3 py-2 border-b border-gray-700">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Profile Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                Billing & Usage
                <Badge variant="secondary" className="ml-auto bg-purple-600 text-white text-xs">
                  {user.plan}
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">API Keys</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Team Management</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Help & Support</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-gray-700">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
