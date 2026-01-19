"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import Link from "next/link"
import { UploadSphere } from "@/components/three/upload-sphere"
import { FileUpload } from "@/components/exam/file-upload"
import { ExaminationInterface } from "@/components/exam/examination-interface"

export default function ExamPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [processingStatus, setProcessingStatus] = useState("")
  const [initialExamData, setInitialExamData] = useState<any>(null)

  // UPDATED: Now accepts enableVision from the child component
  const handleFileUpload = async (file: File, enableVision: boolean) => {
    setIsUploading(true)
    setDocumentName(file.name)

    setProcessingStatus("uploading")
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      // UPDATED: Pass the vision toggle state to the backend
      formData.append('enable_vision', enableVision.toString())

      const response = await fetch('http://localhost:8000/upload_pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setProcessingStatus("")
      setIsExamStarted(true)
      // Pass the initial data to the interface
      setInitialExamData(data)
    } catch (error) {
      console.error('Upload error:', error)
      setProcessingStatus("")
      // Handle error, maybe show message
    } finally {
      setIsUploading(false)
    }
  }

  const handleReset = () => {
    setIsExamStarted(false)
    setDocumentName("")
    setProcessingStatus("")
  }

  if (isExamStarted) {
    return <ExaminationInterface documentName={documentName} onReset={handleReset} initialExamData={initialExamData} />
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header - Updated branding */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm">Lexicognition AI</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            <span className="text-foreground italic">Examination </span>
            <span className="gradient-text">Controller</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload your PDF document to begin the intelligent examination process
          </p>
        </motion.div>

        {/* 3D Sphere and Upload Area */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UploadSphere />
          </motion.div>

          {/* Upload Area - Pass processing status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} processingStatus={processingStatus} />
          </motion.div>
        </div>
      </div>
    </main>
  )
}