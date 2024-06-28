'use client'

import { useState } from 'react'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SearchResultItem } from '@/lib/types'

export interface SearchResultsProps {
  results: SearchResultItem[]
}

export function SearchResults({ results }: SearchResultsProps) {
  const [showAllResults, setShowAllResults] = useState(false)

  const handleViewMore = () => {
    setShowAllResults(true)
  }

  const displayedResults = results
    ? showAllResults
      ? results
      : results.slice(0, 3)
    : []
  const additionalResultsCount = results
    ? results.length > 3
      ? results.length - 3
      : 0
    : 0

  const getHostname = (url: string | undefined): string => {
    if (!url) return 'Unknown'
    try {
      return new URL(url).hostname
    } catch {
      const parts = url.split('/')
      return parts.length > 2 ? parts[2] : url
    }
  }

  const getFaviconUrl = (url: string | undefined): string => {
    const hostname = getHostname(url)
    return `https://www.google.com/s2/favicons?domain=${hostname}`
  }

  return (
    <div className="flex flex-wrap">
      {displayedResults.map((result, index) => (
        <div className="w-1/2 md:w-1/4 p-1" key={index}>
          <Link href={result.url || '#'} passHref target="_blank">
            <Card className="flex-1 h-full bg-primary-foreground">
              <CardContent className="p-2">
                <p className="text-xs line-clamp-2">
                  {result.title || result.content || 'No content available'}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={getFaviconUrl(result.url)}
                      alt={getHostname(result.url)}
                    />
                    <AvatarFallback>
                      {getHostname(result.url)[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs opacity-60 truncate">
                    {getHostname(result.url)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
      {!showAllResults && additionalResultsCount > 0 && (
        <div className="w-1/2 md:w-1/4 p-1">
          <Card className="flex-1 flex h-full items-center justify-center">
            <CardContent className="p-2">
              <Button
                variant={'link'}
                className="text-muted-foreground"
                onClick={handleViewMore}
              >
                View {additionalResultsCount} more
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
