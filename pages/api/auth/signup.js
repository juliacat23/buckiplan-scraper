import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Route invalid' });
        return;
    } else {
        const { user_name, password } = req.body;
        // validation
        if (!username || !password) {
            res.status(422).json({ message: 'Missing username or password' });
            return;
        }
        // check if username already exists in db
        const user = await prisma.user.findUnique({
            where: {
                user_name: user_name,
            },
        });
        if (user) {
            res.status(422).json({ message: 'Username already exists' });
            return;
        }
        // hash password and create record in the database
        const hashedPassword = await hash(password, 12);
        console.log(hashedPassword.length);
        const newUser = await prisma.user.create({
            data: {
                user_name: user_name,
                password: hashedPassword,
            },
        });
        // sen response
        res.status(201).json({ message: 'User created', user: newUser });
    }
}

export default handler;
