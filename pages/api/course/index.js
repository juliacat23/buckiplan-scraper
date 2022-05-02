import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
    const courses = await prisma.course.findMany();
    res.json(courses);
}
