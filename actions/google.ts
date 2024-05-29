'use server'

import { signIn } from '@/auth'

export default async function GoogleOauthLogin() {
  await signIn("google")
}
