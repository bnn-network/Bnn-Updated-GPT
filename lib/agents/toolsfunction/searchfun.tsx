import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { Card } from '@/components/ui/card'
import { SearchSection } from '@/components/search-section'


export const search2Tool = async (
  query: string,
  uiStream: ReturnType<typeof createStreamableUI>,
  fullResponse: string,
  max_results?: number,
  search_depth?: 'basic' | 'advanced'
) => {
  let hasError = false
  // Append the search section
  const streamResults = createStreamableValue<string>()
  uiStream.update(null)
  uiStream.append(<SearchSection result={streamResults.value} />)
  let searchResult
  const searchAPI: 'tavily' | 'searX' = 'searX'
  try {
    searchResult =
      searchAPI === 'searX'
        ? await searXNG(query)
        : await tavilySearch(
            query,
            max_results ? max_results : 5,
            search_depth ? search_depth : 'basic'
          )
  } catch (error) {
    console.error('Search API error:', error)
    hasError = true
  }
  if (hasError) {
    fullResponse += `\nAn error occurred while searching for "${query}.`
    uiStream.update(
      <Card className="p-4 mt-2 text-sm">
        {`An error occurred while searching for "${query}".`}
      </Card>
    )
    return searchResult
  }

  streamResults.done(JSON.stringify(searchResult))

  return searchResult
}

async function searXNG(query: string) {
  const response = await fetch('http://54.95.57.249:9098/api/v1/scrape/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
 
  const data = await response.json()

  return data
}

async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'basic'
): Promise<any> {
  const apiKey = process.env.TAVILY_API_KEY
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: maxResults < 5 ? 5 : maxResults,
      search_depth: searchDepth,
      include_images: true,
      include_answers: true
    })
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  console.log('response', response)

  const data = await response.json()
  return data
}
