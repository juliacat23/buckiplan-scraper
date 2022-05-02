-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
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

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Course_course_name_key" ON "Course"("course_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
