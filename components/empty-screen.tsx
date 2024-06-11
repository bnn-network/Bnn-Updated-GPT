import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import TrendingSearches from './TrendingSearches'

const exampleMessages = [
  {
    heading: "What's the latest in AI news?",
    message: "What's the latest in AI news?"
  },
  {
    heading: 'What is the latest news in Gaza?',
    message: 'What is the latest news in Gaza?'
  },
  {
    heading: 'Can you recommend a Mr Beast video?',
    message: 'Can you recommend a Mr Beast video?'
  },
  {
    heading: "What's New to Stream This Weekend?",
    message: "What's New to Stream This Weekend?"
  }
]

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
        <div className="mt-4  flex flex-col items-start space-y-2 mb-4">
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
