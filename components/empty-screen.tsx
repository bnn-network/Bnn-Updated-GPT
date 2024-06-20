import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import TrendingSearches from './TrendingSearches'


export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="pt-4">
        <div className="mt-4 relative flex flex-col items-start space-y-2 mb-4">
          <TrendingSearches />
        </div>
      </div>
    </div>
  )
}
