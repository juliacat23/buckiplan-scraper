import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';

export default NextAuth({
    adaptor: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
                port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
                    pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.NEXT_PUBLIC_EMAIL_FROM,
            maxAge: 10 * 60, // magic links are valid for 10 min only
        }),
    ],
});
