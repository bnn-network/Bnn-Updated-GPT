import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma/client'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: '/images/logo-dark.png'
  },
  providers: [Google, Github],
  adapter: PrismaAdapter(prisma)
})
