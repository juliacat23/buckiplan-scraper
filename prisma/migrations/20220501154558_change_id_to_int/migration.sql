/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `course_id` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "course_id",
ADD COLUMN     "course_id" INTEGER NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id");
