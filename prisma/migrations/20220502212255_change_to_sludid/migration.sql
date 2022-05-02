-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_title" TEXT NOT NULL,
    "units" DOUBLE PRECISION NOT NULL,
    "academic_group" TEXT,
    "academic_career" TEXT,
    "description" TEXT NOT NULL,
    "multi_enroll" BOOLEAN NOT NULL,
    "cross_list" TEXT,
    "terms" TEXT NOT NULL,
    "course_attribute" TEXT,
    "attribute_type" TEXT,
    "slugID" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_name_key" ON "Course"("course_name");
