/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[course_name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Made the column `subject` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course_name` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `course_title` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `units` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `multi_enroll` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `terms` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "subject" SET NOT NULL,
ALTER COLUMN "course_name" SET NOT NULL,
ALTER COLUMN "course_title" SET NOT NULL,
ALTER COLUMN "units" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "multi_enroll" SET NOT NULL,
ALTER COLUMN "terms" SET NOT NULL,
ALTER COLUMN "course_id" DROP DEFAULT,
ALTER COLUMN "course_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id");
DROP SEQUENCE "Course_course_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_name_key" ON "Course"("course_name");
