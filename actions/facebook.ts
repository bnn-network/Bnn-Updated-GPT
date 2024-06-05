'use server'

import { signIn } from "@/auth"
export const runtime = 'nodejs'
export default async function FacebookOauthLogin(){
    await signIn('facebook',{redirect:true, redirectTo:'/'})
}