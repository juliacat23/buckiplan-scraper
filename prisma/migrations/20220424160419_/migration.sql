/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[course_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ADD COLUMN     "uid" SERIAL NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_id_key" ON "Course"("course_id");
