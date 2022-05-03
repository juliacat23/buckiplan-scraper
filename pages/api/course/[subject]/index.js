import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
    const subject = req.query.subject;

    if (req.method === 'GET') {
        handleGET(subject, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// GET /api/course/:id

async function handleGET(subject, res) {
    const course = await prisma.course.findMany({
        where: { subject: String(subject) },
    });
    res.json(course);
}
