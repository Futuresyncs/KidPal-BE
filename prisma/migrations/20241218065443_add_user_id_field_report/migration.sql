/*
  Warnings:

  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report` ADD COLUMN `userId` INTEGER NOT NULL;
