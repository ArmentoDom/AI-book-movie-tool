"use server"

// Define the preferences type
export type UserPreferences = {
  contentType: "books" | "movies" | "both"
  genres: string[]
  mood: string
  favorites: string
  additionalInfo: string
}

export async function getRecommendations(preferences: UserPreferences) {
  try {
    // Construct the prompt based on user preferences
    const prompt = `
      I need personalized ${preferences.contentType} recommendations based on the following preferences:
      
      Content Type: ${preferences.contentType}
      Genres: ${preferences.genres.join(", ")}
      Mood/Tone: ${preferences.mood}
      Favorites: ${preferences.favorites}
      Additional Information: ${preferences.additionalInfo}
      
      Please provide 5 recommendations with a brief explanation for each recommendation. 
      Format your response as JSON with the following structure:
      {
        "recommendations": [
          {
            "title": "Title",
            "creator": "Author/Director",
            "year": "Year",
            "genre": "Genre",
            "explanation": "Why this is recommended"
          }
        ]
      }
    `

    // Make a direct fetch request to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.VERCEL_URL || "http://localhost:3000",
        "X-Title": "AI Book & Movie Recommender",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenRouter API error:", errorData)
      return { error: `API error: ${response.status} ${response.statusText}` }
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || ""

    // Parse the JSON response
    try {
      // Look for JSON in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[0] : text
      return JSON.parse(jsonString)
    } catch (error) {
      console.error("Error parsing JSON:", error)
      // If JSON parsing fails, return the raw text
      return {
        error: "Failed to parse recommendations",
        rawText: text,
      }
    }
  } catch (error) {
    console.error("Error getting recommendations:", error)
    return { error: "Failed to get recommendations. Please try again." }
  }
}

