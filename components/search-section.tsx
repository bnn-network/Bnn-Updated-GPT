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
  return (
    <div>
      {!pending && data ? (
        <>
          <Section size="sm" className="pt-2 pb-0">
            <ToolBadge tool="search">{`${''}`}</ToolBadge>
          </Section>
          {searchResults.thumbnails && searchResults.thumbnails.length > 0 && (
            <Section title="Images">
              <SearchResultsImageSection
                images={searchResults.thumbnails}
                query={''}
              />
            </Section>
          )}
          <Section title="Sources">
            <SearchResults results={searchResults.response} />
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
