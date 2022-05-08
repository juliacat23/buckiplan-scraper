const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Courses = require('./seeds/courses');
const Minors = require('./seeds/minors');

const load = async () => {
    try {
        await prisma.course.deleteMany();
        console.log('Deleted records in course table');

        await prisma.course.createMany({
            data: Courses,
        });
        console.log('Added course data');

        await prisma.minor.deleteMany();
        console.log('Deleted records in minore table');

        await prisma.minor.createMany({
            data: Minors,
        });
        console.log('Added Minors data');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
