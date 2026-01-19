"use client"

import { motion } from "framer-motion"
import { Upload, MessageSquare, CheckCircle2, RotateCcw } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Document",
    description: "Drag and drop any PDF file up to 50MB. Our AI instantly analyzes and extracts key content.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Answer Questions",
    description: "Engage in an interactive examination with AI-generated questions based on your document.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Receive Feedback",
    description: "Get instant grading with PASS, REVIEW, or FAIL feedback plus evidence citations.",
  },
  {
    step: "04",
    icon: RotateCcw,
    title: "Retry & Improve",
    description: "Use follow-up questions and retry options to deepen your understanding.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            How It <span className="gradient-text-purple">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple four-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground" style={{ fontFamily: "var(--font-syne)" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
