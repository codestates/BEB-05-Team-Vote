/*
  Warnings:

  - You are about to drop the column `lecture_title` on the `UserLecture` table. All the data in the column will be lost.
  - Added the required column `lecture_id` to the `UserLecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserLecture" DROP CONSTRAINT "UserLecture_lecture_title_fkey";

-- DropIndex
DROP INDEX "Lecture_lecture_title_key";

-- AlterTable
ALTER TABLE "UserLecture" DROP COLUMN "lecture_title",
ADD COLUMN     "lecture_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserLecture" ADD CONSTRAINT "UserLecture_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;
