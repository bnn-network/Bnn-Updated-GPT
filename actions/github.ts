'use server'

import { signIn } from "@/auth"
export const runtime = 'nodejs'

export default async function GithubOauthLogin(){
    await signIn('github',{redirect:true, redirectTo:'/'})
}