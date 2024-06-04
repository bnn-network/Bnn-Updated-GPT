import { NextRequest, NextResponse } from 'next/server'

export { auth as middlewareFun } from '@/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  

  if (pathname.length === 10) {
    //for '/parameter'
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL as string)
  }
  if (pathname.includes('parameter')) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getparamquery`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: pathname })
      }
    )
    const resText = await res.text()
    if (resText.length > 0) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}?prequery=${resText}`
      )
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/(.*)'
}
