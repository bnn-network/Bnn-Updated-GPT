'use server'

import { signIn } from '@/auth'
export const runtime = 'nodejs'
export default async function GoogleOauthLogin() {
  await signIn('google', { redirect: true, redirectTo: '/' })
}
