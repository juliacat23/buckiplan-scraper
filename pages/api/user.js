import prisma from '../../lib/prisma';

// POST /api/user
// required fields in body: name, email, password

export default async function handle(req, res) {
    const result = await prisma.user.create({
        data: {
            ...req.body,
        },
    });
    res.json(result);
}
