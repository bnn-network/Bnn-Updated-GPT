'use client'

import { SearchResults } from './search-results'
import { SearchSkeleton } from './search-skeleton'
import { SearchResultsImageSection } from './search-results-image'
import { Section } from './section'
import { ToolBadge } from './tool-badge'
import type {
  SearchResults as TypeSearchResults,
  searXNGSearchResults
} from '@/lib/types'
import { StreamableValue, useStreamableValue } from 'ai/rsc'

export type SearchSectionProps = {
  result?: StreamableValue<string>
}

export function SearchSection({ result }: SearchSectionProps) {
  const [data, error, pending] = useStreamableValue(result)
  console.log(data, 'data')
  console.log(pending, 'pending')

  const searchResults: searXNGSearchResults = data
    ? JSON.parse(data)
    : undefined
  const thumbnails = searchResults ? searchResults.responses.filter(response => response.thumbnailURL !== null).map(response => response.thumbnailURL) : []
  return (
    <div>
      {!pending && data ? (
        <>
          <Section size="sm" className="pt-2 pb-0">
            <ToolBadge tool="search">{searchResults.input}</ToolBadge>
          </Section>
          {thumbnails && thumbnails.length > 0 && (
            <Section title="thumbnails">
              <SearchResultsImageSection
                images={thumbnails}
                query={searchResults.input}
              />
            </Section>
          )}
          <Section title="Sources">
            <SearchResults
              results={searchResults.responses || []}
            />
          </Section>
        </>
      ) : (
        <Section className="pt-2 pb-0">
          <SearchSkeleton />
        </Section>
      )}
    </div>
  )
}
