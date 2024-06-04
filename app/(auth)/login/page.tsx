'use client'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import GithubOauthLogin from '@/actions/github'
import GoogleOauthLogin from '@/actions/google'
import { FacebookIcon } from 'lucide-react'
import FacebookOauthLogin from '@/actions/facebook'
// import { FacebookIcon } from 'lucide-react'

export default function Component() {
  return (
    <>
      <Card className="w-full max-w-sm bg-primary-foreground text-primary">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-primary">
            Choose an option to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            onClick={async () => {
              await GithubOauthLogin()
            }}
            className="w-full text-primary"
            variant="outline"
          >
            <GithubIcon className="mr-2 h-6 w-6 font-bold " />
            Login with GitHub
          </Button>
          <Button
            onClick={async () => {
              await GoogleOauthLogin()
            }}
            className="w-full text-primary"
            variant="outline"
          >
            <ChromeIcon className="mr-2 h-6 w-6 font-bold " />
            Login with Google
          </Button>
          <Button
            onClick={async () => {
              await FacebookOauthLogin()
            }}
            className="w-full text-primary"
            variant="outline"
          >
            <FacebookIcon className="mr-2 h-6 w-6 font-bold " />
            Login with Facebook
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}
