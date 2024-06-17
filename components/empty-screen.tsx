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
          {/* {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-sm" // Apply text-sm class here
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))} */}
        </div>
      </div>
    </div>
  )
}
