"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span className="gradient-text">Transform</span> Your Learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and educators who use Viva Voce to create engaging, AI-powered examinations from
            their documents.
          </p>
          <Link href="/exam">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-full"
            >
              Start Your First Exam
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
