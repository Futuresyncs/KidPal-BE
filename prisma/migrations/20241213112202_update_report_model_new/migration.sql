/*
  Warnings:

  - You are about to drop the column `child_id` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `conversation_logs` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `progress_data` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `session_summary` on the `Report` table. All the data in the column will be lost.
  - Added the required column `date` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_child_id_fkey`;

-- AlterTable
ALTER TABLE `Report` DROP COLUMN `child_id`,
    DROP COLUMN `conversation_logs`,
    DROP COLUMN `progress_data`,
    DROP COLUMN `session_summary`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` INTEGER NOT NULL;
