"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X, FileText, ImageIcon, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  uploadedAt: Date
}

interface FileUploadSidebarProps {
  uploadedFiles: UploadedFile[]
  setUploadedFiles: (files: UploadedFile[]) => void
}

export function FileUploadSidebar({ uploadedFiles, setUploadedFiles }: FileUploadSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file.name),
      uploadedAt: new Date(),
    }))

    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileType = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase()
    if (["pdf", "doc", "docx", "txt"].includes(extension || "")) return "document"
    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension || "")) return "image"
    if (["csv", "xlsx", "xls"].includes(extension || "")) return "data"
    return "file"
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-green-400" />
      case "data":
        return <Database className="h-4 w-4 text-purple-400" />
      default:
        return <File className="h-4 w-4 text-gray-400" />
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-white mb-4 flex-shrink-0">Document Library</h3>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-3 mb-4 transition-colors flex-shrink-0 ${
          isDragOver ? "border-pink-500 bg-pink-500/10" : "border-gray-600 hover:border-gray-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
          <p className="text-xs text-gray-400 mb-2">Drag & drop files</p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-1 rounded-full text-xs h-7"
          >
            Browse Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.csv,.xlsx,.xls"
          />
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <span className="text-xs text-gray-400">Uploaded Files</span>
          <Badge variant="secondary" className="bg-gray-600 text-gray-300 text-xs">
            {uploadedFiles.length}
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="bg-gray-700 border-gray-600 p-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 min-w-0 flex-1">
                    {getFileIcon(file.type)}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-white font-medium truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-xs text-gray-400">{file.size}</div>
                      <div className="text-xs text-gray-500">{file.uploadedAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-white h-4 w-4 flex-shrink-0 ml-1"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              </Card>
            ))}

            {uploadedFiles.length === 0 && (
              <div className="text-center text-gray-400 mt-6">
                <File className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No files uploaded yet</p>
                <p className="text-xs mt-1">Upload documents to analyze</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Types Info */}
      <div className="mt-3 p-2 bg-gray-700 rounded-lg flex-shrink-0">
        <h4 className="text-xs font-medium text-white mb-1">Supported Formats</h4>
        <div className="space-y-1 text-xs text-gray-400">
          <div>📄 PDF, DOC, DOCX, TXT</div>
          <div>🖼️ JPG, PNG, GIF</div>
          <div>📊 CSV, XLSX, XLS</div>
        </div>
      </div>
    </div>
  )
}
