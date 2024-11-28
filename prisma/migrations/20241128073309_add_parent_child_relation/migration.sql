/*
  Warnings:

  - You are about to drop the column `Parent_id` on the `child_profile` table. All the data in the column will be lost.
  - You are about to alter the column `child_id` on the `report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[parent_id]` on the table `Child_Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parent_id` to the `Child_Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `child_profile` DROP COLUMN `Parent_id`,
    ADD COLUMN `parent_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `child_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Child_Profile_parent_id_key` ON `Child_Profile`(`parent_id`);

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `Child_Profile`(`parent_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Child_Profile` ADD CONSTRAINT `Child_Profile_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
