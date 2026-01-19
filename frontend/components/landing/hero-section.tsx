"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">AI-Powered Assessment Platform</span>
        </motion.div>

        {/* Main Heading - Updated to Lexicognition AI branding */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="text-foreground italic">Lexicognition</span>
          <br />
          <span className="gradient-text-purple">AI</span>
          <br />
          <span className="relative">
            <span className="text-foreground">Viva Board</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transform your PDFs into interactive examinations. Upload your document and let our AI generate comprehensive
          questions with intelligent grading.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/exam">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
            >
              Start Examination
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border-border hover:bg-secondary bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
