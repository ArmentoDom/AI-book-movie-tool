"use client"

import type React from "react"

import { useState } from "react"
import { type UserPreferences, getRecommendations } from "../actions/recommendations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { RecommendationList } from "./recommendation-list"
import { Spinner } from "./ui/spinner"
import { BookOpen, Film, Sparkles, Bookmark, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const genreOptions = [
  { id: "action", label: "Action" },
  { id: "adventure", label: "Adventure" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "fantasy", label: "Fantasy" },
  { id: "horror", label: "Horror" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "sci-fi", label: "Science Fiction" },
  { id: "thriller", label: "Thriller" },
]

const moodOptions = [
  { id: "uplifting", label: "Uplifting" },
  { id: "dark", label: "Dark" },
  { id: "thoughtful", label: "Thoughtful" },
  { id: "funny", label: "Funny" },
  { id: "emotional", label: "Emotional" },
  { id: "suspenseful", label: "Suspenseful" },
  { id: "relaxing", label: "Relaxing" },
]

export function PreferenceForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [contentType, setContentType] = useState<"books" | "movies" | "both">("both")
  const [mood, setMood] = useState("")
  const [favorites, setFavorites] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRecommendations(null)

    try {
      const preferences: UserPreferences = {
        contentType,
        genres: selectedGenres,
        mood,
        favorites,
        additionalInfo,
      }

      const result = await getRecommendations(preferences)
      setRecommendations(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-8 border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 rounded-t-lg space-y-1">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Your Preferences
          </CardTitle>
          <CardDescription>Tell us what you like, and our AI will suggest personalized recommendations</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                What are you looking for?
              </Label>
              <RadioGroup
                defaultValue="both"
                className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                onValueChange={(value) => setContentType(value as "books" | "movies" | "both")}
              >
                <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md hover:bg-muted transition-colors">
                  <RadioGroupItem value="books" id="books" />
                  <Label htmlFor="books" className="flex items-center cursor-pointer">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Books
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md hover:bg-muted transition-colors">
                  <RadioGroupItem value="movies" id="movies" />
                  <Label htmlFor="movies" className="flex items-center cursor-pointer">
                    <Film className="h-4 w-4 mr-2 text-primary" />
                    Movies
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-md hover:bg-muted transition-colors">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="flex items-center cursor-pointer">
                    <div className="relative mr-2">
                      <BookOpen className="h-4 w-4 text-primary absolute -left-0.5" />
                      <Film className="h-4 w-4 text-primary absolute -right-0.5" />
                      <BookOpen className="h-4 w-4 invisible" />
                    </div>
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-primary" />
                Select your favorite genres
                <span className="text-xs text-muted-foreground font-normal">(choose at least one)</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {genreOptions.map((genre) => (
                  <div
                    key={genre.id}
                    className={`
                      flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-all
                      ${
                        selectedGenres.includes(genre.id)
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/50 hover:bg-muted border border-transparent"
                      }
                    `}
                    onClick={() => handleGenreChange(genre.id)}
                  >
                    <Checkbox
                      id={genre.id}
                      checked={selectedGenres.includes(genre.id)}
                      onCheckedChange={() => {}}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <Label htmlFor={genre.id} className="cursor-pointer">
                      {genre.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-base font-medium">What mood are you looking for?</Label>
              <RadioGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2" onValueChange={setMood}>
                {moodOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`
                      flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-all
                      ${
                        mood === option.id
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/50 hover:bg-muted border border-transparent"
                      }
                    `}
                    onClick={() => setMood(option.id)}
                  >
                    <RadioGroupItem value={option.id} id={`mood-${option.id}`} />
                    <Label htmlFor={`mood-${option.id}`} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-2">
              <Label htmlFor="favorites" className="text-base font-medium">
                List some of your favorite books or movies
              </Label>
              <Input
                id="favorites"
                placeholder="e.g., The Lord of the Rings, Inception, Pride and Prejudice"
                value={favorites}
                onChange={(e) => setFavorites(e.target.value)}
                className="bg-muted/50 focus:bg-background transition-colors"
              />
            </div>

            <div className="space-y-3 pt-2">
              <Label htmlFor="additional-info" className="text-base font-medium">
                Any additional preferences or information?
              </Label>
              <Textarea
                id="additional-info"
                placeholder="e.g., I prefer character-driven stories, or I'm looking for something to read on vacation"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[100px] bg-muted/50 focus:bg-background transition-colors"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-6 flex flex-col sm:flex-row gap-4 items-center">
            <Button
              type="submit"
              className="w-full sm:w-auto sm:flex-1 gap-2"
              disabled={isLoading || selectedGenres.length === 0}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Get AI Recommendations
                </>
              )}
            </Button>
            {selectedGenres.length === 0 && (
              <p className="text-sm text-muted-foreground">Please select at least one genre</p>
            )}
          </CardFooter>
        </form>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg border border-dashed">
          <Spinner size="lg" className="mb-4" />
          <p className="text-muted-foreground animate-pulse">Generating personalized recommendations...</p>
        </div>
      )}

      {recommendations && !isLoading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <RecommendationList recommendations={recommendations} />
        </motion.div>
      )}
    </div>
  )
}

