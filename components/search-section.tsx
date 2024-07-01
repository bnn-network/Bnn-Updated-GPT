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

  const searchResults: searXNGSearchResults = data
    ? JSON.parse(data)
    : undefined
  const thumbnails =
    searchResults && searchResults.responses
      ? Array.from(
          new Set(
            searchResults.responses
              .filter(response => response.thumbnailURL !== null)
              .map(response => response.thumbnailURL)
          )
        )
      : []
  const images =
    searchResults && searchResults.responses
      ? Array.from(
          new Set(
            searchResults.responses
              .filter(response => response.imageURL !== null)
              .map(response => response.imageURL)
          )
        )
      : []
  return (
    <div>
      {!pending && data ? (
        <>
          <Section size="sm" className="pt-2 pb-0">
            <ToolBadge tool="search">{searchResults.input}</ToolBadge>
          </Section>
          {thumbnails && thumbnails.length > 0 && (
            <Section title="Media">
              <SearchResultsImageSection
                images={thumbnails}
                query={searchResults.input}
                fullimages={images}
              />
            </Section>
          )}
          <Section title="Sources">
            <SearchResults results={searchResults.responses || []} />
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
