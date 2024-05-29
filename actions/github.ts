'use server'

import { signIn } from "@/auth"

export default async function GithubOauthLogin(){
    await signIn('github',{redirect:true, redirectTo:'/'})
}