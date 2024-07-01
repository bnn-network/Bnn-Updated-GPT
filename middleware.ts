import { NextRequest, NextResponse } from 'next/server'
import { ClerkMiddlewareAuth, clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, req: NextRequest) => {
    const { pathname } = req.nextUrl
    if (
      !pathname.includes('parameter') &&
      pathname.length !== 16 &&
      pathname.length !== 10
    ) {
      return NextResponse.next()
    }
    if (pathname.length === 16) {
      try {
        const segments = pathname.split('/').filter(segment => segment !== '')
        const firstSegment = segments[0]
        if (firstSegment.length === 5) {
          const res = await fetch(
            `https://check.bnngpt.com/get_archived_title?url=https://tr.im/${firstSegment}`
          )
          const data = await res.json()
          if (data.title === null || !data.title) {
            return NextResponse.redirect(
              process.env.NEXT_PUBLIC_BASE_URL as string
            )
          }
          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getparamquery`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ path: data.title })
            }
          )
          const resText = await res2.text()
          if (resText.length > 0) {
            return NextResponse.redirect(
              `${process.env.NEXT_PUBLIC_BASE_URL}?prequery=${resText}`
            )
          }
          return NextResponse.redirect(
            process.env.NEXT_PUBLIC_BASE_URL as string
          )
        } else {
          return NextResponse.redirect(
            process.env.NEXT_PUBLIC_BASE_URL as string
          )
        }
      } catch (error) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL as string)
      }
    }

    if (pathname.length === 10) {
      //for '/parameter'
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL as string)
    }
    return NextResponse.next()
  }
)

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
