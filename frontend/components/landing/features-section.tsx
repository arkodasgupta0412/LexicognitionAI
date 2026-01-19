"use client"

import { motion } from "framer-motion"
import { GraduationCap, Target, Zap, Brain, FileText, BarChart3 } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "AI Examiner",
    description: "Intelligent questioning & grading powered by advanced AI models",
  },
  {
    icon: Target,
    title: "Evidence-Based",
    description: "Verifiable source citations from your uploaded documents",
  },
  {
    icon: Zap,
    title: "Real-Time",
    description: "Instant feedback & scoring as you answer each question",
  },
]

const additionalFeatures = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description: "Questions adapt based on your performance and understanding",
  },
  {
    icon: FileText,
    title: "PDF Processing",
    description: "Upload any PDF document up to 50MB for instant analysis",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your examination progress with detailed analytics",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Primary Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "var(--font-syne)" }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for comprehensive AI-powered examinations
          </p>
        </motion.div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-border hover:border-primary/30 bg-card/50 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:text-primary transition-colors" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
