import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import OgImage from './twitter-image.png'
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'BNNGPT'
const description = 'Elevate Your Search Experience with AI.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://bnngpt.com'),
  openGraph: {
    title,
    description,
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height
      }
    ]
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image', // Use a valid card type here
    creator: 'BNNGPT',
    images: [
      {
        url: OgImage.src,
        width: OgImage.width,
        height: OgImage.height
      }
    ]
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    <ClerkProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NFW7H1G22S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NFW7H1G22S');
        `}
      </Script>
      <Script
        id="clarity-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mfuyx7jlww");
          `
        }}
      />
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'font-sans antialiased bg-secondary',
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
    </>
  )
}
