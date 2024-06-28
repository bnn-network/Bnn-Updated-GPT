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
  // State to manage whether to display the results
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

  return (
    <div className="flex flex-wrap ">
      {displayedResults.map((result, index) => (
        <div className="w-1/2  md:w-1/4 p-1 " key={index}>
          <Link href={result.sourceURL} passHref target="_blank">
            <Card className="px-4 py-1 flex-1 h-full bg-modal-inputBoxSecondary">
              <CardContent className="p-2">
                <p className="text-xs line-clamp-2">
                  {result.title || result.content}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={`https://www.google.com/s2/favicons?domain=${
                        new URL(result.sourceURL).hostname
                      }`}
                      alt={new URL(result.sourceURL).hostname}
                    />
                    <AvatarFallback>
                      {new URL(result.sourceURL).hostname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs opacity-60 truncate">
                    {new URL(result.sourceURL).hostname}
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
