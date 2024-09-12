import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/db";
import bcrypt from "bcrypt"

const AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "username",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                },
                name: {
                    label: "name",
                    type: "text"
                }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })
                if(user){
                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if(!isValid){
                        throw new Error("Invalid credentials")
                    }
                    return user
                } else {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10)
                    const newUser = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword
                        }
                    })
                    return newUser
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: 'secret'
    },
    pages: {
        signIn: '/auth/signin',
        newUser: '/auth/signup'
    }
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }