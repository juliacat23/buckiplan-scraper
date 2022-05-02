/*
  Warnings:

  - A unique constraint covering the columns `[slugID]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_slugID_key" ON "Course"("slugID");
