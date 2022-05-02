-- CreateTable
CREATE TABLE "Course" (
    "course_id" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_title" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "academic_group" TEXT,
    "academic_career" TEXT,
    "description" TEXT NOT NULL,
    "multi_enroll" BOOLEAN NOT NULL,
    "cross_list" TEXT,
    "terms" TEXT NOT NULL,
    "course_attribute" TEXT,
    "attribute_type" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_id_key" ON "Course"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_name_key" ON "Course"("course_name");
