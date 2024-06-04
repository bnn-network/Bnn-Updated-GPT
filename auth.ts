import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/prisma/client'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Facebook from 'next-auth/providers/facebook'
export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: '/images/logo-dark.png'
  },
  providers: [Google, Github, Facebook],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id
      return session
    }
  }
})
