/*
  Warnings:

  - A unique constraint covering the columns `[parent_id,nickName]` on the table `Child_Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Child_Profile_nickName_key` ON `Child_Profile`;

-- CreateIndex
CREATE UNIQUE INDEX `Child_Profile_parent_id_nickName_key` ON `Child_Profile`(`parent_id`, `nickName`);
