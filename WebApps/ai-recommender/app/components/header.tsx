import { BookOpen, Film } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-primary/10 p-2">
            <div className="relative">
              <BookOpen className="h-6 w-6 text-primary absolute -left-0.5 opacity-70" />
              <Film className="h-6 w-6 text-primary absolute -right-0.5 opacity-70" />
              <BookOpen className="h-6 w-6 text-primary invisible" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Recommender</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

