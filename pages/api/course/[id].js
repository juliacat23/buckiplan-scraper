import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const id = req.query.id;

    if (req.method === 'GET') {
        handleGET(id, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// GET /api/course/:id

async function handleGET(id, res) {
    const course = await prisma.course.findUnique({
        where: { id: Number(id) },
    });
    res.json(course);
}
