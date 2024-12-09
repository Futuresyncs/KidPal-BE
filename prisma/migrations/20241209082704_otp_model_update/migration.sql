/*
  Warnings:

  - You are about to drop the column `email` on the `Otp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Otp` DROP COLUMN `email`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Otp_userId_key` ON `Otp`(`userId`);

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
