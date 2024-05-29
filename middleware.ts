import { NextRequest, NextResponse } from 'next/server'
import ParamQueryGenerator from './components/param-query-generator'

export { auth as middlewarefun } from '@/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  console.log(pathname)
  if (pathname.includes('parameter')) {
    const res = await ParamQueryGenerator(pathname)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}?prequery=${res}`)
  }
}

export const config = {
  matcher: '/(.*)'
}
