"use client"

import { motion } from "framer-motion"
import { FileText, RotateCcw, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import type { Evidence } from "@/lib/mock-data"

interface ExamSidebarProps {
  currentQuestion: number
  totalQuestions: number
  evidenceList: Evidence[]
  isFollowUp: boolean
  onReset: () => void
}

export function ExamSidebar({ currentQuestion, totalQuestions, evidenceList, isFollowUp, onReset }: ExamSidebarProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <>
      {/* Mobile Toggle - Hidden for now, full sidebar on desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-80 bg-card border-r border-border flex-col z-50">
        {/* Header - Updated title to match Streamlit */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground" style={{ fontFamily: "var(--font-syne)" }}>
                Examination Controller
              </h3>
            </div>
          </div>

          {isFollowUp && (
            <div className="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/10 border border-warning/30">
              <AlertCircle className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning font-medium">Follow-up Question Active</span>
            </div>
          )}

          {!isFollowUp && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Question {currentQuestion} of {totalQuestions}
              </p>
            </div>
          )}
        </div>

        {/* Evidence Section - Updated title to "Verified Evidence" */}
        <div className="flex-1 overflow-y-auto p-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Verified Evidence
          </h4>

          {evidenceList.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Evidence will appear here after grading.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {evidenceList.map((evidence, index) => (
                <motion.div
                  key={`${evidence.source}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground mb-1">
                        Reference {index + 1} (Page {evidence.page})
                      </p>
                      <p className="text-xs text-muted-foreground/80 mb-2">Source: {evidence.source}</p>
                      <div className="text-sm text-foreground/90 italic leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-1">
                        <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{evidence.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="p-6 border-t border-border">
          <Button variant="outline" onClick={onReset} className="w-full rounded-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset System
          </Button>
        </div>
      </aside>
    </>
  )
}
