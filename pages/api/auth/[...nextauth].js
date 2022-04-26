import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
    port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
    },
    secret: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({ identifier, url }) => {
    const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
        encoding: 'utf8',
    });

    const emailTemplate = Handlebars.compile(emailFile);
    transporter.sendMail({
        from: ` "✨ BuckiPlan" ${process.env.NEXT_PUBLIC_EMAIL_FROM}`,
        to: identifier,
        subject: 'Your sign-in link for BuckiPlan',
        html: emailTemplate({
            base_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
            signin_url: url,
            email: identifier,
        }),
    });
};

const sendWelcomeEmail = async ({ user }) => {
    const { email } = user;

    try {
        const emailFile = readFileSync(
            path.join(emailsDir, 'welcome-email.html'),
            {
                encoding: 'utf8',
            }
        );

        const emailTemplate = Handlebars.compile(emailFile);
        await transporter.sendMail({
            from: `"✨ Buckiplan" ${process.env.NEXT_PUBLIC_EMAIL_FROM}`,
            to: email,
            subject: 'Welcome to BuckiPlan! 🎉',
            html: emailTemplate({
                base_url: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                support_email: 'buckiplan@yahoo.com',
            }),
        });
    } catch (error) {
        console.log(`❌ Unable to send welcome email to user (${email})`);
    }
};

export default NextAuth({
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
    adaptor: PrismaAdapter(prisma),
    events: { createUser: sendWelcomeEmail },
});
