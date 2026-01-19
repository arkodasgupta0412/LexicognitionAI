import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground" style={{ fontFamily: "var(--font-syne)" }}>
            Viva Voce
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Built with AI. Powered by innovation.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
