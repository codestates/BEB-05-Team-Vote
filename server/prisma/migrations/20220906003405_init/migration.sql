-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_network" TEXT NOT NULL,
    "user_nickname" TEXT NOT NULL,
    "user_introduction" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_address")
);

-- CreateTable
CREATE TABLE "Article" (
    "article_id" SERIAL NOT NULL,
    "article_content" TEXT NOT NULL,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "user_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "lecture_id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "lecture_title" TEXT NOT NULL,
    "lecture_summary" TEXT NOT NULL,
    "lecture_introduction" TEXT NOT NULL,
    "instructor_introduction" TEXT NOT NULL,
    "lecture_url" TEXT NOT NULL,
    "lecture_image" TEXT NOT NULL,
    "lecture_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("lecture_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "article_id" INTEGER NOT NULL,
    "comment_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "article_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLecture" (
    "id" SERIAL NOT NULL,
    "user_address" TEXT NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_address_key" ON "User"("user_address");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("user_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("user_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("user_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("user_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("article_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLecture" ADD CONSTRAINT "UserLecture_user_address_fkey" FOREIGN KEY ("user_address") REFERENCES "User"("user_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLecture" ADD CONSTRAINT "UserLecture_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "Lecture"("lecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;
