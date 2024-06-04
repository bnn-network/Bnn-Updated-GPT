'use server'

import { signIn } from "@/auth"

export default async function FacebookOauthLogin(){
    await signIn('facebook',{redirect:true, redirectTo:'/'})
}