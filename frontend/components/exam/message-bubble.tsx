"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import type { GradeResult } from "@/lib/mock-data"

interface Message {
  id: string
  role: "examiner" | "student"
  content: string
  timestamp: string
  gradeResult?: GradeResult
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isExaminer = message.role === "examiner"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${isExaminer ? "" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isExaminer ? "bg-primary/20" : "bg-accent/20"
        }`}
      >
        {isExaminer ? <Bot className="w-5 h-5 text-primary" /> : <User className="w-5 h-5 text-accent" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isExaminer ? "" : "text-right"}`}>
        <div
          className={`inline-block p-4 rounded-2xl ${
            isExaminer
              ? "bg-card border border-border rounded-tl-sm"
              : "bg-primary text-primary-foreground rounded-tr-sm"
          }`}
        >
          <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 prose-table:my-2 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-table:border prose-th:border prose-td:border prose-th:bg-muted/50">
            <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{message.content}</ReactMarkdown>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
      </div>
    </motion.div>
  )
}
