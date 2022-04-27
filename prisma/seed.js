// need to use CommonJS syntax instead of ECMAScript module syntax
const { PrismaClient } = require('@prisma/client');
const { courses } = require('./seeds/courses.js');
const { userData } = require('./seeds/users');

const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.course.deleteMany();
        console.log('Deleted records in course table');

        await prisma.user.deleteMany();
        console.log('Deleted records in user table');

        await prisma.course.createMany({
            data: courses,
        });
        console.log('Added course data');

        await prisma.user.createMany({
            data: userData,
        });
        console.log('Added user data');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();
