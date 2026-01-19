"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp, FileText } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import type { GradeResult } from "@/lib/mock-data"

interface GradeCardProps {
  result: GradeResult
}

// Helper to clean evidence text - removes headers, citations, and extra formatting
function cleanEvidenceContent(content: string): string {
  let cleaned = content
  // Remove markdown headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '')
  // Remove numbered section headers like "3.2.3 "
  cleaned = cleaned.replace(/^\d+(\.\d+)*\s+/gm, '')
  // Remove bracketed citations like [31, 2, 8]
  cleaned = cleaned.replace(/\[\d+(?:,\s*\d+)*\]/g, '')
  // Clean extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()
  return cleaned
}

export function GradeCard({ result }: GradeCardProps) {
  const [showPerfectAnswer, setShowPerfectAnswer] = useState(false)

  const gradeStyles = {
    PASS: {
      bg: "bg-success/10",
      border: "border-success/30",
      icon: CheckCircle2,
      iconColor: "text-success",
      label: "PASSED",
      labelBg: "bg-success/20 text-success",
    },
    REVIEW: {
      bg: "bg-warning/10",
      border: "border-warning/30",
      icon: AlertTriangle,
      iconColor: "text-warning",
      label: "NEEDS REVIEW",
      labelBg: "bg-warning/20 text-warning",
    },
    FAIL: {
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      icon: XCircle,
      iconColor: "text-destructive",
      label: "FAILED",
      labelBg: "bg-destructive/20 text-destructive",
    },
  }

  const style = gradeStyles[result.grade]
  const Icon = style.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 ${style.bg} border ${style.border}`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${style.iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${style.labelBg}`}>{style.label}</span>
          </div>
          <h4 className="font-bold text-foreground" style={{ fontFamily: "var(--font-syne)" }}>
            Assessment Result
          </h4>
        </div>
      </div>

      {/* Feedback */}
      <div className="mb-4">
        <div className="text-sm text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 prose-strong:text-foreground prose-table:my-2 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-table:border prose-th:border prose-td:border prose-th:bg-muted/50">
          <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{result.feedback}</ReactMarkdown>
        </div>
      </div>

      {/* Evidence Cards */}
      {result.evidence.length > 0 && (
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Supporting Evidence
          </h5>
          <div className="space-y-2">
            {result.evidence.map((ev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-2 p-3 rounded-lg bg-background/50"
              >
                <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Reference {idx + 1} (Page {ev.page})
                  </p>
                  <p className="text-xs text-muted-foreground/80 mb-1">Source: {ev.source}</p>
                  <div className="text-sm text-foreground italic leading-relaxed">
                    {cleanEvidenceContent(ev.content)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Perfect Answer Toggle */}
      <button
        onClick={() => setShowPerfectAnswer(!showPerfectAnswer)}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
      >
        <span className="text-sm font-medium text-foreground">View Perfect Answer</span>
        {showPerfectAnswer ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {showPerfectAnswer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-lg bg-background/50 border border-border">
              <div className="text-sm text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-1">
                <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{result.perfectAnswer}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
