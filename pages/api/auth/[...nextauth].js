import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { verifyPassword, hashPassword } from '../../../auth/passwords';
import prisma from '../../../lib/prisma';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            id: 'buckiplan-login',
            name: 'BuckiPlan Login',
            credentials: {
                email: {
                    label: 'Email Address',
                    type: 'email',
                    placeholder: 'john.doe@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Your super secure password',
                },
            },
            async authorize(credentials) {
                try {
                    let maybeUser = await prisma.user.findFirst({
                        where: {
                            email: credentials.email,
                        },
                        select: {
                            id: true,
                            email: true,
                            password: true,
                            role: true,
                        },
                    });

                    if (!maybeUser) {
                        if (!credentials.password || !credentials.email) {
                            throw new Error('Invalid Credentials');
                        }

                        maybeUser = await prisma.user.create({
                            data: {
                                email: credentials.email,
                                password: await hashPassword(
                                    credentials.password
                                ),
                            },
                            select: {
                                id: true,
                                email: true,
                                password: true,
                                name: true,
                                role: true,
                            },
                        });
                    } else {
                        const isValid = await verifyPassword(
                            credentials.password,
                            maybeUser.password
                        );

                        if (!isValid) {
                            throw new Error('Invalid Credentials');
                        }
                    }
                    return {
                        id: maybeUser.id,
                        email: maybeUser.email,
                        name: maybeUser.name,
                    };
                } catch (error) {
                    conline.log(error);
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            return token;
        },
        async session({ session, token, user }) {
            const sess = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };

            return sess;
        },
    },
});
