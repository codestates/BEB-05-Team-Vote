/*
  Warnings:

  - You are about to drop the column `lecture_id` on the `UserLecture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lecture_title]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lecture_title` to the `UserLecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserLecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserLecture" DROP CONSTRAINT "UserLecture_lecture_id_fkey";

-- AlterTable
ALTER TABLE "UserLecture" DROP COLUMN "lecture_id",
ADD COLUMN     "lecture_title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_lecture_title_key" ON "Lecture"("lecture_title");

-- AddForeignKey
ALTER TABLE "UserLecture" ADD CONSTRAINT "UserLecture_lecture_title_fkey" FOREIGN KEY ("lecture_title") REFERENCES "Lecture"("lecture_title") ON DELETE RESTRICT ON UPDATE CASCADE;
