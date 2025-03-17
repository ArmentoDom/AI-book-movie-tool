"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Film, Star, Calendar, Tag, Info } from "lucide-react"
import { motion } from "framer-motion"

type Recommendation = {
  title: string
  creator: string
  year: string
  genre: string
  explanation: string
}

type RecommendationListProps = {
  recommendations: {
    recommendations?: Recommendation[]
    error?: string
    rawText?: string
  }
}

export function RecommendationList({ recommendations }: RecommendationListProps) {
  const [activeTab, setActiveTab] = useState("all")

  // Handle error state
  if (recommendations.error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{recommendations.error}</p>
          {recommendations.rawText && (
            <div className="mt-4 p-4 bg-muted rounded-md overflow-auto max-h-[300px]">
              <pre className="whitespace-pre-wrap text-sm">{recommendations.rawText}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Handle empty recommendations
  if (!recommendations.recommendations || recommendations.recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No recommendations were found. Try adjusting your preferences.</p>
        </CardContent>
      </Card>
    )
  }

  const items = recommendations.recommendations

  // Split recommendations into books and movies (based on simple heuristics)
  const books = items.filter((item) => item.creator.includes("Author") || !item.creator.includes("Director"))

  const movies = items.filter((item) => item.creator.includes("Director") || !item.creator.includes("Author"))

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Your Personalized Recommendations
        </CardTitle>
        <CardDescription>Based on your preferences, we think you'll enjoy these titles</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              All
            </TabsTrigger>
            <TabsTrigger value="books" disabled={books.length === 0} className="flex-1 sm:flex-none">
              <BookOpen className="h-4 w-4 mr-2" />
              Books
            </TabsTrigger>
            <TabsTrigger value="movies" disabled={movies.length === 0} className="flex-1 sm:flex-none">
              <Film className="h-4 w-4 mr-2" />
              Movies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-2">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RecommendationCard item={item} />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="books" className="space-y-6 mt-2">
            {books.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RecommendationCard item={item} />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="movies" className="space-y-6 mt-2">
            {movies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RecommendationCard item={item} />
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function RecommendationCard({ item }: { item: Recommendation }) {
  const isBook = item.creator.includes("Author") || !item.creator.includes("Director")

  return (
    <Card className="overflow-hidden border-muted hover:border-primary/50 transition-colors">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-24 bg-primary/10 flex items-center justify-center p-4 sm:p-0">
            {isBook ? (
              <BookOpen className="h-12 w-12 text-primary/70" />
            ) : (
              <Film className="h-12 w-12 text-primary/70" />
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {item.year}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    {item.genre}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{item.creator}</p>
              </div>
              <Badge variant="outline" className="self-start sm:self-auto bg-primary/5 hover:bg-primary/10">
                {isBook ? "Book" : "Movie"}
              </Badge>
            </div>
            <div className="mt-3 text-sm border-t pt-3 border-dashed">{item.explanation}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

