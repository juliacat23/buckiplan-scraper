import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const slugID = req.query.slugID;

    if (req.method === 'GET') {
        handleGET(slugID, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// GET /api/course/:id

async function handleGET(slugID, res) {
    const course = await prisma.course.findUnique({
        where: { slugID: String(slugID) },
    });
    res.json(course);
}
