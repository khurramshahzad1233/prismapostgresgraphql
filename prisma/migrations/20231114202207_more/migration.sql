/*
  Warnings:

  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageURL` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "id",
DROP COLUMN "profileImageURL",
DROP COLUMN "salt";
