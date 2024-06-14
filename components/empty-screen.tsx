import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: "What's the latest news in AI?",
    message: "What's the latest news in AI?"
  },
  {
    heading: "What's the latest news in Gaza?",
    message: "What's the latest news in Gaza?"
  },
  {
    heading: 'Why is NVIDIA experiencing rapid growth?',
    message: 'Why is NVIDIA experiencing rapid growth?'
  },
  {
    heading: "What's New to Stream This Weekend?",
    message: "What's New to Stream This Weekend?"
  },
  {
    heading: 'Does Ozempic Work or is it a fad?',
    message: 'Does Ozempic Work or is it a fad?'
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
      <div className=" p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}
