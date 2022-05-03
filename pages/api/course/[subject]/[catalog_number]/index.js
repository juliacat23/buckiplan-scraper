import prisma from '../../../../../lib/prisma';

export default async function handle(req, res) {
    const subject = req.query.subject;
    const catalog_number = req.query.catalog_number;

    if (req.method === 'GET') {
        handleGET(subject, catalog_number, res);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        );
    }
}

// GET /api/course/:id

async function handleGET(subject, catalog_number, res) {
    const course = await prisma.course.findMany({
        where: {
            subject: String(subject),
            catalog_number: String(catalog_number),
        },
    });
    res.json(course);
}
