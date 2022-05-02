/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cid` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "cid",
ADD COLUMN     "uid" SERIAL NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "course_name" DROP NOT NULL,
ALTER COLUMN "course_title" DROP NOT NULL,
ALTER COLUMN "units" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "multi_enroll" DROP NOT NULL,
ALTER COLUMN "terms" DROP NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("uid");
