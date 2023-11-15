/*
  Warnings:

  - You are about to drop the column `comment_count` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_post_id_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "comment_count";
