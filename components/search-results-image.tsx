/* eslint-disable @next/next/no-img-element */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react'

interface SearchResultsImageSectionProps {
  images: string[]
  query?: string
}

export const SearchResultsImageSection: React.FC<
  SearchResultsImageSectionProps
> = ({ images, query }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Update the current and count state when the carousel api is available
  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Scroll to the selected index
  useEffect(() => {
    if (api) {
      api.scrollTo(selectedIndex, true)
    }
  }, [api, selectedIndex])

  if (!images || images.length === 0) {
    return <div className="text-muted-foreground">No images found</div>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {images.slice(0, 4).map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div
              className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.5rem)]  aspect-video cursor-pointer relative"
              onClick={() => setSelectedIndex(index)}
            >
              <Card className="flex-1 h-[90%]">
                <CardContent className=" w-full h-full bg-primary-foreground">
                  {image ? (
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full object-cover object-center "
                      onError={e =>
                        (e.currentTarget.src = '/images/logo-white.png')
                      }
                    />
                  ) : (
                    <div className="w-full h-full bg-muted animate-pulse" />
                  )}
                </CardContent>
              </Card>
              {index === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/30 rounded-md flex items-center justify-center text-white/80 text-sm">
                  <PlusCircle size={24} />
                </div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl w-[90%] bg-muted max-h-[80vh]  overflow-visible ">
            <div className="">
              <Carousel
                setApi={setApi}
                className="lg:w-full  lg:bg-primary-foreground max-h-[60vh] lg:-z-10 lg:mt-5"
              >
                <CarouselContent>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div className="p-1 flex items-center justify-center h-full">
                        <img
                          src={img}
                          alt={`Image ${idx + 1}`}
                          className="h-auto w-full object-contain max-h-[60vh]"
                          onError={e =>
                            (e.currentTarget.src =
                              '/images/placeholder-image.png')
                          }
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute inset-0 md:-inset-12 z-20 lg:px-0 px-10 flex items-center justify-between">
                  <CarouselPrevious className="lg:w-14 lg:h-14 left-2 sm:left-0  w-7 h-7 border-none shadow-none rounded-full focus:outline-none">
                    <span className="sr-only">Previous</span>
                  </CarouselPrevious>
                  <CarouselNext className="lg:w-14 lg:h-14  right-2 sm:right-0 w-7 h-7 rounded-full border-none focus:outline-none">
                    <span className="sr-only">Next</span>
                  </CarouselNext>
                </div>
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                {current} of {count}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
