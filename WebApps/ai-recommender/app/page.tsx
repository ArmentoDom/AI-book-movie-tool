import { PreferenceForm } from "./components/preference-form"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 pb-1">
            AI Book & Movie Recommender
          </h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized recommendations powered by AI. Tell us what you like, and we'll suggest books and movies
            tailored just for you.
          </p>
        </div>

        <PreferenceForm />
      </main>
      <Footer />
    </div>
  )
}

