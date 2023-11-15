/*
  Warnings:

  - Made the column `salt` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "salt" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
