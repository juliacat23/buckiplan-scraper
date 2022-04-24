import NextAuth from 'next-auth/next';

import { compare } from 'bcryptjs';
import { CredentialsProvider } from 'next-auth/providers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1 hour
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                // check if user is in db
                const user = await prisma.user.findUnique({
                    where: {
                        user_name: credentials.user_name,
                    },
                });
                if (!user) {
                    return null;
                }

                // check if password is correct
                const valid = await compare(
                    credentials.password,
                    user.password
                );
                if (!valid) {
                    return null;
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (user) {
                token.id = user.id;
                token.user_name = token.user_name;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.user.name = token.user_name;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
});
