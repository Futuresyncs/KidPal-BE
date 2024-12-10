/*
  Warnings:

  - A unique constraint covering the columns `[nickName]` on the table `Child_Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Child_Profile_nickName_key` ON `Child_Profile`(`nickName`);

-- CreateIndex
CREATE UNIQUE INDEX `Otp_userId_key` ON `Otp`(`userId`);
